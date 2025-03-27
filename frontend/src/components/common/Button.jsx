import React from "react";

export default function Button({ text, className, ...attributes }) {
    return (
        <button
            className={`bg-primary-700 hover:bg-primary-800 rounded-full px-4 py-2.5 text-sm font-medium text-white lg:px-5 lg:py-3 ${className}`}
            {...attributes}
        >
            {text}
        </button>
    );
}
