import React, { useEffect, useState } from "react";
import Accordion from "../common/Accordion";
import AccordionItem from "../common/AccordionItem";
import Modal from "../common/Modal";

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
                    <label className="sort-radio-label hover:bg-primary-200 flex cursor-pointer rounded-sm p-2">
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
                    <label className="sort-radio-label hover:bg-primary-200 flex cursor-pointer rounded-sm p-2">
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
                    <label className="sort-radio-label hover:bg-primary-200 flex cursor-pointer rounded-sm p-2">
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

// function FilterModal({ toggleModal, isOpen }) {
//     // Handle {aria-hidden="true"} Error
//     useEffect(() => {
//         const modalElement = document.getElementById("default-modal");

//         // Set up MutationObserver to observe changes to the modal element
//         const observer = new MutationObserver(() => {
//             if (modalElement) {
//                 // Always remove aria-hidden if it is present
//                 modalElement.removeAttribute("aria-hidden");
//             }
//         });

//         if (modalElement) {
//             // Observe changes to the 'aria-hidden' attribute or any other attribute in the modal
//             observer.observe(modalElement, {
//                 attributes: true,
//                 childList: false,
//                 subtree: false,
//             });
//         }

//         // Clean up observer on component unmount
//         return () => {
//             if (modalElement) {
//                 observer.disconnect();
//             }
//         };
//     }, [isOpen]); // Runs on modal open/close state changes

//     return (
//         <div
//             id="default-modal"
//             tabIndex="-1"
//             // aria-hidden="true"
//             className="fixed top-0 right-0 left-0 z-50 hidden h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-x-hidden overflow-y-auto md:inset-0"
//         >
//             <div className="relative max-h-full w-full max-w-2xl p-4">
//                 {/* <!-- Modal content --> */}
//                 <div className="relative rounded-lg bg-white shadow-sm">
//                     {/* <!-- Modal header --> */}
//                     <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5">
//                         <h3 className="text-xl font-semibold text-gray-900">
//                             Filter
//                         </h3>
//                         <button
//                             type="button"
//                             className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
//                             data-modal-hide="default-modal"
//                             onClick={toggleModal}
//                         >
//                             {/* Close Icon */}
//                             <svg
//                                 className="h-3 w-3"
//                                 // aria-hidden="true"
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 14 14"
//                             >
//                                 <path
//                                     stroke="currentColor"
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
//                                 />
//                             </svg>
//                             <span className="sr-only">Close modal</span>
//                         </button>
//                     </div>
//                     {/* <!-- Modal body --> */}
//                     <div className="max-h-[60vh] space-y-4 overflow-y-auto p-4 md:p-5">
//                         <p className="text-base leading-relaxed text-gray-500">
//                             With less than a month to go before the European
//                             Union enacts new consumer privacy laws for its
//                             citizens, companies around the world are updating
//                             their terms of service agreements to comply.
//                         </p>
//                     </div>
//                     {/* <!-- Modal footer --> */}
//                     <div className="flex items-center rounded-b border-t border-gray-200 p-4 md:p-5">
//                         <button
//                             data-modal-hide="default-modal"
//                             type="button"
//                             className="bg-primary-700 hover:bg-primary-800 rounded-full px-5 py-2.5 text-center text-sm font-medium text-white"
//                         >
//                             Apply
//                         </button>
//                         <button
//                             type="button"
//                             className="hover:text-primary-700 border-primary-200 hover:bg-primary-200 ms-3 rounded-full border bg-white px-5 py-2.5 text-sm font-medium text-gray-900"
//                         >
//                             Clear
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

