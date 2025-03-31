import React, { useState } from "react";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function ImageSwiper({ images, isGallery }) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    return (
        <div className="flex h-full flex-col select-none">
            {/* Main Swiper */}
            <Swiper
                className="h-full w-full"
                style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                }}
                modules={[Navigation, Pagination, Thumbs]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                loop={true}
                pagination={{ clickable: true }}
                thumbs={{ swiper: thumbsSwiper }}
            >
                {images.map((image, index) => {
                    return (
                        <SwiperSlide key={index}>
                            {/* <div className="h-60 border-2 bg-amber-300"> */}
                            <img
                                className="h-full w-full object-cover object-center"
                                src={image}
                                alt={`Apartment view ${index + 1}`}
                                loading="lazy"
                                decoding="async"
                            />
                            {/* </div> */}
                        </SwiperSlide>
                    );
                })}
            </Swiper>

            {/* Thumb Swiper */}
            {isGallery && (
                <Swiper
                    className="mt-2 h-13 w-full md:h-23"
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={4.25}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs, FreeMode]}
                >
                    {images.map((image, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <img
                                    className="h-full w-full object-cover object-center"
                                    src={image}
                                    alt={`Apartment view ${index + 1}`}
                                    loading="lazy"
                                    decoding="async"
                                />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            )}
        </div>
    );
}
