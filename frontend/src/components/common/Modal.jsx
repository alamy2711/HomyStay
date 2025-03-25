import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Modal({ children, id }) {


    // Handle scrollbar gutter on modal open
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === "/explore") {
            document.documentElement.style.scrollbarGutter = "stable";
        } else {
            document.documentElement.style.scrollbarGutter = ""; // Reset when leaving
        }
    }, [location.pathname]);

    return (
        <div
            id={id}
            tabIndex="-1"
            // aria-hidden="true"
            className="fixed top-0 right-0 left-0 z-50 hidden h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-x-hidden overflow-y-auto md:inset-0"
        >
            <div className="relative max-h-full w-full max-w-2xl p-4">
                {/* <!-- Modal content --> */}
                <div className="relative rounded-lg bg-white shadow-sm">
                    {children}
                </div>
            </div>
        </div>
    );
}
