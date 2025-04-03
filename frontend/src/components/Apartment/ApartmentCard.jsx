import ImageSwiper from "@components/common/ImageSwiper";
import { useAuth } from "@contexts/AuthContext";
import React, { useMemo, useState } from "react";
import { Link } from "react-router";

export default function ApartmentCard({ apartment }) {
    const { user, token } = useAuth();
    const [isHovered, setIsHovered] = useState(false); // Add-to-Favorites Button

    // useMemo to prevent formating the date in every render
    const [formattedDateStart, formattedDateEnd] = useMemo(() => {
        return [
            `${apartment.availability.start.getDate()} ${apartment.availability.start.toLocaleString("default", { month: "short" })}`,
            `${apartment.availability.end.getDate()} ${apartment.availability.end.toLocaleString("default", { month: "short" })}`,
        ];
    }, [apartment.availability.start, apartment.availability.end]);

    return (
        <div className="hover:bg-primary-50 relative grid w-full max-w-sm grid-cols-2 gap-2 rounded-lg border border-gray-200 bg-white p-3 shadow-sm shadow-gray-400 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md">
            {/* Invisible Link Layer */}
            <Link
                to="/apartment-details"
                onClick={() => window.scrollTo(0, 0)}
                className="absolute inset-0 z-0"
            ></Link>
            {/* <!-- Image --> */}
            <div className="col-span-2 h-70 overflow-hidden rounded-lg">
                {/* <ImageSlider images={apartment.images} /> */}
                <ImageSwiper images={apartment.images} />
            </div>
            {/* <!-- Locatin --> */}
            <div className="text-primary-700 col-span-2 flex flex-row items-center gap-2">
                <i className="fa-solid fa-location-dot text-xl"></i>
                <h3 className="text-xl italic">{apartment.location}</h3>
            </div>
            {/* <!-- Date --> */}
            <p className="text-gray-500">
                {formattedDateStart} - {formattedDateEnd}
            </p>
            {/* <!-- Rate --> */}
            <div className="flex items-center justify-end gap-1 font-[500] text-gray-600">
                <i className="fa-solid fa-star text-yellow-400"></i>
                <span className="leading-none">{apartment.rating}</span>
            </div>
            {/* <!-- Amenities --> */}
            <div className="flex flex-row items-center gap-5 font-bold text-gray-500">
                <div className="flex flex-row items-center gap-1">
                    {apartment.beds} <i className="fa-solid fa-bed"></i>
                </div>
                <div className="flex flex-row items-center gap-1">
                    {apartment.bathrooms} <i className="fa-solid fa-bath"></i>
                </div>
                <div className="flex flex-row items-center gap-1">
                    {apartment.guests}{" "}
                    <i className="fa-solid fa-user-group"></i>
                </div>
            </div>
            {/* <!-- Price --> */}
            <div className="flex flex-row items-center justify-end gap-1">
                <h3 className="text-primary-700 text-right text-[1.65rem]">
                    {apartment.price} USD
                </h3>
            </div>
            {/* Add-to-Favorites Buttons : Shown for Visitors and Clients only */}
            {(!token || user.role == "client") && (
                <button
                    className="absolute top-5 right-5 z-31"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <i
                        className={`fa-heart text-3xl transition-all duration-300 ease-in-out ${isHovered ? "fa-solid text-red-400" : "fa-regular text-white"}`}
                    ></i>
                </button>
            )}
        </div>
    );
}
