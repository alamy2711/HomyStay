import { apartmentsData } from "@/dummy-data/apartments-data";
import React, { createContext, useContext, useEffect, useState } from "react";

const ApartmentsContext = createContext();

export const ApartmentsProvider = ({ children }) => {
    const [apartments, setApartments] = useState([]);

    useEffect(() => {
        setApartments(apartmentsData);
    }, []);

    return (
        <ApartmentsContext.Provider value={{ apartments }}>
            {children}
        </ApartmentsContext.Provider>
    );
};

export const useApartments = () => {
    const context = useContext(ApartmentsContext);
    if (!context) {
        throw new Error(
            "useApartments must be used within an ApartmentsProvider",
        );
    }
    return context;
};
