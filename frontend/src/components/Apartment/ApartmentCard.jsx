import React, { useState } from "react";

function ImageSlider() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            id="default-carousel"
            className="relative w-full"
            data-carousel="static"
        >
            {/* <!-- Carousel wrapper --> */}
            <div className="relative  overflow-hidden rounded-lg h-70">
                {/* <!-- Item 1 --> */}
                <div
                    className="hidden duration-700 ease-in-out"
                    data-carousel-item
                >
                    <img
                        src="images/Apartments/0001.jpg"
                        className="absolute top-1/2 left-1/2 block h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover object-center"
                        alt="..."
                    />
                </div>
                {/* <!-- Item 2 --> */}
                <div
                    className="hidden duration-700 ease-in-out"
                    data-carousel-item
                >
                    <img
                        src="images/Apartments/0001.jpg"
                        className="absolute top-1/2 left-1/2 block h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover object-center"
                        alt="..."
                    />
                </div>
                {/* <!-- Item 3 --> */}
                <div
                    className="hidden duration-700 ease-in-out"
                    data-carousel-item
                >
                    <img
                        src="images/Apartments/0001.jpg"
                        className="absolute top-1/2 left-1/2 block h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover object-center"
                        alt="..."
                    />
                </div>
            </div>
            {/* <!-- Slider indicators --> */}
            <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3">
                <button
                    type="button"
                    className="h-3 w-3 rounded-full"
                    aria-current="true"
                    aria-label="Slide 1"
                    data-carousel-slide-to="0"
                ></button>
                <button
                    type="button"
                    className="h-3 w-3 rounded-full"
                    aria-current="false"
                    aria-label="Slide 2"
                    data-carousel-slide-to="1"
                ></button>
                <button
                    type="button"
                    className="h-3 w-3 rounded-full"
                    aria-current="false"
                    aria-label="Slide 3"
                    data-carousel-slide-to="2"
                ></button>

            </div>
            {/* <!-- Slider controls --> */}
            <button
                type="button"
                className="group absolute start-0 top-1/2 z-30 flex -translate-y-1/2 cursor-pointer items-center justify-center px-4 focus:outline-none"
                data-carousel-prev
            >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-white/30 group-hover:bg-white/50">
                    <svg
                        className="h-4 w-4 text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 1 1 5l4 4"
                        />
                    </svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>
            <button
                type="button"
                className="group absolute end-0 top-1/2 z-30 flex -translate-y-1/2 cursor-pointer items-center justify-center px-4 focus:outline-none"
                data-carousel-next
            >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-white/30 group-hover:bg-white/50">
                    <svg
                        className="h-4 w-4 text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 9 4-4-4-4"
                        />
                    </svg>
                    <span className="sr-only">Next</span>
                </span>
            </button>
            {/* Add to Favorite Buttom */}
            {/* <a href="#" className="absolute top-3 right-3 z-31">
                <i className="fa-regular fa-heart text-3xl text-white"></i>
            </a> */}
            <a
                href="#"
                className="absolute top-3 right-3 z-31"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <i
                    className={`fa-heart text-3xl transition-all duration-300 ease-in-out ${isHovered ? "fa-solid text-red-400" : "fa-regular text-white"}`}
                ></i>
            </a>
        </div>
    );
}

export default function ApartmentCard() {
    return (
        <div className="grid w-full max-w-sm grid-cols-2 gap-2 rounded-lg border border-gray-200 bg-white p-3 shadow-sm shadow-gray-400">
            {/* <!-- Image --> */}
            <div className="col-span-2 h-70 overflow-hidden rounded-lg">
                <ImageSlider />
                {/* <img
                    src="images/Apartments/0001.jpg"
                    alt="Card Image"
                    className="h-full w-full object-cover object-center"
                /> */}
            </div>
            {/* <!-- Title --> */}
            <div className="text-primary-700 col-span-2 flex flex-row items-center gap-2">
                <i className="fa-solid fa-location-dot text-xl"></i>
                <h3 className="text-xl">Spain, Madrid</h3>
            </div>
            {/* <!-- Date --> */}
            <p className="text-gray-500">15 Mar - 24 Mar</p>
            {/* <!-- Rate --> */}
            <div className="flex flex-row items-center justify-end gap-1">
                <i className="fa-solid fa-star text-yellow-500"></i> 4.5
            </div>
            {/* <!-- Amenities --> */}
            <div className="flex flex-row items-center gap-5 font-bold text-gray-500">
                <div className="flex flex-row items-center gap-1">
                    3 <i className="fa-solid fa-bed"></i>
                </div>
                <div className="flex flex-row items-center gap-1">
                    2 <i className="fa-solid fa-bath"></i>
                </div>
                <div className="flex flex-row items-center gap-1">
                    5 <i className="fa-solid fa-user-group"></i>
                </div>
            </div>
            {/* <!-- Price --> */}
            <div className="flex flex-row items-center justify-end gap-1">
                <h3 className="text-primary-700 text-right text-3xl">35 USD</h3>
            </div>
        </div>
    );
}
