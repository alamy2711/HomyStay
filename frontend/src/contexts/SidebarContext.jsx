import React, { createContext, useState, useContext } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [isHidden, setIsHidden] = useState(1);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleHidden = () => setIsHidden((prev) => !prev);
    const toggleCollapsed = () => setIsCollapsed((prev) => !prev);

    return (
        <SidebarContext.Provider
            value={{
                isHidden,
                setIsHidden,
                toggleHidden,
                isCollapsed,
                setIsCollapsed,
                toggleCollapsed,
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
};