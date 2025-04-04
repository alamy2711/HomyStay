import React from "react";

// export default function Button({ children, className, ...attributes }) {
//     return (
//         <button
//             className={`rounded-full px-4 py-2.5 text-sm font-medium lg:px-5 lg:py-3 ${className}`}
//             {...attributes}
//         >
//             {children}
//         </button>
//     );
// }

export default function Button({
    children,
    className = "",
    href,
    as,
    type = "button",
    ...attributes
}) {
    const Component = as || (href ? "a" : "button"); // Dynamically set the element type

    return (
        <Component
            className={`disabled:opacity-40 rounded-full px-4 py-2.5 text-sm font-bold lg:px-5 lg:py-3 ${className}`}
            href={href}
            type={Component === "button" ? type : undefined}
            {...attributes}
        >
            {children}
        </Component>
    );
}
