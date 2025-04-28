import axiosClient from "@/lib/axiosClient";
import ApartmentCard from "@components/Apartment/ApartmentCard";
import Button from "@components/common/Button";
import LoadingSpinner from "@components/common/LoadingSpinner";
import React, { useEffect, useState } from "react";

export default function CardsSection() {
    // const [apartments, setApartments] = useState([]);
    // const [apartmentsLoading, setApartmentsLoading] = useState(true);

    // useEffect(() => {
    //     axiosClient
    //         .get("/apartments")
    //         .then((response) => {
    //             setApartments(response.data.data);
    //             setApartmentsLoading(false);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching apartments:", error);
    //             setApartmentsLoading(false);
    //         });
    // }, []);

    const [apartments, setApartments] = useState([]);
    const [apartmentsLoading, setApartmentsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);

    const fetchApartments = (page = 1) => {
        setLoadingMore(page > 1);
        axiosClient
            .get(`/apartments?page=${page}`)
            .then((response) => {
                if (page === 1) {
                    setApartments(response.data.data); // first page, replace
                } else {
                    setApartments((prev) => [...prev, ...response.data.data]); // next pages, add
                }
                setCurrentPage(response.data.current_page);
                setLastPage(response.data.last_page);
            })
            .catch((error) => {
                console.error("Error fetching apartments:", error);
            })
            .finally(() => {
                setApartmentsLoading(false);
                setLoadingMore(false);
            });
    };

    useEffect(() => {
        fetchApartments();
    }, []);

    if (apartmentsLoading) {
        return <LoadingSpinner className="h-[80vh]" />;
    }

    const handleSeeMore = () => {
        fetchApartments(currentPage + 1);
    };

    // if (apartmentsLoading) {
    //     return <LoadingSpinner className="h-[80vh]" />;
    // }

    return (
        <section className="mb-10 px-4 lg:px-6">
            <div className="mx-auto grid max-w-screen-xl grid-cols-1 place-items-center gap-2 gap-y-5 rounded-lg bg-white px-4 py-10 shadow-sm md:grid-cols-2 lg:grid-cols-3">
                {/* Heading */}
                <div className="mb-4 text-center font-bold md:col-span-2 lg:col-span-3">
                    <h1 className="text-2xl text-nowrap text-(--secondary) lg:text-3xl">
                        Find Your Perfect
                        <span className="text-primary-700"> Apartment</span>
                    </h1>
                    <p className="text-sm text-gray-500 lg:text-base">
                        Discover the best apartments available for your next
                        stay.
                    </p>
                </div>

                {/* <!-- Card --> */}
                {apartments.map((apartment, index) => (
                    <ApartmentCard
                        key={apartment.id}
                        apartment={apartment}
                        className="apartment-card"
                        style={{ animationDelay: `${index * 20}ms` }} // 100ms delay between cards
                    />
                ))}

                {/* <!-- See More Button --> */}
                {/* <div className="col-span-1 mt-5 flex items-center justify-center md:col-span-2 lg:col-span-3">
                    <Button className="bg-primary-700 hover:bg-primary-800 text-white">
                        See More
                    </Button>
                </div> */}
                {lastPage > 1 && currentPage < lastPage && (
                    <div className="col-span-1 mt-5 flex items-center justify-center md:col-span-2 lg:col-span-3">
                        <Button
                            onClick={handleSeeMore}
                            className="bg-primary-700 hover:bg-primary-800 text-white"
                            disabled={loadingMore}
                        >
                            {loadingMore ? "Loading..." : "See More"}
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}
