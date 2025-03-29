import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Button from "../common/Button";

const images = [
    {
        original: "/images/Apartments/0001.jpg",
        thumbnail: "/images/Apartments/0001.jpg",
        originalClass: "  block h-full w-full  object-cover object-center",
    },
    {
        original: "/images/Apartments/0002.jpg",
        thumbnail: "/images/Apartments/0002.jpg",
    },
    {
        original: "/images/Apartments/0003.jpg",
        thumbnail: "/images/Apartments/0003.jpg",
    },
    {
        original: "https://picsum.photos/id/1019/1000/600/",
        thumbnail: "https://picsum.photos/id/1019/250/150/",
        originalClass: "  block h-full  object-cover object-center",
    },
];
export default function ApartmentDetails() {
    return (
        <>
            <section className="my-20 mb-10 px-4 lg:px-6">
                <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-5 rounded-lg bg-white px-4 py-10 font-bold shadow-sm lg:grid-cols-10">
                    {/* Apartment Gallery */}
                    <div className="flex h-100 items-center justify-center overflow-hidden rounded-lg bg-gray-400 lg:col-span-6 lg:h-auto">
                        <ImageGallery
                            items={images}
                            showBullets={true}
                            additionalClass="overflow-hiddenc h-auto"
                        />
                    </div>

                    {/* Apartment Info */}
                    <div className="flex flex-col text-gray-500 lg:col-span-4">
                        {/* Title */}
                        <h1 className="text-primary-700 mb-2 text-3xl">
                            <i className="fa-solid fa-location-dot"></i> Spain,
                            Madrid
                        </h1>
                        {/* Rating */}
                        <div className="mb-2 text-yellow-400">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star-half"></i>
                            <span className="text-gray-500">
                                {" "}
                                4.5{" "}
                                <a href="#Reviews" className="underline">
                                    (26 Reviews)
                                </a>
                            </span>
                        </div>
                        <hr className="mx-auto mt-2 mb-6 h-0.5 w-[95%] rounded-sm border-0 bg-gray-200"></hr>
                        {/* Date */}
                        <div className="flex items-center justify-between">
                            <p className="text-lg font-thin">
                                15 Mar 2025 - 23 Mar 2025
                            </p>
                            <i className="fa-regular fa-heart text-2xl"></i>
                        </div>
                        <hr className="bg-transpart mx-auto my-3 border-0"></hr>

                        {/* Rooms */}
                        <div className="flex flex-col gap-3">
                            <div>
                                <i className="fa-solid fa-door-closed w-5"></i>{" "}
                                2 Rooms
                            </div>
                            <div>
                                <i className="fa-solid fa-bed w-5"></i> 3 Beds
                            </div>
                            <div>
                                <i className="fa-solid fa-bath w-5"></i> 2
                                Bathrooms
                            </div>
                            <div>
                                <i className="fa-solid fa-user-group w-5"></i> 5
                                Guests
                            </div>
                        </div>
                        <hr className="bg-transpart mx-auto mt-6 mb-2 h-0.5 w-[95%] rounded-sm border-0"></hr>

                        {/* Price & Share */}
                        <div className="flex items-center justify-between">
                            <h3 className="text-primary-700 text-3xl font-bold">
                                35 USD
                            </h3>
                            <Button href="#" className="border-primary-700 text-primary-700 hover:bg-primary-200 border-2">
                                <i className="fa-solid fa-share-nodes mr-2"></i>
                                Share
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
