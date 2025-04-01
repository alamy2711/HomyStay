import ImageSwiper from "@components/common/ImageSwiper";
import { useAuth } from "@contexts/AuthContext";
import React, { useMemo, useState } from "react";
import { Link } from "react-router";

export function ImageSlider({ images }) {
    const { user, token } = useAuth();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            id="default-carousel"
            className="relative w-full"
            data-carousel="static"
        >
            {/* <!-- Carousel wrapper --> */}
            <div className="relative h-70 overflow-hidden rounded-lg">
                {/* <!-- Images --> */}
                {images.map((image, index) => {
                    return (
                        <div
                            className="hidden duration-700 ease-in-out"
                            data-carousel-item
                            key={index}
                        >
                            <img
                                src={image}
                                className="absolute top-1/2 left-1/2 block h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover object-center"
                                alt={`Apartment view ${index + 1}`}
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                    );
                })}
            </div>
            {/* <!-- Slider indicators --> */}
            <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3">
                {images.map((image, index) => {
                    return (
                        <button
                            type="button"
                            className="h-3 w-3 rounded-full"
                            aria-current={index == 0 ? "true" : "false"}
                            aria-label={`Slide ${index}`}
                            data-carousel-slide-to={index}
                            key={index}
                        ></button>
                    );
                })}
            </div>
            {/* <!-- Slider controls --> */}
            {/* Next Button */}
            <button
                type="button"
                className="group absolute start-0 top-1/2 z-30 flex -translate-y-1/2 cursor-pointer items-center justify-center px-4 focus:outline-none"
                data-carousel-prev
            >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-white/30 group-hover:bg-white/50">
                    <svg
                        className="h-4 w-4 text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 1 1 5l4 4"
                        />
                    </svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>
            {/* Prev Button */}
            <button
                type="button"
                className="group absolute end-0 top-1/2 z-30 flex -translate-y-1/2 cursor-pointer items-center justify-center px-4 focus:outline-none"
                data-carousel-next
            >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-white/30 group-hover:bg-white/50">
                    <svg
                        className="h-4 w-4 text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 9 4-4-4-4"
                        />
                    </svg>
                    <span className="sr-only">Next</span>
                </span>
            </button>
            {/* Show Add-to-Favorites Buttons only to Visitors and Clients */}
            {(!token || user.role == "client") && (
                <a
                    href="#"
                    className="absolute top-3 right-3 z-31"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <i
                        className={`fa-heart text-3xl transition-all duration-300 ease-in-out ${isHovered ? "fa-solid text-red-400" : "fa-regular text-white"}`}
                    ></i>
                </a>
            )}
        </div>
    );
}

export default function ApartmentCard({ apartment }) {
    const { user, token } = useAuth();
    const [isHovered, setIsHovered] = useState(false);
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
                className="absolute inset-0 z-0"
            ></Link>
            {/* <a href="/apartment-details" className="absolute inset-0 z-0"></a> */}
            {/* <!-- Image --> */}
            <div className="col-span-2 h-70 overflow-hidden rounded-lg">
                {/* <ImageSlider images={apartment.images} /> */}
                <ImageSwiper images={apartment.images} />
            </div>
            {/* <!-- Title --> */}
            <div className="text-primary-700 col-span-2 flex flex-row items-center gap-2">
                <i className="fa-solid fa-location-dot text-xl"></i>
                {/* <a href="/apartment-details"> */}
                <h3 className="text-xl italic">{apartment.location}</h3>
                {/* </a> */}
            </div>
            {/* <!-- Date --> */}
            <p className="text-gray-500">
                {formattedDateStart} - {formattedDateEnd}
            </p>
            {/* <!-- Rate --> */}
            <div className="flex items-center justify-end gap-1 font-[500] text-gray-600">
                <i className="fa-solid fa-star text-yellow-400"></i>
                <span>{apartment.rating}</span>
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
                <a
                    href="#"
                    className="absolute top-5 right-5 z-31"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <i
                        className={`fa-heart text-3xl transition-all duration-300 ease-in-out ${isHovered ? "fa-solid text-red-400" : "fa-regular text-white"}`}
                    ></i>
                </a>
            )}
        </div>
    );
}
