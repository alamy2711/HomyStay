import axios from "@/lib/axiosClient";
import Button from "@components/common/Button";
import DatePickerInput from "@components/common/DatePickerInput";
import { useAuth } from "@contexts/AuthContext";
import { addDays, subDays } from "date-fns";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { formatDate } from "../../utils/dateFormatter";

export default function ReservationForm({ apartment }) {
    const { user, token } = useAuth();
    const navigate = useNavigate(); // Navigation

    const [startDate, setStartDate] = useState(null); // Date Picker (Check-in)
    const [endDate, setEndDate] = useState(null); // Date Picker (Check-out)

    const [formData, setFormData] = useState({
        data: {},
        loading: false,
    });

    // Function to calculate total price
    const calculateTotalPrice = () => {
        if (startDate && endDate) {
            const timeDiff = endDate.getTime() - startDate.getTime();
            const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert to days
            return days * apartment.price;
        }
        return 0;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (apartment.status === "reserved") {
            toast.warning("Apartment is already reserved.");
            return;
        }
        if (apartment.status === "expired") {
            toast.warning("Apartment is expired.");
            return;
        }
        if (!startDate || !endDate) {
            toast.warning("Please select a check-in and check-out date.");
            return;
        }
        if (!token) {
            toast.warning("Please log in to make a reservation.");
            navigate("/login");
        } else if (user.role == "client") {
            setFormData({
                ...formData,
                loading: true,
            });

            // Prepare form data
            formData.data = {
                check_in: formatDate(startDate, "yyyy-MM-dd"),
                check_out: formatDate(endDate, "yyyy-MM-dd"),
                apartment_id: apartment.id,
                total_price: calculateTotalPrice(),
            };

            try {
                // Send to backend
                const response = await axios.post(
                    "/reservations",
                    formData.data,
                );
                toast.success("Reservation successful!");
                console.log("Server response:", response.data);
            } catch (error) {
                // check error status code from backend and log the error message
                if (error.response.status === 403) {
                    toast.error(error.response.data.error);
                } else {
                    toast.error("Reservation failed!");
                    console.error(
                        "Error:",
                        error.response?.data || error.message,
                    );
                }
            } finally {
                setFormData({
                    ...formData,
                    loading: false,
                });
            }
        } else {
            toast.error("Only clients can reserve.");
        }
    };

    return (
        <form
            onSubmit={onSubmit}
            className="sticky bottom-0 col-span-12 flex max-h-max flex-col gap-5 rounded-lg border border-gray-200 bg-white p-3 shadow-sm shadow-gray-400 lg:top-30 lg:col-span-4 lg:p-5"
        >
            {/* Price & Rating */}
            <div className="hidden items-center justify-between lg:flex">
                <h3 className="text-primary-700 text-3xl font-bold">
                    {apartment.price} USD{" "}
                    <span className="text-primary-600 text-lg">/Night</span>
                </h3>
                <div className="flex items-center gap-1 font-[600] text-gray-600">
                    <i className="fa-solid fa-star text-xl text-yellow-400"></i>
                    <span className="leading-none">{apartment.rating}</span>
                </div>
            </div>
            {/* Inputs */}
            <div className="flex items-center justify-between gap-5">
                <DatePickerInput
                    selected={startDate}
                    onChange={(date) => {
                        setStartDate(date);
                        setValue("startDate", date, { shouldValidate: true });
                    }}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    maxDate={endDate && subDays(endDate, 1)}
                    openToDate={new Date(apartment.check_in)}
                    includeDateIntervals={[
                        {
                            start: subDays(new Date(apartment.check_in), 1),
                            end: new Date(apartment.check_out),
                        },
                    ]}
                    // Structure
                    popperPlacement="bottom-start"
                    // Input
                    id="startDate"
                    label="Check in"
                    name="startDate"
                />
                <DatePickerInput
                    selected={endDate}
                    onChange={(date) => {
                        setEndDate(date);
                        setValue("endDate", date, { shouldValidate: true });
                    }}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    openToDate={new Date(apartment.check_out)}
                    minDate={addDays(startDate, 1)}
                    includeDateIntervals={[
                        {
                            start: subDays(new Date(apartment.check_in), 1),
                            end: new Date(apartment.check_out),
                        },
                    ]}
                    // Structure
                    popperPlacement="bottom-end"
                    // Input
                    id="endDate"
                    label="Check out"
                    name="endDate"
                />
            </div>
            {/* Reserve Button */}
            <div className="flex items-center justify-between">
                <Button
                    disabled={
                        apartment.status !== "available" || formData.loading
                    }
                    className="bg-primary-700 hover:bg-primary-800 zlg:w-auto w-full text-white"
                    type="submit"
                >
                    {/* Spinner in button */}
                    {formData.loading ? (
                        <div className="flex items-center justify-center">
                            <div className="h-4 w-4 animate-spin rounded-full border-t-2 border-white"></div>
                            <span className="ml-2">Reserving...</span>
                        </div>
                    ) : apartment.status === "reserved" ? (
                        "Already Reserved"
                    ) : apartment.status === "expired" ? (
                        "Expired"
                    ) : (
                        "Reserve"
                    )}
                </Button>
            </div>
            {/* Total Price */}
            {calculateTotalPrice() ? (
                <div className="text-center text-sm font-[600] text-gray-500 lg:text-base">
                    {" "}
                    Total cost for your stay:{" "}
                    <h6 className="text-primary-700 inline-block lg:text-[1.1rem]">
                        {calculateTotalPrice()} USD
                    </h6>
                    . Payment details can be arranged with the host.
                </div>
            ) : (
                ""
            )}
        </form>
    );
}
