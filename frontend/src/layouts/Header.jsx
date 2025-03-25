import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [isHeroPresent, setIsHeroPresent] = useState(true);
    const location = useLocation(); // Get the current route's location

    // Function to check if the link is active
    const isActive = (path) =>
        location.pathname === path
            ? "text-white bg-primary-700 rounded lg:text-primary-700 lg:bg-transparent"
            : "text-(--secondary)";

    useEffect(() => {
        // Check if hero section exists on the current page
        if (location.pathname === "/") {
            setIsHeroPresent(true);
        } else {
            setIsHeroPresent(false);
        }
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            const header = document.getElementById("header");
            const heroSection = document.getElementById("hero");
            const heroHeight = heroSection ? heroSection.offsetHeight : 0;

            if (window.scrollY > heroHeight && isHeroPresent) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isHeroPresent]);

    return (
        <header
            id="header"
            className={`${
                location.pathname === "/explore"
                    ? "bg-white shadow-md" // White background, no sticky
                    : scrolled || !isHeroPresent
                    ? "slide-down sticky top-0 z-50 bg-white shadow-md"
                    : "bg-(--bg-sky)"
            }`}
        >
            <nav className="border-gray-200 px-4 py-2.5 lg:px-6">
                <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
                    <a href="/" className="flex items-center">
                        <img
                            src="images/HomyStay.png"
                            className="h-6 sm:h-8"
                            alt="HomyStay Logo"
                        />
                    </a>
                    <div className="flex items-center lg:order-2">
                        <a
                            href="/login"
                            className="hover:text-primary-700 mr-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 lg:px-5 lg:py-2.5"
                        >
                            Log in
                        </a>
                        <a
                            href="/signup"
                            className="bg-primary-700 hover:bg-primary-800 rounded-full px-4 py-2 text-sm font-medium text-white lg:px-5 lg:py-2.5"
                        >
                            Sign up
                        </a>
                        <button
                            data-collapse-toggle="mobile-menu-2"
                            type="button"
                            className="ml-1 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 lg:hidden"
                            aria-controls="mobile-menu-2"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="h-6 w-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <svg
                                className="hidden h-6 w-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div
                        className="hidden w-full items-center justify-between lg:order-1 lg:flex lg:w-auto"
                        id="mobile-menu-2"
                    >
                        <ul className="mt-4 flex flex-col font-medium lg:mt-0 lg:flex-row lg:space-x-8">
                            <li>
                                <a
                                    href="/"
                                    className={`lg:hover:text-primary-700 hover:bg-primary-700 block border-b border-gray-100 py-2 pr-4 pl-3 hover:text-white lg:border-0 lg:p-0 lg:hover:bg-transparent ${isActive("/")}`}
                                    aria-current="page"
                                >
                                    {/* <a
                                    href="/"
                                    className="bg-primary-700 lg:text-primary-700 block rounded py-2 pr-4 pl-3 text-white lg:bg-transparent lg:p-0"
                                    aria-current="page"
                                    > */}
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/explore"
                                    className={`lg:hover:text-primary-700 hover:bg-primary-700 block border-b border-gray-100 py-2 pr-4 pl-3 hover:text-white lg:border-0 lg:p-0 lg:hover:bg-transparent ${isActive("/explore")}`}
                                >
                                    Explore
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/about"
                                    className={`lg:hover:text-primary-700 hover:bg-primary-700 block border-b border-gray-100 py-2 pr-4 pl-3 hover:text-white lg:border-0 lg:p-0 lg:hover:bg-transparent ${isActive("/about")}`}
                                >
                                    About
                                </a>
                            </li>
                            <li>
                                <a
                                    href="contact"
                                    className={`lg:hover:text-primary-700 hover:bg-primary-700 block border-b border-gray-100 py-2 pr-4 pl-3 hover:text-white lg:border-0 lg:p-0 lg:hover:bg-transparent ${isActive("/contact")}`}
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
