import React, { useEffect, useState } from "react";

function SortMenu() {
    return (
        <div
            id="dropdownHelperRadio"
            className="z-40 hidden w-60 divide-y divide-gray-100 rounded-lg border border-gray-200 bg-white shadow-sm shadow-gray-400"
            data-popper-reference-hidden=""
            data-popper-escaped=""
            data-popper-placement="top"
            style={{
                position: "absolute",
                inset: "auto auto 0px 0px",
                margin: "0px",
                transform: "translate3d(522.5px, 6119.5px, 0px)",
            }}
        >
            <ul
                className="space-y-1 p-3 text-sm text-gray-700"
                aria-labelledby="dropdownHelperRadioButton"
            >
                <li>
                    <label className="sort-radio-label flex cursor-pointer rounded-sm p-2 hover:bg-primary-200">
                        <input
                            defaultChecked
                            name="helper-radio"
                            type="radio"
                            className="hidden"
                        />
                        <div className="ms-2 flex items-center gap-3 text-sm font-medium text-nowrap text-gray-600">
                            <i className="fa-solid fa-star"></i>
                            Recommended
                        </div>
                    </label>
                </li>
                <li>
                    <label className="sort-radio-label flex cursor-pointer rounded-sm p-2 hover:bg-primary-200">
                        <input
                            name="helper-radio"
                            type="radio"
                            className="hidden"
                        />
                        <div className="ms-2 flex items-center gap-3 text-sm font-medium text-nowrap text-gray-600">
                            <i className="fa-solid fa-arrow-up-wide-short"></i>
                            Price: Low to high
                        </div>
                    </label>
                </li>
                <li>
                    <label className="sort-radio-label flex cursor-pointer rounded-sm p-2 hover:bg-primary-200">
                        <input
                            name="helper-radio"
                            type="radio"
                            className="hidden"
                        />
                        <div className="ms-2 flex items-center gap-3 text-sm font-medium text-nowrap text-gray-600">
                            <i className="fa-solid fa-arrow-down-wide-short"></i>
                            Price: High to Low
                        </div>
                    </label>
                </li>
            </ul>
        </div>
    );
}

export default function AdvancedSearch() {
    const [skidding, setSkidding] = useState(-20);

    useEffect(() => {
        const updateSkidding = () => {
            const width = window.innerWidth;
            if (width <= 375)
                setSkidding(-28); // xsm
            else if (width <= 640)
                setSkidding(-15); // sm
            else if (width <= 768)
                setSkidding(-20); // md
            else if (width <= 1024)
                setSkidding(-40); // lg
            else setSkidding(-20); // xl
        };

        updateSkidding(); // Initial check
        window.addEventListener("resize", updateSkidding);

        return () => window.removeEventListener("resize", updateSkidding);
    }, []);

    return (
        <section className="mb-10 px-4 lg:px-6" id="search">
            <div className="mx-auto max-w-screen-xl rounded-lg bg-white px-4 py-4 shadow-sm">
                <form
                    action="/explore"
                    method=""
                    className="grid grid-cols-4 gap-3 lg:grid-cols-7"
                >
                    {/* <!-- Search Field --> */}
                    <div className="relative col-span-4 w-full lg:col-span-3">
                        <input
                            type="text"
                            id="floating_outlined"
                            className="peer focus:border-primary-700 block w-full appearance-none rounded-full border-2 border-gray-300 bg-transparent px-4 py-2 text-sm text-gray-900 focus:ring-0 focus:outline-none lg:py-2.5"
                            placeholder=" "
                        />
                        <label
                            htmlFor="floating_outlined"
                            className="peer-focus:text-primary-700 absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
                        >
                            <i className="fa-solid fa-location-dot mr-1 text-lg"></i>
                            Country, City, Place...
                        </label>
                    </div>
                    {/* <!-- Date Start --> */}
                    <div className="relative col-span-2 flex max-w-sm md:col-span-1">
                        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                            <svg
                                className="h-4 w-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                            </svg>
                        </div>
                        <input
                            id="datepicker-range-start"
                            name="start"
                            datepicker={"".toString()}
                            datepicker-autohide={"".toString()}
                            datepicker-format="dd-mm-yyyy"
                            type="text"
                            className="focus:border-primary-700 block w-full rounded-full border-2 border-gray-300 bg-transparent px-2.5 py-2 ps-10 text-sm text-gray-900 focus:ring-0 focus:outline-none lg:py-2.5"
                            placeholder="Check In"
                        />
                    </div>
                    {/* <!-- Date End --> */}
                    <div className="relative col-span-2 flex max-w-sm md:col-span-1">
                        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                            <svg
                                className="h-4 w-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                            </svg>
                        </div>
                        <input
                            id="datepicker-range-end"
                            name="end"
                            datepicker={"".toString()}
                            datepicker-autohide={"".toString()}
                            datepicker-format="dd-mm-yyyy"
                            type="text"
                            className="focus:border-primary-700 block w-full rounded-full border-2 border-gray-300 bg-transparent px-2.5 py-2 ps-10 text-sm text-gray-900 focus:ring-0 focus:outline-none lg:py-2.5"
                            placeholder="Check out"
                        />
                    </div>
                    {/* <!-- Filter Button --> */}
                    <button
                        onClick={(e) => e.preventDefault()}
                        className="bg-primary-700 hover:bg-primary-800 col-span-2 flex items-center justify-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium text-white md:col-span-1 lg:px-5 lg:py-3"
                    >
                        <i className="fa-solid fa-filter"></i>
                        Filter
                    </button>
                    {/* <!-- Sort Button --> */}

                    <button
                        onClick={(e) => e.preventDefault()}
                        id="dropdownHelperRadioButton"
                        data-dropdown-toggle="dropdownHelperRadio"
                        data-dropdown-placement="bottom"
                        data-dropdown-offset-distance="15"
                        data-dropdown-offset-skidding={skidding}
                        className="hover:bg-primary-700 text-primary-700 hover:outline-primary-700 outline-primary-500 col-span-2 flex items-center justify-center gap-3 space-x-5 rounded-full px-4 py-2.5 text-sm font-medium outline-2 hover:text-white md:col-span-1 lg:px-5 lg:py-3"
                    >
                        <i className="fa-solid fa-sort"></i>
                        Sort
                    </button>
                    <SortMenu />
                </form>
            </div>
        </section>
    );
}
