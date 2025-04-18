import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function AdminLayout() {
    const { user } = useAuth();
    if (user.role != "admin" && user.role != "super_admin") {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}
