import React from "react";

export default function Accordion({ id, children }) {
    return (
        <div id={id} data-accordion="open">
            {children}
        </div>
    );
}