export default function AdvancedSearch() {
    const [skidding, setSkidding] = useState(-40);
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(null); // Track which checkbox is selected

    const toggleCheckbox = (value) => {
        setSelected((prev) => (prev === value ? null : value)); // Toggle selection
    };
    const toggleModal = () => {
        setIsOpen((prev) => !prev);
    };

    // Dropdown Responsive
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
                                className="h-4 w-4 text-gray-500"
                                // aria-hidden="true"
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
                                className="h-4 w-4 text-gray-500"
                                // aria-hidden="true"
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
                        data-modal-target="filter-modal"
                        data-modal-toggle="filter-modal"
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            toggleModal();
                        }}
                        className="bg-primary-700 hover:bg-primary-800 col-span-2 flex items-center justify-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium text-white md:col-span-1 lg:px-5 lg:py-3"
                    >
                        <i className="fa-solid fa-filter"></i>
                        Filter
                    </button>
                    {/* <FilterModal toggleModal={toggleModal} isOpen={isOpen} /> */}
                    <Modal
                        id={"filter-modal"}
                        isOpen={isOpen}
                        toggleModal={toggleModal}
                    >
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 md:p-5">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Filter
                            </h3>
                            <button
                                type="button"
                                className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
                                data-modal-hide="filter-modal"
                                onClick={toggleModal}
                            >
                                {/* Close Icon */}
                                <svg
                                    className="h-3 w-3"
                                    // aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}
                        <div className="max-h-[60vh] space-y-4 overflow-y-auto p-4 md:p-5">
                            <Accordion id={"filter-accordion-collapse"}>
                                {/* Category Filter */}
                                <AccordionItem
                                    headingID={"category-accordion-heading"}
                                    bodyID={"category-accordion-body"}
                                    title={"Category"}
                                >
                                    <ul className="flex w-full flex-wrap justify-around gap-3 md:grid-cols-4 md:justify-between">
                                        <li>
                                            <input
                                                type="checkbox"
                                                id="category-apartment"
                                                name="category"
                                                className="peer hidden"
                                                checked={
                                                    selected ===
                                                    "category-apartment"
                                                }
                                                onChange={() =>
                                                    toggleCheckbox(
                                                        "category-apartment",
                                                    )
                                                }
                                            />
                                            <label
                                                htmlFor="category-apartment"
                                                className="peer-checked:bg-primary-100 hover:bg-primary-100 peer-checked:text-primary-600 peer-checked:border-primary-600 hover:text-primary-600 hover:border-primary-600 flex w-full cursor-pointer items-center justify-between gap-3 rounded-full border border-gray-300 bg-white px-4 py-2.5 font-bold text-gray-500"
                                            >
                                                <i className="fa-solid fa-building text-xl"></i>
                                                Apartment
                                            </label>
                                        </li>
                                        <li>
                                            <input
                                                type="checkbox"
                                                id="category-house"
                                                name="category"
                                                className="peer hidden"
                                                checked={selected === "category-house"}
                                                onChange={() =>
                                                    toggleCheckbox("category-house")
                                                }
                                            />
                                            <label
                                                htmlFor="category-house"
                                                className="peer-checked:bg-primary-100 hover:bg-primary-100 peer-checked:text-primary-600 peer-checked:border-primary-600 hover:text-primary-600 hover:border-primary-600 flex w-full cursor-pointer items-center justify-between gap-3 rounded-full border border-gray-300 bg-white px-4 py-2.5 font-bold text-gray-500"
                                            >
                                                <i className="fa-solid fa-house text-xl"></i>
                                                House
                                            </label>
                                        </li>
                                        <li>
                                            <input
                                                type="checkbox"
                                                id="category-mansion"
                                                name="category"
                                                className="peer hidden"
                                                checked={
                                                    selected ===
                                                    "category-mansion"
                                                }
                                                onChange={() =>
                                                    toggleCheckbox(
                                                        "category-mansion",
                                                    )
                                                }
                                            />
                                            <label
                                                htmlFor="category-mansion"
                                                className="peer-checked:bg-primary-100 hover:bg-primary-100 peer-checked:text-primary-600 peer-checked:border-primary-600 hover:text-primary-600 hover:border-primary-600 flex w-full cursor-pointer items-center justify-between gap-3 rounded-full border border-gray-300 bg-white px-4 py-2.5 font-bold text-gray-500"
                                            >
                                                <i className="fa-solid fa-dungeon text-xl"></i>
                                                Mansion
                                            </label>
                                        </li>
                                        <li>
                                            <input
                                                type="checkbox"
                                                id="category-hotel"
                                                name="category"
                                                className="peer hidden"
                                                checked={
                                                    selected ===
                                                    "category-hotel"
                                                }
                                                onChange={() =>
                                                    toggleCheckbox(
                                                        "category-hotel",
                                                    )
                                                }
                                            />
                                            <label
                                                htmlFor="category-hotel"
                                                className="peer-checked:bg-primary-100 hover:bg-primary-100 peer-checked:text-primary-600 peer-checked:border-primary-600 hover:text-primary-600 hover:border-primary-600 flex w-full cursor-pointer items-center justify-between gap-3 rounded-full border border-gray-300 bg-white px-4 py-2.5 font-bold text-gray-500"
                                            >
                                                <i className="fa-solid fa-hotel text-xl"></i>
                                                Hotel
                                            </label>
                                        </li>
                                    </ul>
                                </AccordionItem>
                                {/* Price Filter */}
                                <AccordionItem
                                    headingID={"price-accordion-heading"}
                                    bodyID={"price-accordion-body"}
                                    title={"Price per Night"}
                                >
                                    Price Content
                                </AccordionItem>
                                {/* Rooms Filter */}
                                <AccordionItem
                                    headingID={"rooms-accordion-heading"}
                                    bodyID={"rooms-accordion-body"}
                                    title={"Bedrooms and bathrooms"}
                                >
                                    Bedrooms and bathrooms Content
                                </AccordionItem>
                                {/* Guests Filter */}
                                <AccordionItem
                                    headingID={"guests-accordion-heading"}
                                    bodyID={"guests-accordion-body"}
                                    title={"Guests"}
                                >
                                    Guests Content
                                </AccordionItem>
                                {/* Amenities Filter */}
                                <AccordionItem
                                    headingID={"amenities-accordion-heading"}
                                    bodyID={"amenities-accordion-body"}
                                    title={"Amenities"}
                                >
                                    Amenities Content
                                </AccordionItem>
                            </Accordion>
                        </div>
                        {/* <!-- Modal footer --> */}
                        <div className="flex items-center rounded-b border-t border-gray-200 p-4 md:p-5">
                            <button
                                data-modal-hide="filter-modal"
                                type="button"
                                className="bg-primary-700 hover:bg-primary-800 rounded-full px-5 py-2.5 text-center text-sm font-medium text-white"
                            >
                                Apply
                            </button>
                            <button
                                type="button"
                                className="hover:text-primary-700 border-primary-200 hover:bg-primary-200 ms-3 rounded-full border bg-white px-5 py-2.5 text-sm font-medium text-gray-900"
                            >
                                Clear
                            </button>
                        </div>
                    </Modal>

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
