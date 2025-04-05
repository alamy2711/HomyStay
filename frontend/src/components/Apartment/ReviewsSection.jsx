import { reviews } from "@/dummy-data/reviews-data";
import { users } from "@/dummy-data/users-data";
import React, { useEffect, useState } from "react";
import ReviewForm from "./ReviewForm";

// Single review component
const ReviewCard = ({ review, user }) => {
    return (
        <div className="border-b border-gray-200 py-4 last:border-b-0">
            <div className="flex items-start gap-3">
                {/* User avatar */}
                <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-10 w-10 rounded-full object-cover"
                />

                {/* Review content */}
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-medium text-gray-900">
                                {user.name}
                            </h4>
                            <StarRating rating={review.rating} />
                        </div>
                        <span className="text-sm text-gray-500">
                            {formatTimeAgo(review.createdAt)}
                        </span>
                    </div>

                    <p className="mt-2 text-gray-700">{review.text}</p>
                </div>
            </div>
        </div>
    );
};

export default function ReviewsSection() {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentReviews, setCurrentReviews] = useState([]);
    const reviewsPerPage = 5;

    useEffect(() => {
        // Calculate current reviews whenever currentPage changes
        const indexOfLastReview = currentPage * reviewsPerPage;
        const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
        setCurrentReviews(reviews.slice(indexOfFirstReview, indexOfLastReview));
    }, [currentPage]); // This dependency ensures the effect runs when currentPage changes

    // Calculate total pages
    const totalPages = Math.ceil(reviews.length / reviewsPerPage);

    // Get current reviews
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;

    // Change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: "smooth" }); // Optional: scroll to top
    };

    return (
        <section className="relative -z-1 my-10 mb-10 px-4 lg:px-6">
            <div className="mx-auto grid max-w-screen-xl gap-5 gap-y-15 rounded-lg bg-white px-4 py-10 shadow-sm lg:grid-cols-10">
                {/* Form Side */}
                <ReviewForm />

                {/* Reviews Side */}
                <div className="zshadow-sm rounded-lg bg-white lg:col-span-6 lg:px-5">
                    <div className="zborder-b border-gray-200 pb-6">
                        <h3 className="text-2xl text-(--secondary)">
                            Customer Reviews
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Showing {(currentPage - 1) * reviewsPerPage + 1}-
                            {Math.min(
                                currentPage * reviewsPerPage,
                                reviews.length,
                            )}{" "}
                            of {reviews.length} reviews
                        </p>
                    </div>

                    {/* <div className="divide-y divide-gray-200">
                        {reviews.map((review) => {
                            const user = users.find(
                                (u) => u.id === review.userId,
                            );
                            return user ? (
                                <ReviewCard
                                    key={review.id}
                                    review={review}
                                    user={user}
                                />
                            ) : null;
                        })}
                    </div> */}

                    <div className="divide-y divide-gray-200">
                        {currentReviews.map((review) => {
                            const user = users.find(
                                (u) => u.id === review.userId,
                            );
                            return user ? (
                                <ReviewCard
                                    key={review.id}
                                    review={review}
                                    user={user}
                                />
                            ) : null;
                        })}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={paginate}
                        />
                    )}
                </div>
            </div>
        </section>
    );
}

// Time formatting function
const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);

    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / secondsInUnit);
        if (interval >= 1) {
            return `${interval} ${unit}${interval === 1 ? "" : "s"} ago`;
        }
    }

    return "Just now";
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

// Pagination component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handleClick = (page) => {
        if (page !== currentPage) {
            onPageChange(page);
        }
    };

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);

        if (endPage - startPage + 1 < maxVisible) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        // Always show first page
        if (startPage > 1) {
            pages.push(
                <button
                    key={1}
                    onClick={() => handleClick(1)}
                    className={`rounded-md px-3 py-1 ${1 === currentPage ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
                >
                    1
                </button>,
            );
            if (startPage > 2) {
                pages.push(
                    <span key="start-ellipsis" className="px-2">
                        ...
                    </span>,
                );
            }
        }

        // Visible pages
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handleClick(i)}
                    className={`rounded-md px-3 py-1 ${i === currentPage ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
                >
                    {i}
                </button>,
            );
        }

        // Always show last page
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(
                    <span key="end-ellipsis" className="px-2">
                        ...
                    </span>,
                );
            }
            pages.push(
                <button
                    key={totalPages}
                    onClick={() => handleClick(totalPages)}
                    className={`rounded-md px-3 py-1 ${totalPages === currentPage ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
                >
                    {totalPages}
                </button>,
            );
        }

        return pages;
    };

    return (
        <div className="mt-6 flex items-center justify-center">
            <nav className="flex items-center gap-1">
                <button
                    onClick={() => handleClick(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`rounded-md px-3 py-1 ${currentPage === 1 ? "cursor-not-allowed text-gray-400" : "text-gray-700 hover:bg-gray-100"}`}
                    aria-label="Previous page"
                >
                    &laquo;
                </button>

                {renderPageNumbers()}

                <button
                    onClick={() =>
                        handleClick(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className={`rounded-md px-3 py-1 ${currentPage === totalPages ? "cursor-not-allowed text-gray-400" : "text-gray-700 hover:bg-gray-100"}`}
                    aria-label="Next page"
                >
                    &raquo;
                </button>
            </nav>
        </div>
    );
};