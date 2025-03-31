import ApartmentCard from "@components/Apartment/ApartmentCard";
import { useApartments } from "@contexts/ApartmentsContext";
import React from "react";

export default function CardsSection() {
    const { apartments } = useApartments();

    const cards = [];

    for (let i = 0; i < 12; i++) {
        cards.push(<ApartmentCard key={i} />);
    }

    return (
        <section className="mb-10 px-4 lg:px-6">
            <div className="mx-auto grid max-w-screen-xl grid-cols-1 place-items-center gap-2 gap-y-5 rounded-lg bg-white px-4 py-10 shadow-sm md:grid-cols-2 lg:grid-cols-3">
                {/* Heading */}
                <div className="mb-4 text-center font-bold md:col-span-2 lg:col-span-3">
                    <h1 className="text-3xl text-(--secondary)">
                        Find Your Perfect
                        <span className="text-primary-700"> Apartment</span>
                    </h1>
                    <p className="text-gray-500">
                        Discover the best apartments available for your next
                        stay.
                    </p>
                </div>
                {/* <!-- Card --> */}
                {/* {cards} */}
                {apartments.map((apartment) => (
                    <ApartmentCard key={apartment.id} apartment={apartment} />
                ))}

                {/* <!-- See More Button --> */}
                <div className="col-span-1 mt-5 flex items-center justify-center md:col-span-2 lg:col-span-3">
                    <a
                        href="#"
                        className="bg-primary-700 hover:bg-primary-800 rounded-full px-6 py-2.5 text-sm font-medium text-white lg:px-7 lg:py-3"
                    >
                        See More
                    </a>
                </div>
            </div>
        </section>
    );
}
