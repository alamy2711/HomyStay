import ApartmentCard from "@components/Apartment/ApartmentCard";
import Button from "@components/common/Button";
import LoadingSpinner from "@components/common/LoadingSpinner";
import { useApartments } from "@contexts/ApartmentsContext";
import React from "react";

export default function Favorites() {
    const { apartments, loading: apartmentsLoading } = useApartments();
    apartments.splice(3);

    return (
        <section className="my-15 px-4 lg:my-30 lg:px-6">
            <div className="mx-auto grid max-w-screen-xl grid-cols-1 place-items-center gap-2 gap-y-5 rounded-lg bg-white px-4 py-10 shadow-sm md:grid-cols-2 lg:grid-cols-3">
                {/* Heading */}
                <div className="mb-4 text-center font-bold md:col-span-2 lg:col-span-3">
                    <h1 className="text-2xl text-nowrap text-(--secondary) lg:text-3xl">
                        Favorites
                    </h1>
                    <p className="lg:text-base text-sm text-gray-500">
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
                        />
                    ))
                )}
            </div>
        </section>
    );
}
