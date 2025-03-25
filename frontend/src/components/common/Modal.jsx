import React, { useEffect } from "react";

export default function Modal({ children, id, toggleModal, isOpen }) {
    // Handle {aria-hidden="true"} Error
    useEffect(() => {
        const modalElement = document.getElementById("default-modal");

        // Set up MutationObserver to observe changes to the modal element
        const observer = new MutationObserver(() => {
            if (modalElement) {
                // Always remove aria-hidden if it is present
                modalElement.removeAttribute("aria-hidden");
            }
        });

        if (modalElement) {
            // Observe changes to the 'aria-hidden' attribute or any other attribute in the modal
            observer.observe(modalElement, {
                attributes: true,
                childList: false,
                subtree: false,
            });
        }

        // Clean up observer on component unmount
        return () => {
            if (modalElement) {
                observer.disconnect();
            }
        };
    }, [isOpen]); // Runs on modal open/close state changes

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
