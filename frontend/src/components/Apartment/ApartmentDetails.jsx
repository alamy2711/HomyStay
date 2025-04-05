import { iconMap } from "@/constants/IconMap";
import Button from "@components/common/Button";
import DatePickerInput from "@components/common/DatePickerInput";
import ImageSwiper from "@components/common/ImageSwiper";
import LoadingSpinner from "@components/common/LoadingSpinner";
import { useApartments } from "@contexts/ApartmentsContext";
import { useAuth } from "@contexts/AuthContext";
import { addDays, subDays } from "date-fns";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ApartmentDetails() {
    const { user, token, loading: userLoading } = useAuth();
    const { apartments, loading: apartmentsLoading } = useApartments();
    const apartment = apartments[0]; // Extracting 1 dummy apartemnt data for testing purposes

    // Function to calculate total price
    const calculateTotalPrice = () => {
        if (startDate && endDate) {
            const timeDiff = endDate.getTime() - startDate.getTime();
            const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert to days
            return days * apartment.price;
        }
        return 0;
    };

    const [isFavorite, setIsFavorite] = useState(false); // Add-to-Favorites Button
    const navigate = useNavigate(); // Navigation

    const [startDate, setStartDate] = useState(null); // Date Picker (Check-in)
    const [endDate, setEndDate] = useState(null); // Date Picker (Check-out)

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

    const handleContactClick = () => {
        if (!token) {
            toast.warning("Please log in to contact the host.");
            navigate("/login");
        }
        else if (user.role != "client") {
            toast.error("Only clients can contact the host.");
        }
    };

    const [formattedDateStart, formattedDateEnd] = useMemo(() => {
        return [
            `${apartment?.availability.start.getDate()} ${apartment?.availability.start.toLocaleString("default", { month: "short" })} ${apartment?.availability.start.getFullYear()}`,
            `${apartment?.availability.end.getDate()} ${apartment?.availability.end.toLocaleString("default", { month: "short" })} ${apartment?.availability.end.getFullYear()}`,
        ];
    }, [apartment?.availability.start, apartment?.availability.end]);

    // Spin while Loading
    if (apartmentsLoading || userLoading) {
        return <LoadingSpinner className="h-screen" />;
    }

    return (
        <main>
            {/* Gallery $ Info */}
            <section className="my-10 px-4 lg:px-6">
                <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-5 rounded-lg bg-white px-4 py-10 font-bold shadow-sm lg:grid-cols-10">
                    {/* Apartment Gallery */}
                    <div className="h-90 overflow-hidden rounded-lg md:h-120 lg:col-span-6">
                        <ImageSwiper
                            images={apartment.images}
                            isGallery={true}
                        />
                    </div>

                    {/* Apartment Info */}
                    <div className="flex flex-col justify-between text-gray-500 md:px-2 lg:col-span-4">
                        {/* Title */}
                        <h1 className="text-primary-700 mb-2 text-2xl lg:text-3xl">
                            {apartment.title}
                        </h1>
                        {/* Rating */}
                        <div className="flex items-center gap-2 text-yellow-400">
                            <StarRating rating={apartment.rating} />
                            <span className="leading-none text-gray-500">
                                {" "}
                                {apartment?.rating}{" "}
                                <a
                                    href="#Reviews"
                                    className="leading-none underline"
                                >
                                    (26 Reviews)
                                </a>
                            </span>
                        </div>
                        <hr className="mt-4 mb-5 h-0.5 w-full rounded-sm border-0 bg-gray-200"></hr>
                        {/* Location & Add-to-Favorite */}
                        <div className="flex items-center gap-2 text-gray-600">
                            <i className="fa-solid fa-location-dot text-2xl"></i>
                            <h3 className="text-xl italic">
                                {apartment.location}
                            </h3>
                            {/* Add-to-Favorites Buttons : Shown for Visitors and Clients only */}
                            {(!token || user.role == "client") && (
                                <button
                                    className="ml-auto"
                                    onClick={() => setIsFavorite(!isFavorite)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="1 1 22 22"
                                        className={`h-8 w-8 stroke-gray-600 transition-all duration-300 hover:scale-115 lg:hover:fill-red-500 lg:hover:stroke-red-500 ${isFavorite ? "fill-red-500 stroke-red-500" : "fill-white"} `}
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6.23 6.23 0 0 1 16.5 3 5.5 5.5 0 0 1 22 8.5c0 3.78-3.4 6.86-8.55 11.18L12 21z"
                                        />
                                    </svg>
                                </button>
                            )}
                        </div>
                        {/* Date */}
                        <p className="text-lg font-[400]">
                            {formattedDateStart} - {formattedDateEnd}
                        </p>
                        <hr className="bg-transpart mx-auto my-3 border-0"></hr>
                        {/* General Infos */}
                        <div className="grid grid-cols-2 flex-col gap-3 gap-x-12">
                            <div>
                                <div className="inline-block w-6">
                                    <i className="fa-solid fa-door-closed"></i>
                                </div>
                                <span>{apartment.rooms} Room(s)</span>
                            </div>
                            <div>
                                <div className="inline-block w-6">
                                    <i className="fa-solid fa-bed"></i>
                                </div>
                                <span>{apartment.beds} Bed(s)</span>
                            </div>
                            <div>
                                <div className="inline-block w-6">
                                    <i className="fa-solid fa-bath"></i>
                                </div>
                                <span>{apartment.bathrooms} Bathroom(s)</span>
                            </div>
                            <div>
                                <div className="inline-block w-6">
                                    <i className="fa-solid fa-user-group"></i>
                                </div>
                                <span>{apartment.guests} Guest(s)</span>
                            </div>
                            <div>
                                <div className="inline-block w-6">
                                    <i className="fa-solid fa-object-group"></i>
                                </div>
                                85 m<sup>2</sup>
                            </div>
                            <div>
                                <div className="inline-block w-6">
                                    {iconMap[apartment.type].icon}
                                </div>
                                <span>{iconMap[apartment.type].label}</span>
                            </div>
                        </div>
                        <hr className="bg-transpart mx-auto mt-6 mb-2 h-0.5 w-[95%] rounded-sm border-0"></hr>

                        {/* Price & Share */}
                        <div className="flex items-center justify-between">
                            <h3 className="text-primary-700 text-3xl font-bold">
                                {apartment.price} USD{" "}
                                <span className="text-primary-600 text-lg">
                                    /Night
                                </span>
                            </h3>
                            <Button
                                href="#"
                                className="border-primary-700 text-primary-700 hover:bg-primary-200 border-2"
                            >
                                <i className="fa-solid fa-share-nodes mr-2"></i>
                                Share
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Description & Reservation */}
            <section className="relative my-10 mb-10 px-4 lg:px-6">
                <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-5 rounded-lg bg-white px-4 py-10 shadow-sm lg:grid-cols-12">
                    {/* Full Info */}
                    <div className="col-span-12 lg:col-span-8 lg:px-5">
                        {/* Host */}
                        <div className="zlg:justify-start flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="border-primary-700 h-13 w-13 overflow-hidden rounded-full border">
                                    <img
                                        className="h-full w-full object-cover object-center"
                                        src={user.profilePicture}
                                        alt="Host Profile Picture"
                                    />
                                </div>
                                <h5 className="text-xl text-gray-600">
                                    {user.name}
                                </h5>
                            </div>
                            <Button
                                className="border-primary-700 text-primary-700 hover:bg-primary-200 flex items-center border-2"
                                onClick={handleContactClick}
                            >
                                <i className="fa-solid fa-envelope mr-2 text-xl"></i>
                                Contact
                            </Button>
                        </div>
                        <hr className="mt-6 mb-10 h-0.5 w-full rounded-sm border-0 bg-gray-100"></hr>
                        {/* About the Place */}
                        <div>
                            <h3 className="mb-5 text-2xl font-bold text-gray-700">
                                About the Place
                            </h3>
                            <p className="text-lg leading-7.5 font-[500] text-gray-500">
                                {apartment.description}
                            </p>
                        </div>
                        <hr className="mt-6 mb-6 h-0.5 w-full rounded-sm border-0 bg-transparent"></hr>
                        {/* Amenities */}
                        <div>
                            <h3 className="mb-5 text-2xl font-bold text-gray-700">
                                Amenities
                            </h3>
                            <div className="grid grid-cols-1 gap-5 text-lg font-bold text-gray-500 md:grid-cols-2">
                                {apartment.amenities.map((amenity, i) => (
                                    <div key={i}>
                                        <div className="[&_i]:text-primary-700 inline-block w-10 [&_i]:text-2xl">
                                            {iconMap[amenity].icon}
                                        </div>
                                        <span>{iconMap[amenity].label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Reservation */}
                    <form
                        onSubmit={handleSubmit}
                        className="sticky bottom-0 col-span-12 flex max-h-max flex-col gap-5 rounded-lg border border-gray-200 bg-white p-3 shadow-sm shadow-gray-400 transition-all duration-300 ease-out lg:top-30 lg:col-span-4 lg:p-5"
                    >
                        {/* Price & Rating */}
                        <div className="hidden items-center justify-between lg:flex">
                            <h3 className="text-primary-700 text-3xl font-bold">
                                {apartment.price} USD{" "}
                                <span className="text-primary-600 text-lg">
                                    /Night
                                </span>
                            </h3>
                            <div className="flex items-center gap-1 font-[600] text-gray-600">
                                <i className="fa-solid fa-star text-xl text-yellow-400"></i>
                                <span className="leading-none">
                                    {apartment.rating}
                                </span>
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
                                        start: subDays(
                                            apartment.availability.start,
                                            1,
                                        ),
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
                                        start: subDays(
                                            apartment.availability.start,
                                            1,
                                        ),
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
                </div>
            </section>

            {/* Reviews */}
            <section className="relative my-10 mb-10 px-4 lg:px-6">
                <div className="mx-auto max-w-screen-xl rounded-lg bg-white px-4 py-10 shadow-sm">
                    Review Section
                </div>
            </section>
        </main>
    );
}

const StarRating = ({ rating = 0 }) => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
        let fillPercentage = 0;

        if (rating >= i + 1) {
            fillPercentage = 100; // Full star
        } else if (rating > i) {
            fillPercentage = (rating - i) * 100; // Partial fill
        }

        stars.push(
            <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                className="h-5 w-5"
                fill="none"
            >
                <defs>
                    <linearGradient id={`grad${i}`}>
                        <stop
                            offset={`${fillPercentage}%`}
                            stopColor="#FFD700" // Yellow
                        />
                        <stop
                            offset={`${fillPercentage}%`}
                            stopColor="#D3D3D3" // Gray
                        />
                    </linearGradient>
                </defs>
                <path
                    fill={`url(#grad${i})`} // Use gradient fill
                    d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                />
            </svg>,
        );
    }

    return <div className="flex space-x-0.5">{stars}</div>;
};
