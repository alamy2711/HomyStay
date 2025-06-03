import { iconMap } from "@/constants/IconMap";
import axiosClient from "@/lib/axiosClient";
import { formatDate } from "@/utils/dateFormatter";
import ReviewsSection from "@components/Apartment/ReviewsSection";
import Button from "@components/common/Button";
import ImageSwiper from "@components/common/ImageSwiper";
import LoadingSpinner from "@components/common/LoadingSpinner";
import { useAuth } from "@contexts/AuthContext";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApartmentDescription from "./ApartmentDescription";

// Icons
import { TbBed } from "react-icons/tb";
import { LuBath } from "react-icons/lu";
import { HiOutlineUsers } from "react-icons/hi2";
import { RxRulerSquare } from "react-icons/rx";
import { BsDoorClosed } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaStar } from "react-icons/fa";

export default function ApartmentDetails() {
    const { user, token, loading: userLoading } = useAuth();
    const { id } = useParams();
    const [apartment, setApartment] = useState(null);
    const [apartmentLoading, setApartmentLoading] = useState(true);
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState({
        value: false,
        loading: true,
    });

    useEffect(() => {
        axiosClient
            .get(`/apartments/${id}`)
            .then((response) => {
                setApartment(response.data.data);
                setIsFavorite({
                    value: response.data.data.isFavorite,
                    loading: false,
                });
                setApartmentLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching apartments:", error);
                setApartmentLoading(false);
                // Check error code 404
                if (error.response.status === 404) {
                    navigate("/NotFound");
                }
            });
    }, [id]);

    const [apartmentImagesPaths, setApartmentImagesPaths] = useState([]);

    useEffect(() => {
        if (apartment?.pictures) {
            const paths = apartment.pictures.map((img) => img.path);
            setApartmentImagesPaths(paths);
        }
    }, [apartment]);

    // Handle Toggle Favorites Button
    const toggleFavorite = () => {
        if (!token) {
            navigate("/login");
            toast.warning("Please log in to add to favorites.");
            return;
        }

        if (isFavorite.loading) return; // Prevent multiple clicks

        isFavorite.loading = true;

        if (isFavorite.value) {
            axiosClient
                .delete(`/favorites/${apartment.id}`)
                .then((response) => {
                    setIsFavorite({
                        value: false,
                    });
                    toast.success("Apartment removed from favorites!");
                })
                .catch((error) => {
                    console.error(
                        "Error removing apartment from favorites:",
                        error,
                    );
                    toast.error("Failed to remove apartment from favorites.");
                })
                .finally(() => {
                    isFavorite.loading = false;
                });
        } else {
            axiosClient
                .post("/favorites", {
                    apartmentId: apartment.id,
                })
                .then((response) => {
                    setIsFavorite({
                        value: true,
                    });
                    toast.success("Apartment added to favorites!");
                })
                .catch((error) => {
                    console.error(
                        "Error adding apartment to favorites:",
                        error,
                    );
                    toast.error("Failed to add apartment to favorites.");
                })
                .finally(() => {
                    isFavorite.loading = false;
                });
        }
    };

    // Spin while Loading
    if (apartmentLoading || userLoading) {
        return <LoadingSpinner className="h-screen" />;
    }

    return (
        <>
            {/* Gallery $ Info */}
            <section className="my-10 px-4 lg:px-6">
                <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-5 rounded-lg bg-white px-4 py-10 font-bold shadow-sm lg:grid-cols-10">
                    {/* Apartment Gallery */}
                    <div className="h-90 overflow-hidden rounded-lg md:h-120 lg:col-span-6">
                        <ImageSwiper
                            images={apartmentImagesPaths}
                            isGallery={true}
                        />
                    </div>

                    {/* Apartment Info */}
                    <div className="flex flex-col justify-between text-gray-500 md:px-2 lg:col-span-4">
                        {/* Title */}
                        <h1 className="text-primary-700 mb-2 text-2xl lg:text-3xl">
                            {apartment?.title}
                        </h1>
                        {/* Rating */}
                        <div className="flex items-center gap-2 text-yellow-400">
                            <StarRating rating={apartment?.rating} />
                            <span className="leading-none text-gray-500">
                                {" "}
                                {apartment?.rating}{" "}
                                <a
                                    href="#reviews"
                                    className="leading-none underline"
                                >
                                    ({apartment?.reviews.length || "0"} Reviews)
                                </a>
                            </span>
                        </div>
                        <hr className="mt-4 mb-5 h-0.5 w-full rounded-sm border-0 bg-gray-200"></hr>
                        {/* Location & Add-to-Favorite */}
                        <div className="flex items-center gap-2 text-gray-600">
                            {/* <i className="fa-solid fa-location-dot text-2xl"></i> */}
                            <MdOutlineLocationOn className="h-8 w-8" />
                            <h3 className="text-xl italic">
                                {apartment.country} - {apartment.city}
                            </h3>
                            {/* Add-to-Favorites Buttons : Shown for Visitors and Clients only */}
                            {(!token || user.role == "client") && (
                                <button
                                    className="ml-auto"
                                    disabled={isFavorite.loading}
                                    onClick={toggleFavorite}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="1 1 22 22"
                                        className={`h-8 w-8 stroke-gray-600 transition-all duration-300 hover:scale-115 lg:hover:stroke-red-500 ${isFavorite.value ? "fill-red-500 stroke-red-500" : "fill-white"} `}
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
                            {formatDate(
                                new Date(apartment.check_in),
                                "dd MMM yyyy",
                            )}{" "}
                            -{" "}
                            {formatDate(
                                new Date(apartment.check_out),
                                "dd MMM yyyy",
                            )}
                        </p>
                        <hr className="bg-transpart mx-auto my-3 border-0"></hr>
                        {/* General Infos */}
                        <div className="grid grid-cols-2 flex-col gap-3 gap-x-12">
                            <div className="flex items-center gap-2">
                                <div className="inline-block w-6">
                                    {/* <i className="fa-solid fa-door-closed"></i> */}
                                    <TbBed className="h-6 w-6" />
                                </div>
                                <span>{apartment.rooms} Room(s)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="inline-block w-6">
                                    {/* <i className="fa-solid fa-bed"></i> */}
                                    <BsDoorClosed className="h-5 w-5" />
                                </div>
                                <span>{apartment.beds} Bed(s)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="inline-block w-6">
                                    {/* <i className="fa-solid fa-bath"></i> */}
                                    <LuBath className="h-6 w-6" />
                                </div>
                                <span>{apartment.bathrooms} Bathroom(s)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="inline-block w-6">
                                    {/* <i className="fa-solid fa-user-group"></i> */}
                                    <HiOutlineUsers className="h-5 w-5" />
                                </div>
                                <span>{apartment.guests} Guest(s)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="inline-block w-6">
                                    {/* <i className="fa-solid fa-object-group"></i> */}
                                    <RxRulerSquare className="h-5 w-5" />
                                </div>
                                {apartment.area} m<sup>2</sup>
                            </div>
                            <div className="flex items-center gap-2">
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
            <ApartmentDescription apartment={apartment} />

            {/* Reviews */}
            <ReviewsSection apartmentId={apartment.id} />
        </>
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
