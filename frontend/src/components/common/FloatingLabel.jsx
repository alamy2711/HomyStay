import React from "react";

export default function FloatingLabel({
    id,
    type = "text",
    label,
    icon,
    className,
    ...attributes
}) {
    return (
        <div className={`relative ${className}`}>
            <input
                type={type}
                id={id}
                {...attributes}
                className="peer focus:border-primary-700 block w-full appearance-none rounded-full border-2 border-gray-300 bg-transparent px-5 pt-3 pb-2 text-sm text-gray-900 focus:ring-0 focus:outline-none"
                placeholder=" "
            />
            <label
                htmlFor={id}
                className="peer-focus:text-primary-700 absolute start-1 top-2 z-10 flex origin-[0] -translate-y-4 scale-75 transform items-center gap-2 bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:px-2"
            >
                {icon && <i className={`${icon} text-lg`}></i>}
                {label}
            </label>
        </div>
    );
}
