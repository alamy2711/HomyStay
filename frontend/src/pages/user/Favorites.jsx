import axiosClient from "@/lib/axiosClient";
import ApartmentCard from "@components/Apartment/ApartmentCard";
import LoadingSpinner from "@components/common/LoadingSpinner";
import React, { useEffect, useState } from "react";

export default function Favorites() {
    const [apartments, setApartments] = useState([]);
    const [apartmentsLoading, setApartmentsLoading] = useState(true);

    useEffect(() => {
        axiosClient
            .get("/favorites")
            .then((response) => {
                setApartments(response.data.data);
                setApartmentsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching apartments:", error);
                setApartmentsLoading(false);
            });
    }, []);

    if (apartmentsLoading) {
        return <LoadingSpinner className="h-[80vh]" />;
    }

    return (
        <section className="my-15 px-4 lg:my-30 lg:px-6">
            <div className="mx-auto grid max-w-screen-xl grid-cols-1 place-items-center gap-2 gap-y-5 rounded-lg bg-white px-4 py-10 shadow-sm md:grid-cols-2 lg:grid-cols-3">
                {/* Heading */}
                <div className="mb-4 text-center font-bold md:col-span-2 lg:col-span-3">
                    <h1 className="text-2xl text-nowrap text-(--secondary) lg:text-3xl">
                        Favorites
                    </h1>
                    <p className="text-sm text-gray-500 lg:text-base">
                        {apartments.length === 0
                            ? "You have no favorite apartments."
                            : "Discover your favorite apartments."}
                    </p>
                </div>
                {/* <!-- Card --> */}
                {apartments.map((apartment) => (
                    <ApartmentCard
                        key={apartment.id}
                        apartment={apartment}
                        setApartments={setApartments}
                    />
                ))}
            </div>
        </section>
    );
}
