import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Footer from "./Footer";
import Header from "./Header";

export default function GuestLayout() {
    const { token, loading } = useAuth();

    if (loading) return null;

    if (token) return <Navigate to="/dashboard" />;

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}
