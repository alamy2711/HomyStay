import Button from "@components/common/Button";
import DatePickerInput from "@components/common/DatePickerInput";
import { useApartments } from "@contexts/ApartmentsContext";
import { useAuth } from "@contexts/AuthContext";
import { addDays, subDays } from "date-fns";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ReservationForm() {
    const { user, token, loading: userLoading } = useAuth();
    const { apartments, loading: apartmentsLoading } = useApartments();
    const apartment = apartments[0]; // Extracting 1 dummy apartemnt data for testing purposes

    const [startDate, setStartDate] = useState(null); // Date Picker (Check-in)
    const [endDate, setEndDate] = useState(null); // Date Picker (Check-out)

    const navigate = useNavigate(); // Navigation

    // Function to calculate total price
    const calculateTotalPrice = () => {
        if (startDate && endDate) {
            const timeDiff = endDate.getTime() - startDate.getTime();
            const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert to days
            return days * apartment.price;
        }
        return 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!startDate || !endDate) {
            toast.warning("Please select a check-in and check-out date.");
            return;
        }
        if (!token) {
            toast.warning("Please log in to make a reservation.");
            navigate("/login");
        } else if (user.role == "client") {
            toast.success("Reservation submitted.");
            // Proceed with reservation logic
            // Calling  API or navigate somewhere
        } else {
            toast.error("Only clients can reserve.");
        }
    };
    return (
        <form
            onSubmit={handleSubmit}
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
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    maxDate={endDate && subDays(endDate, 1)}
                    openToDate={apartment.availability.start}
                    includeDateIntervals={[
                        {
                            start: subDays(apartment.availability.start, 1),
                            end: apartment.availability.end,
                        },
                    ]}
                    // Structure
                    popperPlacement="bottom-start"
                    // Input
                    id="startDate"
                    label="Check in"
                />
                <DatePickerInput
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    openToDate={apartment.availability.end}
                    minDate={addDays(startDate, 1)}
                    includeDateIntervals={[
                        {
                            start: subDays(apartment.availability.start, 1),
                            end: apartment.availability.end,
                        },
                    ]}
                    // Structure
                    popperPlacement="bottom-end"
                    // Input
                    id="endDate"
                    label="Check out"
                    // {...register("endDate")}
                />
            </div>
            {/* Reserve Button */}
            <div className="flex items-center justify-between">
                <Button
                    className="bg-primary-700 hover:bg-primary-800 zlg:w-auto w-full text-white"
                    type="submit"
                >
                    Reserve
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
