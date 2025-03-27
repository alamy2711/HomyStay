import React from "react";

export default function ApartmentDetails() {
    return (
        <>
            <section className="my-20 mb-10 px-4 lg:px-6">
                <div className="mx-auto grid max-w-screen-xl gap-5 rounded-lg bg-white px-4 py-10 font-bold shadow-sm lg:grid-cols-10">
                    {/* Apartment Gallery */}
                    <div className="col-span-6 h-96 rounded-lg bg-gray-400">
                        Apartment Gallery
                    </div>

                    {/* Apartment Info */}
                    <div className="col-span-4 flex flex-col gap-5 text-gray-500">
                        {/* Title */}
                        <h1 className="text-primary-700 text-3xl">
                            <i class="fa-solid fa-location-dot"></i> Spain,
                            Madrid
                        </h1>
                        {/* Date */}
                        <div className="font-thin">
                            15 Mar 2025 - 23 Mar 2025
                        </div>
                        {/* Rooms */}
                        <div className="flex flex-col gap-3">
                            <div>
                                <i class="fa-solid fa-bed w-5"></i> 3 Bedrooms
                            </div>
                            <div>
                                <i class="fa-solid fa-bath w-5"></i> 2 Bathrooms
                            </div>
                            <div>
                                <i class="fa-solid fa-user-group w-5"></i> 5
                                Guests
                            </div>
                        </div>
                        {/* Rating */}
                        <div className="text-yellow-400">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star-half"></i>
                            <span className="text-gray-500">
                                {" "}
                                4.5
                                {" "}
                                <a href="#Reviews" className="underline">(26 Reviews)</a>
                            </span>
                        </div>
                        {/*  */}
                        <h3 className="text-primary-700 text-3xl font-bold">
                            35 USD
                        </h3>
                    </div>
                </div>
            </section>
        </>
    );
}
