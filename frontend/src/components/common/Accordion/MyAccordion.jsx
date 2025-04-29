// import { createContext, useContext, useRef, useEffect, useState } from "react";
// import { HiOutlineChevronDown } from "react-icons/hi";

// const AccordianContext = createContext();

// export default function Accordian({ children, value, onChange, ...props }) {
//     const [selected, setSelected] = useState(value);

//     useEffect(() => {
//         onChange?.(selected);
//     }, [selected]);

//     return (
//         <ul {...props}>
//             <AccordianContext.Provider value={{ selected, setSelected }}>
//                 {children}
//             </AccordianContext.Provider>
//         </ul>
//     );
// }

// export function AccordianItem({ children, value, trigger, ...props }) {
//     const { selected, setSelected } = useContext(AccordianContext);
//     const open = selected === value;

//     const ref = useRef(null);

//     return (
//         <li className="border-b border-gray-200 bg-white" {...props}>
//             <h3
//                 role="button"
//                 onClick={() => setSelected(open ? null : value)}
//                 className="flex items-center justify-between p-4 font-medium text-xl"
//             >
//                 {trigger}
//                 <HiOutlineChevronDown
//                     size={16}
//                     className={`transition-transform ${open ? "rotate-180" : ""}`}
//                 />
//             </h3>
//             <div
//                 className="overflow-y-hidden transition-all"
//                 style={{ height: open ? ref.current?.offsetHeight || 0 : 0 }}
//             >
//                 <div className="p-4 pt-2" ref={ref}>
//                     {children}
//                 </div>
//             </div>
//         </li>
//     );
// }


import { createContext, useContext, useRef, useEffect, useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";

// Accordion Context
const AccordionContext = createContext();

// Accordion Main Component
export default function Accordian({
    children,
    value = [],
    multiple = false,
    onChange,
    ...props
}) {
    const [selected, setSelected] = useState(
        multiple ? (Array.isArray(value) ? value : []) : value,
    );

    useEffect(() => {
        onChange?.(selected);
    }, [selected]);

    return (
        <ul {...props}>
            <AccordionContext.Provider
                value={{ selected, setSelected, multiple }}
            >
                {children}
            </AccordionContext.Provider>
        </ul>
    );
}

// Accordion Item Component
export function AccordianItem({ children, value, trigger, ...props }) {
    const { selected, setSelected, multiple } = useContext(AccordionContext);
    const ref = useRef(null);
    const [height, setHeight] = useState(0);

    const open = multiple ? selected.includes(value) : selected === value;

    useEffect(() => {
        if (open && ref.current) {
            setHeight(ref.current.scrollHeight);
        }
    }, [open]);

    const toggle = () => {
        if (multiple) {
            if (open) {
                setSelected(selected.filter((v) => v !== value));
            } else {
                setSelected([...selected, value]);
            }
        } else {
            setSelected(open ? null : value);
        }
    };

    return (
        <li className="border-b border-gray-200 bg-white" {...props}>
            <h3
                role="button"
                onClick={toggle}
                className="flex cursor-pointer items-center justify-between p-4 text-xl font-medium"
            >
                {trigger}
                <HiOutlineChevronDown
                    size={16}
                    className={`transition-transform ${open ? "rotate-180" : ""}`}
                />
            </h3>
            <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ height: open ? height : 0 }}
            >
                <div className="p-4 pt-2" ref={ref}>
                    {children}
                </div>
            </div>
        </li>
    );
}
