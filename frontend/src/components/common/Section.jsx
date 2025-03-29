import React from "react";

export default function Section({ className, children }) {
    return (
        <section className="my-20 mb-10 px-4 lg:px-6">
            <div
                className={`mx-auto max-w-screen-xl rounded-lg bg-white px-4 py-10 text-gray-500 shadow-sm ${className}`}
            >
                {children}
            </div>
        </section>
    );
}
