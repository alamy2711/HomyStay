import Button from "../common/Button";
import FloatingLabel from "../common/FloatingLabel";

export default function SearchSection() {
    return (
        <section className="mb-10 px-4 lg:px-6" id="search">
            <div className="mx-auto max-w-screen-xl rounded-lg bg-white px-4 py-4 shadow-sm">
                <form
                    action="/explore"
                    method=""
                    className="grid grid-cols-4 gap-3 md:flex"
                >
                    {/* <!-- Search Field --> */}
                    <FloatingLabel
                        id="search-field"
                        type="search"
                        label="Country, City, Place..."
                        icon="fa-solid fa-location-dot"
                        className="col-span-4 w-full"
                    />
                    {/* <!-- Date Range Picker --> */}
                    <div
                        date-rangepicker="true"
                        datepicker-format="dd-mm-yyyy"
                        id="date-range-picker"
                        className="col-span-3 flex w-full items-center justify-between gap-2 lg:w-auto"
                    >
                        <FloatingLabel
                            id="check-in"
                            type="text"
                            label="Check in"
                            icon="fa-solid fa-calendar"
                            name="start"
                        />
                        <span className="text-gray-500">to</span>
                        <FloatingLabel
                            id="check-out"
                            type="text"
                            label="Check out"
                            icon="fa-solid fa-calendar"
                            name="end"
                        />
                    </div>
                    {/* <!-- Search Button --> */}
                    <Button text="Search" />
                </form>
            </div>
        </section>
        // <section className="mb-10 px-4 lg:px-6" id="search">
        //     <div className="mx-auto max-w-screen-xl rounded-lg bg-white px-4 py-4 shadow-sm">
        //         <form
        //             action="/explore"
        //             method=""
        //             className="grid grid-cols-4 gap-3 lg:grid-cols-7"
        //         >
        //             {/* <!-- Search Field --> */}
        //             <div className="relative col-span-4 w-full lg:col-span-3">
        //                 <input
        //                     type="text"
        //                     id="floating_outlined"
        //                     className="peer focus:border-primary-700 block w-full appearance-none rounded-full border-2 border-gray-300 bg-transparent px-4 py-2 text-sm text-gray-900 focus:ring-0 focus:outline-none lg:py-2.5"
        //                     placeholder=" "
        //                 />
        //                 <label
        //                     htmlFor="floating_outlined"
        //                     className="peer-focus:text-primary-700 absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
        //                 >
        //                     <i className="fa-solid fa-location-dot mr-1 text-lg"></i>
        //                     Country, City, Place...
        //                 </label>
        //             </div>
        //             {/* ============================= */}
        //             {/* <!-- Date Start --> */}
        //             {/* <div className="relative col-span-2 max-w-sm md:col-span-1">
        //                 <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
        //                     <svg
        //                         className="h-4 w-4 text-gray-500 dark:text-gray-400"
        //                         aria-hidden="true"
        //                         xmlns="http://www.w3.org/2000/svg"
        //                         fill="currentColor"
        //                         viewBox="0 0 20 20"
        //                     >
        //                         <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
        //                     </svg>
        //                 </div>
        //                 <input
        //                     id="datepicker-range-start"
        //                     name="start"
        //                     datepicker={"".toString()}
        //                     datepicker-autohide={"".toString()}
        //                     datepicker-format="dd-mm-yyyy"
        //                     type="text"
        //                     className="focus:border-primary-700 block w-full rounded-full border-2 border-gray-300 bg-transparent px-2.5 py-2 ps-10 text-sm text-gray-900 focus:ring-0 focus:outline-none lg:py-2.5"
        //                     placeholder="Check In"
        //                 />
        //             </div> */}
        //             {/* <!-- Date End --> */}
        //             {/* <div className="relative col-span-2 max-w-sm md:col-span-1">
        //                 <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
        //                     <svg
        //                         className="h-4 w-4 text-gray-500 dark:text-gray-400"
        //                         aria-hidden="true"
        //                         xmlns="http://www.w3.org/2000/svg"
        //                         fill="currentColor"
        //                         viewBox="0 0 20 20"
        //                     >
        //                         <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
        //                     </svg>
        //                 </div>
        //                 <input
        //                     id="datepicker-range-end"
        //                     name="end"
        //                     datepicker={"".toString()}
        //                     datepicker-autohide={"".toString()}
        //                     datepicker-format="dd-mm-yyyy"
        //                     type="text"
        //                     className="focus:border-primary-700 block w-full rounded-full border-2 border-gray-300 bg-transparent px-2.5 py-2 ps-10 text-sm text-gray-900 focus:ring-0 focus:outline-none lg:py-2.5"
        //                     placeholder="Check out"
        //                 />
        //             </div> */}
        //             {/* ============================== */}
        //             <div
        //                 date-rangepicker="true"
        //                 id="date-range-picker"
        //                 className="col-span-4 flex items-center justify-between gap-2 md:col-span-2"
        //             >
        //                 <FloatingLabel
        //                     id="check-in"
        //                     type="text"
        //                     label="Check in"
        //                     icon="fa-solid fa-calendar"
        //                     name="start"
        //                 />
        //                 {/* <span>to</span> */}
        //                 <FloatingLabel
        //                     id="check-out"
        //                     type="text"
        //                     label="Check out"
        //                     icon="fa-solid fa-calendar"
        //                     name="end"
        //                 />
        //             </div>
        //             {/* <!-- Select Rooms --> */}
        //             <select
        //                 className="focus:border-primary-700 col-span-2 block w-auto rounded-full border-2 border-gray-300 bg-gray-50 px-2.5 py-2 text-sm text-gray-900 focus:ring-0 focus:outline-none md:col-span-1 lg:py-2.5"
        //                 defaultValue="rooms"
        //             >
        //                 <option value="rooms">Rooms</option>
        //                 <option value="1">1</option>
        //                 <option value="2">2</option>
        //                 <option value="3">3</option>
        //                 <option value="4">4</option>
        //             </select>
        //             {/* <!-- Search Button --> */}

        //             <button className="bg-primary-700 hover:bg-primary-800 col-span-2 rounded-full px-4 py-2.5 text-sm font-medium text-white md:col-span-1 lg:px-5 lg:py-3">
        //                 Search
        //             </button>
        //         </form>
        //     </div>
        // </section>
    );
}
