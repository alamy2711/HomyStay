import React from "react";

export default function PageHeading({ title, description }) {
    return (
        <section className="my-20 mb-10 px-4 lg:px-6">
            <div className="mx-auto max-w-screen-xl rounded-lg bg-white px-4 py-10 font-bold shadow-sm">
                <h1 className="text-center text-3xl text-(--secondary)">
                    {title}
                </h1>
                <p className="text-center text-gray-500">{description}</p>
            </div>
        </section>
    );
}
