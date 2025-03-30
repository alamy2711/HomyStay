import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Footer from "./Footer";
import Header from "./Header";
export default function UserLayout() {
    const { token, loading } = useAuth();

    if (loading) {
        return null;
    }

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}
