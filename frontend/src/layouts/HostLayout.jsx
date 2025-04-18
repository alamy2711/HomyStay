import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function HostLayout() {
    const { user } = useAuth();
    if (user.role != "host") return <Navigate to="/dashboard" />;

    return <Outlet />;
}
