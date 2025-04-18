import React from "react";

function MiniCard(props) {
    return (
        <div className="col-span-2 grid grid-cols-[fit-content(100%)_fit-content(165px)] place-content-center gap-x-3 md:col-span-1">
            <i
                className={`fa-solid ${props.icon} text-primary-700 text-4xl`}
            ></i>
            <h3 className="text-2xl text-nowrap text-(--secondary)">
                {props.title}
            </h3>
            <p className="col-start-2 text-sm text-gray-500">
                {props.description}
            </p>
        </div>
    );
}

export default function WhyChooseUs() {
    return (
        <section className="mb-10 px-4 lg:px-6">
            <div className="mx-auto grid  grid-cols-2 items-start gap-y-6 rounded-lg bg-white px-4 py-10 font-bold shadow-sm">
                {/* Heading */}
                <div className="col-span-2 mb-10 text-center">
                    <h1 className="text-3xl text-(--secondary)">
                        Why Choose{" "}
                        <span className="text-primary-700 mb-12">Us</span>?
                    </h1>
                    <p className="text-gray-500">
                        We make apartment booking & hosting effortless with
                        secure, user-friendly features.
                    </p>
                </div>
                {/* <!-- Mini Card --> */}
                <MiniCard
                    icon="fa-house-chimney"
                    title="Easy Hosting"
                    description="We ensure smooth, protected payments for both renters &
                        hosts."
                />
                {/* <!-- Mini Card --> */}
                <MiniCard
                    icon="fa-shield-halved"
                    title="Privacy & Security"
                    description="Your data and interactions are safeguarded for a
                        worry-free experience."
                />
                {/* <!-- Mini Card --> */}
                <MiniCard
                    icon="fa-search"
                    title="Smart Search"
                    description="Advanced filters help renters quickly find the perfect
                        place."
                />
                {/* <!-- Mini Card --> */}
                <MiniCard
                    icon="fa-star"
                    title="Verified Reviews"
                    description="Read honest reviews from real users before booking."
                />
            </div>
        </section>
    );
}
