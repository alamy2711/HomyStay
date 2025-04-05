import React from "react";
import ReviewForm from "./ReviewForm";

export default function ReviewsSection() {
    return (
        <section className="relative my-10 mb-10 px-4 lg:px-6">
            <div className="mx-auto grid max-w-screen-xl gap-5 rounded-lg bg-white px-4 py-10 shadow-sm lg:grid-cols-10">
                {/* Form Side */}
                <ReviewForm />
                {/* Reviews Side */}
                <div className="h-200 bg-gray-100 lg:col-span-6">Reviews</div>
            </div>
        </section>
    );
}
