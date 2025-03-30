import { createBrowserRouter } from "react-router-dom";
import ApartmentDetails from "@components/Apartment/ApartmentDetails";
import DefaultLayout from "@/layouts/DefaultLayout";
import GuestLayout from "@/layouts/GuestLayout";
import UserLayout from "@/layouts/UserLayout";
import About from "@pages/About";
import Contact from "@pages/Contact";
import Explore from "@pages/Explore";
import Home from "@pages/Home";
import Login from "@pages/auth/Login";
import NotFound from "../pages/NotFound";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Signup from "@pages/auth/Signup";
import Profile from "@pages/user/Profile";
import Settings from "@pages/user/Settings";

export const router = createBrowserRouter([
    // Default routes
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/explore",
                element: <Explore />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/privacy-policy",
                element: <PrivacyPolicy />,
            },
            {
                path: "/apartment-details",
                element: <ApartmentDetails />,
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },

    // Guest routes for unauthenticated users (logged out)
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },

    // User routes for authenticated users (logged in)
    {
        path: "/",
        element: <UserLayout />,
        children: [
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/settings",
                element: <Settings />,
            },
        ],
    },

    // Catch-all route for 404 page not found
]);
