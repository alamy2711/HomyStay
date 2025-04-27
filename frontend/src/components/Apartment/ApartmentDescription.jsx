import AMENITIES from "@/constants/Amenities";
import Button from "@components/common/Button";
import { useAuth } from "@contexts/AuthContext";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import ReservationForm from "./ReservationForm";

export default function ApartmentDescription({ apartment }) {
    const { user, token, loading: userLoading } = useAuth();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleContactClick = () => {
        if (!token) {
            toast.warning("Please log in to contact the host.");
            navigate("/login");
        } else if (user.role != "client") {
            toast.error("Only clients can contact the host.");
        }
    };

    return (
        <section className="relative z-1 my-10 mb-10 px-4 lg:px-6">
            <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-5 gap-y-10 rounded-lg bg-white px-4 py-10 shadow-sm lg:grid-cols-12">
                {/* Full Info */}
                <div className="col-span-12 lg:col-span-8 lg:px-5">
                    {/* Host */}
                    <div className="zlg:justify-start flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="border-primary-700 h-13 w-13 overflow-hidden rounded-full border">
                                <img
                                    className="h-full w-full object-cover object-center"
                                    src={apartment.host.profile_picture}
                                    alt="Host Profile Picture"
                                />
                            </div>
                            <div>
                                <h5 className="text-gray-600z text-lg !font-[700] text-(--secondary)">
                                    {apartment.host.first_name}{" "}
                                    {apartment.host.last_name}
                                </h5>
                                <p className="text-[0.8rem] text-gray-500">
                                    Host owner
                                </p>
                            </div>
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
                        <h3 className="mb-5 text-2xl text-(--secondary)">
                            About the Place
                        </h3>
                        <p className="text-lg leading-7.5 font-[500] text-gray-500">
                            {apartment.description}
                        </p>
                    </div>
                    <hr className="mt-6 mb-6 h-0.5 w-full rounded-sm border-0 bg-transparent"></hr>
                    {/* Amenities */}
                    <div>
                        <h3 className="mb-5 text-2xl text-(--secondary)">
                            Amenities
                        </h3>
                        <div className="grid grid-cols-1 gap-5 text-lg font-[500] text-gray-500 md:grid-cols-2">
                            {apartment.amenities.map((amenity, i) => {
                                const amenityInfo = AMENITIES.find(
                                    (item) => item.id === amenity.name,
                                );
                                return amenityInfo ? (
                                    <div key={i} className="flex items-center">
                                        <div className="text-primary-700 inline-block w-10 text-2xl">
                                            {amenityInfo.icon}
                                        </div>
                                        <span className="text-(--secondary)">
                                            {amenityInfo.name}
                                        </span>
                                    </div>
                                ) : null;
                            })}
                        </div>
                    </div>
                </div>
                {/* Reservation Form */}
                <ReservationForm apartment={apartment} />
            </div>
        </section>
    );
}
