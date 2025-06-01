import Button from "@components/common/Button";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../../lib/axiosClient";
import { useNavigate } from "react-router-dom";

export default function ReviewForm({ apartmentId, setReviewLoading }) {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [hoveredRating, setHoveredRating] = useState(0);
    const navigate = useNavigate();

    const maxCharacters = 500;

    const handleStarClick = (selectedRating) => {
        setRating(selectedRating);
    };

    const handleStarHover = (hoveredRating) => {
        setHoveredRating(hoveredRating);
    };

    const handleStarLeave = () => {
        setHoveredRating(0);
    };

    const handleReviewChange = (e) => {
        if (e.target.value.length <= maxCharacters) {
            setReviewText(e.target.value);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        axiosClient
            .post("/reviews", {
                apartmentId: apartmentId,
                rating: rating,
                comment: reviewText,
            })
            .then((res) => {
                setReviewLoading(true);
                toast.success("Review submitted successfully!");
                setRating(0);
                setReviewText("");
            })
            .catch((err) => {
                console.log(err);
                // check error code 401
                if (err.response.status === 401) {
                    toast.warning("Please log in to submit a review.");
                    navigate("/login");
                    return;
                } else if (err.response.status === 403) {
                    toast.error(
                        "Only clients can submit a review for this apartment.",
                    );
                    return;
                }
                toast.error("Something went wrong!");
            });
    };

    return (
        <div className="max-h-max rounded-lg border border-gray-200 bg-white p-5 shadow-sm shadow-gray-400 lg:sticky lg:top-30 lg:order-last lg:col-span-4">
            <h2 className="mb-6 text-center text-2xl font-bold text-(--secondary)">
                Leave a <span className="text-primary-700">Review</span>
            </h2>

            <form onSubmit={onSubmit}>
                {/* Star Rating */}
                <div className="mb-6">
                    <p className="mb-2 font-[Lato] text-gray-700 md:text-[1.05rem]">
                        Your Rating
                    </p>
                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                className="focus:outline-none"
                                onClick={() => handleStarClick(star)}
                                onMouseEnter={() => handleStarHover(star)}
                                onMouseLeave={handleStarLeave}
                            >
                                <svg
                                    viewBox="0 0 64 64"
                                    className={`h-5 w-5 ${(hoveredRating || rating) >= star ? "text-yellow-400" : "text-gray-300"}`}
                                    fill="currentColor"
                                >
                                    <path d="M62.799,23.737c-0.47-1.399-1.681-2.419-3.139-2.642l-16.969-2.593L35.069,2.265  C34.419,0.881,33.03,0,31.504,0c-1.527,0-2.915,0.881-3.565,2.265l-7.623,16.238L3.347,21.096c-1.458,0.223-2.669,1.242-3.138,2.642  c-0.469,1.4-0.115,2.942,0.916,4l12.392,12.707l-2.935,17.977c-0.242,1.488,0.389,2.984,1.62,3.854  c1.23,0.87,2.854,0.958,4.177,0.228l15.126-8.365l15.126,8.365c0.597,0.33,1.254,0.492,1.908,0.492c0.796,0,1.592-0.242,2.269-0.72  c1.231-0.869,1.861-2.365,1.619-3.854l-2.935-17.977l12.393-12.707C62.914,26.68,63.268,25.138,62.799,23.737z" />
                                </svg>
                            </button>
                        ))}
                        <span className="ml-2 leading-none text-gray-600">
                            {rating > 0
                                ? `${rating} star${rating !== 1 ? "s" : ""}`
                                : "Not rated"}
                        </span>
                    </div>
                </div>

                {/* Review Text */}
                <div className="mb-6">
                    <label
                        htmlFor="review"
                        className="mb-2 block font-[Lato] text-gray-700 md:text-[1.05rem]"
                    >
                        Your Review
                    </label>
                    <textarea
                        id="review"
                        rows="5"
                        maxLength={maxCharacters}
                        minLength={10}
                        className="focus:ring-primary-700 max-h-70 min-h-40 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:outline-none"
                        placeholder="Share your experience..."
                        value={reviewText}
                        onChange={handleReviewChange}
                        required
                    ></textarea>
                    <div
                        className={`mt-1 text-right text-sm ${reviewText.length >= 500 || reviewText.length < 10 ? "text-red-500" : "text-gray-500"} `}
                    >
                        {reviewText && reviewText.length < 10
                            ? `${10 - reviewText.length} character(s) remaining`
                            : reviewText.length
                              ? `${reviewText.length}/${maxCharacters} characters`
                              : ""}
                    </div>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={rating === 0 || reviewText.length < 10}
                    className="bg-primary-700 hover:bg-primary-800 w-full px-4 py-2 text-white"
                >
                    Submit Review
                </Button>
            </form>
        </div>
    );
}
