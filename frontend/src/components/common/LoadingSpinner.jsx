import React from "react";

export default function LoadingSpinner({ className }) {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            {/* <div className="border-primary-700 h-12 w-12 animate-spin rounded-full border-4 border-solid border-t-transparent"></div> */}
            <div className="border-primary-700 h-12 w-12 animate-spin rounded-full border-t-3"></div>
        </div>
    );
}
