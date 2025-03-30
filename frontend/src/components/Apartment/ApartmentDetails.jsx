import React from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import Button from "../common/Button";

const images = [
    {
        original: "/images/apartments/0001.jpg",
        thumbnail: "/images/apartments/0001.jpg",
    },
    {
        original: "/images/apartments/0002.jpg",
        thumbnail: "/images/apartments/0002.jpg",
    },
    {
        original: "/images/apartments/0003.jpg",
        thumbnail: "/images/apartments/0003.jpg",
    },
    {
        original: "/images/apartments/ap0004.jpg",
        thumbnail: "/images/apartments/ap0004.jpg",
        originalClass: "w-full h-full object-cover ",
    },
    {
        original: "https://picsum.photos/id/1019/1000/600/",
        thumbnail: "https://picsum.photos/id/1019/1000/600/",
    },
    {
        original: "/images/apartments/0003.jpg",
        thumbnail: "/images/apartments/0003.jpg",
    },
    {
        original: "/images/apartments/ap0004.jpg",
        thumbnail: "/images/apartments/ap0004.jpg",
    },
    {
        original: "https://picsum.photos/id/1019/1000/600/",
        thumbnail: "https://picsum.photos/id/1019/1000/600/",
    },
];
const images2 = [
    {
        original: "/images/apartments/0001.jpg",
        thumbnail: "/images/apartments/0001.jpg",
    },
    {
        original: "/images/apartments/0002.jpg",
        thumbnail: "/images/apartments/0002.jpg",
    },
    {
        original: "/images/apartments/0003.jpg",
        thumbnail: "/images/apartments/0003.jpg",
    },
    {
        original: "/images/apartments/ap0004.jpg",
        thumbnail: "/images/apartments/ap0004.jpg",
    },
    {
        original: "https://picsum.photos/id/1019/1000/600/",
        thumbnail: "https://picsum.photos/id/1019/1000/600/",
    },
    {
        original: "/images/apartments/0003.jpg",
        thumbnail: "/images/apartments/0003.jpg",
    },
    {
        original: "/images/apartments/ap0004.jpg",
        thumbnail: "/images/apartments/ap0004.jpg",
    },
    {
        original: "https://picsum.photos/id/1019/1000/600/",
        thumbnail: "https://picsum.photos/id/1019/1000/600/",
    },
];

const images3 = [
    "/images/apartments/0001.jpg",
    "/images/apartments/0002.jpg",
    "/images/apartments/0003.jpg",
    "/images/apartments/ap0004.jpg",
];

function ImageSlider({ images }) {
    return (
        <div
            id="default-carousel"
            className="relative w-full"
            data-carousel="static"
        >
            {/* <!-- Carousel wrapper --> */}
            <div className="relative h-60 md:h-110 overflow-hidden rounded-lg">
                {/* <!-- Images --> */}
                {images.map((image, index) => {
                    return (
                        <div
                            className="hidden duration-700 ease-in-out"
                            data-carousel-item
                            key={index}
                        >
                            <img
                                src={image}
                                className="absolute top-1/2 left-1/2 block h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover object-center"
                                alt="..."
                            />
                        </div>
                    );
                })}
            </div>
            {/* <!-- Slider indicators --> */}
            <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3">
                {images.map((image, index) => {
                    return (
                        <button
                            type="button"
                            className="h-3 w-3 rounded-full"
                            aria-current={index == 0 ? "true" : "false"}
                            aria-label={`Slide ${index}`}
                            data-carousel-slide-to={index}
                            key={index}
                        ></button>
                    );
                })}
            </div>
            {/* <!-- Slider controls --> */}
            {/* Next Button */}
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
            {/* Prev Button */}
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
        </div>
    );
}
export default function ApartmentDetails() {
    return (
        <>
            <section className="my-20 mb-10 px-4 lg:px-6">
                <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-5 rounded-lg bg-white px-4 py-10 font-bold shadow-sm lg:grid-cols-10">
                    {/* <div className="flex h-100 items-center justify-center overflow-hidden rounded-lg bg-gray-400 lg:col-span-6 lg:h-auto">
                        <ImageGallery
                            items={images}
                            renderLeftNav={() => {return null}}
                            renderRightNav={() => {return null}}
                            // additionalClass="   [&>div>div]:h-100 [&>div>div]:overflow-hidden"
                            // additionalClass="   [&>div>div]:h-100  [&_.image-gallery-image]:h-full"

                            // good version
                            additionalClass=" w-full
                                [&_.image-gallery-slide-wrapper]:h-100

                                [&_.image-gallery-center]:!h-100
                                [&_.image-gallery-center]:!w-full

                                [&_.image-gallery-image]:h-full
                                [&_.image-gallery-image]:w-full
                                [&_.image-gallery-image]:object-cover
                                [&_.image-gallery-image]:object-center
                                [&_.image-gallery-image]:border-2
                                [&_.image-gallery-image]:
                                
                                [&_.image-gallery-thumbnail_span]:h-[60px]

                                [&_.image-gallery-thumbnail-image]:h-full
                                [&_.image-gallery-thumbnail_img]:w-full
                                [&_.image-gallery-thumbnail_img]:object-cover
                                [&_.image-gallery-thumbnail_img]:object-center"

                            //improved versin
                            // additionalClass="w-full
                            //     [&_.image-gallery-center]:!h-100 [&_.image-gallery-center]:!w-full

                            //     [&_img]:h-full
                            //     [&_img]:w-full
                            //     [&_img]:object-cover
                            //     [&_img]:object-center

                            //     [&_.image-gallery-thumbnail_span]:h-[60px]

                            //     []"
                        />
                    </div> */}
                    {/* <div className="flex items-center justify-center overflow-hidden rounded-lg bg-gray-400 lg:col-span-6 lg:h-auto">
                        <ImageGallery
                            items={images2}
                            showThumbnails={true}
                            showNav={false}
                            showPlayButton={false}
                            showFullscreenButton={false}
                            slideDuration={0}
                            additionalClass="w-full
                            
                                [&_img]:h-full
                                [&_img]:w-full
                                [&_img]:!object-cover
                                [&_img]:object-center
                            

                                [&_.image-gallery-center]:h-60
                                [&_.image-gallery-center]:lg:h-100
                                [&_.image-gallery-center]:w-full

                                [&_.image-gallery-thumbnail-inner]:h-13
                                [&_.image-gallery-thumbnail-inner]:lg:h-15
                                [&_.image-gallery-thumbnail-inner]:w-full

                                [&_.image-gallery-thumbnails]:bg-gradient-to-r
                                [&_.image-gallery-thumbnails]:from-white
                                [&_.image-gallery-thumbnails]:via-gray-300
                                [&_.image-gallery-thumbnails]:to-white

                                
                            "
                        />
                    </div> */}

                    {/* Apartment Gallery */}
                    <div className="flex items-center justify-center overflow-hidden rounded-lg bg-gray-400 lg:col-span-6 lg:h-auto">
                        <ImageSlider images={images3} />
                    </div>

                    {/* Apartment Info */}
                    <div className="flex flex-col text-gray-500 lg:col-span-4 md:px-2">
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
                            <Button
                                href="#"
                                className="border-primary-700 text-primary-700 hover:bg-primary-200 border-2"
                            >
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
