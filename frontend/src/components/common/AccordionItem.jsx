import React from "react";

export default function AccordionItem({ headingID, bodyID, title, children }) {
    return (
        <>
            <h2 id={headingID}>
                <button
                    type="button"
                    className="flex w-full items-center justify-between gap-3 border-b border-gray-300 py-5 text-lg font-medium text-gray-500"
                    data-accordion-target={"#" + bodyID} // # + bodyID
                    aria-expanded="true"
                    aria-controls={bodyID}
                >
                    <span>{title}</span>
                    <svg
                        data-accordion-icon
                        className="h-3 w-3 shrink-0 rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5 5 1 1 5"
                        />
                    </svg>
                </button>
            </h2>
            <div id={bodyID} className="hidden" aria-labelledby={headingID}>
                <div className="border-b border-gray-200 py-5">{children}</div>
            </div>
        </>
    );
}
