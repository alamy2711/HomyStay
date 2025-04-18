import LoadingSpinner from "@components/common/LoadingSpinner";
import Sidebar from "@components/Dashboard/Sidebar";
import React from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { SidebarProvider, useSidebar } from "../contexts/SidebarContext";

export default function UserLayout() {
    const { token, setUser, loading: userLoading, setLoading } = useAuth();

    if (userLoading) {
        return <LoadingSpinner className="h-screen" />;
    }
    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <SidebarProvider>
                <UserLayoutContent />
            </SidebarProvider>
        </>
    );
}

function UserLayoutContent() {
    const { isHidden, isCollapsed } = useSidebar();

    return (
        <>
            <MobileHeader />
            <Sidebar />
            <main
                className={`transition-all duration-300 ${isCollapsed ? "lg:ml-18.5" : "lg:ml-64"} ${!isHidden ? "h-screen overflow-hidden lg:h-auto lg:overflow-auto" : ""} `}
            >
                <Outlet />
            </main>
        </>
    );
}

function MobileHeader() {
    const { isHidden, toggleHidden } = useSidebar();

    return (
        <>
            <div
                className={`fixed inset-0 z-40 h-screen overflow-y-hidden bg-black transition-all duration-300 lg:hidden ${isHidden ? "pointer-events-none opacity-0" : "opacity-75"}`}
                onClick={toggleHidden} // Close sidebar when clicking overlay
                style={{ overscrollBehavior: "contain" }}
            />

            <header className="sticky z-35 top-0 flex h-[60px] items-center justify-between bg-white px-1 py-2.5 text-gray-100 shadow-md lg:hidden">
                <Link to="/">
                    <img
                        src="/images/HomyStay.png"
                        alt="HomyStay Logo"
                        className="h-6 px-3"
                    />
                </Link>

                <button
                    className="mobile-menu-button rounded-lg p-3 focus:bg-gray-300 focus:outline-none"
                    onClick={toggleHidden}
                >
                    <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="var(--secondary)"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </header>
        </>
    );
}
