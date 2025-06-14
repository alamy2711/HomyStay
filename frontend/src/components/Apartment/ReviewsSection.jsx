// import { reviews as reviewsData } from "@/dummy-data/reviews-data";
import axiosClient from "@/lib/axiosClient";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { formatTimeAgo } from "../../utils/dateFormatter";
import ReviewForm from "./ReviewForm";

const REVIEWS_PER_PAGE = 10;
// const reviews = []

export default function ReviewsSection({ apartmentId }) {
    const [reviews, setReviews] = useState([]);
    const [reviewLoading, setReviewLoading] = useState(true);

    useEffect(() => {
        axiosClient
            .get(`/reviews/${apartmentId}`)
            .then(({ data }) => {
                setReviews(data);
                setReviewLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setReviewLoading(false);
            });
    }, [apartmentId, reviewLoading]);

    const [currentPage, setCurrentPage] = useState(0);
    const offset = currentPage * REVIEWS_PER_PAGE;
    const currentReviews = reviews.slice(offset, offset + REVIEWS_PER_PAGE);
    const pageCount = Math.ceil(reviews.length / REVIEWS_PER_PAGE);

    const handlePageClick = (event) => {
        if (event.selected !== currentPage) {
            setCurrentPage(event.selected);
        }
    };

    if (reviewLoading) {
        return <div></div>;
    }

    return (
        <section className="relative my-10 mb-10 px-4 lg:px-6" id="reviews">
            <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-5 gap-y-15 rounded-lg bg-white px-4 py-10 shadow-sm lg:grid-cols-10">
                {/* Form Side */}
                <ReviewForm apartmentId={apartmentId} setReviewLoading={setReviewLoading} />

                {/* Reviews Side */}
                <div className="rounded-lg bg-white lg:col-span-6 lg:px-5">
                    <div className="border-gray-200 pb-6">
                        <h3 className="text-2xl text-(--secondary)">
                            Customer Reviews
                        </h3>
                        <p className="mb-4 text-sm text-gray-600">
                            Showing {offset + 1}–{offset + REVIEWS_PER_PAGE} of{" "}
                            {reviews.length} reviews
                        </p>
                    </div>

                    {currentReviews.length === 0 && (
                        <p className="text-center text-gray-600">
                            No reviews yet
                        </p>
                    )}
                    <div className="relative h-100 divide-y divide-gray-200 overflow-y-auto">
                        {currentReviews.map((review) => {
                            return (
                                <ReviewCard key={review.id} review={review} />
                            );
                        })}
                        {/* Fog overlay */}
                        {/* <div className="pointer-events-none sticky bottom-0 h-20 w-full bg-gradient-to-t from-white to-transparent" /> */}
                        <div className="pointer-events-none sticky bottom-0 h-24 w-full bg-gradient-to-t from-white via-white/70 to-transparent" />
                    </div>
                    {/* Pagination */}
                    <ReactPaginate
                        previousLabel="←"
                        nextLabel="→"
                        pageCount={pageCount}
                        onPageChange={handlePageClick}
                        containerClassName="flex justify-center space-x-2 mt-10 font-[500]"
                        pageLinkClassName="w-8 h-8 flex items-center justify-center  rounded-full text-sm cursor-pointer hover:bg-primary-200 bg-primary-50 transition"
                        activeLinkClassName="bg-gray-800 text-white bg-primary-700 hover:bg-primary-700"
                        previousLinkClassName="w-8 h-8 flex items-center justify-center  rounded-full text-sm cursor-pointer hover:bg-primary-200 bg-primary-50 transition"
                        nextLinkClassName="w-8 h-8 flex items-center justify-center  rounded-full text-sm cursor-pointer hover:bg-primary-200 bg-primary-50 transition"
                        // Optional for disabled buttons
                        disabledClassName="opacity-50 cursor-not-allowed"
                    />
                </div>
            </div>
        </section>
    );
}

// Single review component

const ReviewCard = ({ review }) => {
    return (
        <div className="border-b border-gray-200 py-4 last:border-b-0">
            <div className="flex items-start gap-3">
                {/* User avatar */}
                <img
                    src={review.client.profile_picture}
                    alt={review.client.first_name}
                    className="h-10 w-10 rounded-full object-cover"
                />

                {/* Review content */}
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-medium text-gray-900">
                                {review.client.first_name}{" "}
                                {review.client.last_name}
                            </h4>
                            <StarRating rating={review.rating} />
                        </div>
                        <span className="text-sm text-gray-500">
                            {formatTimeAgo(new Date(review.created_at))}
                        </span>
                    </div>

                    <p className="mt-2 text-gray-700">{review.comment}</p>
                </div>
            </div>
        </div>
    );
};

const StarRating = ({ rating = 0 }) => {
    return (
        <div className="flex space-x-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    className={`h-4 w-4 ${star <= rating ? "fill-current text-yellow-400" : "fill-none text-gray-300"}`}
                >
                    <path
                        stroke="currentColor"
                        strokeWidth="30"
                        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                    />
                </svg>
            ))}
        </div>
    );
};
