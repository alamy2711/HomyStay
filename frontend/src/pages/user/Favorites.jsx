import ApartmentCard from "@components/Apartment/ApartmentCard";
import LoadingSpinner from "@components/common/LoadingSpinner";
import { useApartments } from "@contexts/ApartmentsContext";
import React, { useEffect, useState } from "react";
import axiosClient from "@/lib/axiosClient";

export default function Favorites() {
    // const { apartments, loading: apartmentsLoading } = useApartments();
    // apartments.splice(3);

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

    return (
        <section className="my-15 px-4 lg:my-30 lg:px-6">
            <div className="mx-auto grid max-w-screen-xl grid-cols-1 place-items-center gap-2 gap-y-5 rounded-lg bg-white px-4 py-10 shadow-sm md:grid-cols-2 lg:grid-cols-3">
                {/* Heading */}
                <div className="mb-4 text-center font-bold md:col-span-2 lg:col-span-3">
                    <h1 className="text-2xl text-nowrap text-(--secondary) lg:text-3xl">
                        Favorites
                    </h1>
                    <p className="text-sm text-gray-500 lg:text-base">
                        Discover your favorite apartments.
                    </p>
                </div>
                {/* <!-- Card --> */}
                {apartmentsLoading ? (
                    <LoadingSpinner />
                ) : (
                    apartments.map((apartment) => (
                        <ApartmentCard
                            key={apartment.id}
                            apartment={apartment}
                            setApartments={setApartments}
                        />
                    ))
                )}
            </div>
        </section>
    );
}
