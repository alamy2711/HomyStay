import React from "react";
import FloatingLabel from "../components/common/FloatingLabel";
import PageHeading from "../components/common/PageHeading";

export default function Signup() {
    const di = document.getElementById("di");
    const ci = document.getElementById("check-in");
    return (
        <>
            <PageHeading
                title="Create an Account"
                description="Join us today and find the best apartments for your stay!"
            >
                <main>
                    {/* <FloatingLabel
                        id={"check-in"}
                        type={"text"}
                        label={"Date Start"}
                        icon={"fa-solid fa-calendar"}
                        datepicker="true"
                    /> */}

                    <div
                        className="mt-20 flex items-center justify-center gap-4"
                        date-rangepicker="true"
                        id="date-range-picker2"
                    >
                        <FloatingLabel
                            id="check-in"
                            type="text"
                            label="Date Start"
                            icon="fa-solid fa-calendar"
                            // datepicker="true"
                            name="start"
                        />

                        <span>to</span>

                        <FloatingLabel
                            id="check-out"
                            type="text"
                            label="Date Start"
                            icon="fa-solid fa-calendar"
                            // datepicker="true"
                            name="end"
                        />
                    </div>
                </main>
                <main>
                    <div
                        id="date-range-picker"
                        date-rangepicker="true"
                        class="flex items-center"
                    >
                        <div class="relative">
                            <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                                <svg
                                    class="h-4 w-4 text-gray-500 dark:text-gray-400"
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
                                type="text"
                                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                placeholder="Select date start"
                            />
                        </div>
                        <span class="mx-4 text-gray-500">to</span>
                        <div class="relative">
                            <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                                <svg
                                    class="h-4 w-4 text-gray-500 dark:text-gray-400"
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
                                type="text"
                                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                placeholder="Select date end"
                            />
                        </div>
                    </div>
                </main>
            </PageHeading>
        </>
    );
}
