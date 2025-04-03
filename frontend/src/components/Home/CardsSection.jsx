import ApartmentCard from "@components/Apartment/ApartmentCard";
import Button from "@components/common/Button";
import LoadingSpinner from "@components/common/LoadingSpinner";
import { useApartments } from "@contexts/ApartmentsContext";
import React from "react";

export default function CardsSection() {
    const { apartments, loading: apartmentsLoading } = useApartments();

    return (
        <section className="mb-10 px-4 lg:px-6">
            <div className="mx-auto grid max-w-screen-xl grid-cols-1 place-items-center gap-2 gap-y-5 rounded-lg bg-white px-4 py-10 shadow-sm md:grid-cols-2 lg:grid-cols-3">
                {/* Heading */}
                <div className="mb-4 text-center font-bold md:col-span-2 lg:col-span-3">
                    <h1 className="text-2xl text-nowrap text-(--secondary) lg:text-3xl">
                        Find Your Perfect
                        <span className="text-primary-700"> Apartment</span>
                    </h1>
                    <p className="lg:text-md text-sm text-gray-500">
                        Discover the best apartments available for your next
                        stay.
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
                {}
                {/* <!-- See More Button --> */}
                <div className="col-span-1 mt-5 flex items-center justify-center md:col-span-2 lg:col-span-3">
                    <Button className="bg-primary-700 hover:bg-primary-800 text-white">
                        See More
                    </Button>
                </div>
            </div>
        </section>
    );
}
