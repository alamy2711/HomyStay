import { formatDate } from "@/utils/dateFormatter";
import ImageSwiper from "@components/common/ImageSwiper";
import { useAuth } from "@contexts/AuthContext";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import axiosClient from "../../lib/axiosClient";
import PropertyStructure from "@/constants/PropertyStructure";

// Icons
import { TbBed } from "react-icons/tb";
import { LuBath } from "react-icons/lu";
import { HiOutlineUsers } from "react-icons/hi2";
import { RxRulerSquare } from "react-icons/rx";
import { BsDoorClosed } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaStar } from "react-icons/fa";

export default function ApartmentCard({
    className = "",
    style = {},
    apartment,
    setApartments = () => {},
}) {
    const { user, token } = useAuth();
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false); // Add-to-Favorites Button
    const [apartmentImagesPaths, setApartmentImagesPaths] = useState([]);
    const [isFavorite, setIsFavorite] = useState({
        value: false,
        loading: true,
    });

    useEffect(() => {
        if (apartment?.pictures) {
            const paths = apartment.pictures.map((img) => img.path);
            setApartmentImagesPaths(paths);
            setIsFavorite({
                value: apartment.isFavorite,
                loading: false,
            });
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
                    setApartments((prevApartments) => {
                        return prevApartments.filter(
                            (apartItem) => apartItem.id !== apartment.id,
                        );
                    });
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

    return (
        <div
            className={`${className} hover:bg-primary-50 relative grid w-full max-w-sm grid-cols-2 gap-2 rounded-lg border border-gray-200 bg-white p-3 shadow-sm shadow-gray-400 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md`}
            style={style}
        >
            {/* Invisible Link Layer */}
            <Link
                to={`/apartments/${apartment.id}`}
                // onClick={() => window.scrollTo(0, 0)}
                className="absolute inset-0 z-0"
                title={apartment.country + ", " + apartment.city}
            ></Link>
            {/* <!-- Image --> */}
            <div className="col-span-2 h-70 overflow-hidden rounded-lg">
                {/* <ImageSlider images={apartment.images} /> */}
                <ImageSwiper images={apartmentImagesPaths} />
            </div>
            {/* <!-- Locatin --> */}
            <div className="text-primary-700 col-span-2 flex flex-row items-center gap-2">
                {/* <i className="fa-solid fa-location-dot text-xl"></i> */}
                <MdOutlineLocationOn className="h-6 w-6" />
                <h3
                    className="truncate text-xl text-nowrap italic"
                    title={"sad"}
                >
                    {apartment.country}, {apartment.city}
                </h3>
            </div>
            {/* <!-- Date --> */}
            <p className="text-gray-500">
                {formatDate(new Date(apartment.check_in), "dd MMM")} -{" "}
                {formatDate(new Date(apartment.check_out), "dd MMM")}
            </p>
            {/* <!-- Rate --> */}
            <div className="flex items-center justify-end gap-1 font-[500] text-gray-600">
                {/* <i className="fa-solid fa-star text-yellow-400"></i> */}
                <FaStar className="h-5 w-5 text-yellow-400"></FaStar>

                <span className="leading-none">{apartment.rating}</span>
            </div>
            {/* <!-- Amenities --> */}
            <div className="flex flex-row items-center gap-5 font-bold text-gray-500">
                <div className="flex flex-row items-center gap-1">
                    {apartment.beds}
                    {/* <i className="fa-solid fa-bed"></i> */}
                    <TbBed className="h-6 w-6 " ></TbBed>
                </div>
                <div className="flex flex-row items-center gap-1">
                    {apartment.bathrooms}
                    {/* <i className="fa-solid fa-bath"></i> */}
                    <LuBath className="h-5 w-5"></LuBath>
                </div>
                <div className="flex flex-row items-center gap-1">
                    {apartment.guests}{" "}
                    {/* <i className="fa-solid fa-user-group"></i> */}
                    <HiOutlineUsers className="h-5 w-5"></HiOutlineUsers>
                </div>
            </div>
            {/* <!-- Price --> */}
            <div className="flex flex-row items-center justify-end gap-1">
                <h3 className="text-primary-700 text-right text-[1.65rem]">
                    {/* {apartment.price} USD */}${apartment.price}
                </h3>
            </div>
            {/* Add-to-Favorites Buttons : Shown for Visitors and Clients only */}
            {(!token || user?.role == "client") && (
                <button
                    className="absolute top-5 right-5 z-31"
                    disabled={isFavorite.loading}
                    onClick={toggleFavorite}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="1 1 22 22"
                        className={`h-8 w-8 stroke-gray-600 transition-all duration-300 hover:scale-115 lg:hover:stroke-red-500 ${isFavorite.value ? "fill-red-500 stroke-red-500" : "fill-transparent stroke-white"} `}
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
            {false && (!token || user?.role == "client") && (
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
