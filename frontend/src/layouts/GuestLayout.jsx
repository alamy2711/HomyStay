import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Footer from "./Footer";
import Header from "./Header";
import LoadingSpinner from "@components/common/LoadingSpinner";

export default function GuestLayout() {
    const { token, loading } = useAuth();

    if (loading) return <LoadingSpinner className="h-screen" />;

    if (token) return <Navigate to="/dashboard" />;

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}
