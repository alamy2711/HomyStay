import DefaultLayout from "@/layouts/DefaultLayout";
import GuestLayout from "@/layouts/GuestLayout";
import UserLayout from "@/layouts/UserLayout";
import ApartmentDetails from "@components/Apartment/ApartmentDetails";
import About from "@pages/About";
import Contact from "@pages/Contact";
import Explore from "@pages/Explore";
import Home from "@pages/Home";
import Login from "@pages/auth/Login";
import Signup from "@pages/auth/Signup";
import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/NotFound";
import PrivacyPolicy from "../pages/PrivacyPolicy";

import Dashboard from "@pages/user/Dashboard";
import Favorites from "@pages/user/Favorites";
import Inbox from "@pages/user/Inbox";
import Listings from "@pages/user/Listings";
import Notifications from "@pages/user/Notifications";
import Profile from "@pages/user/Profile";
import Requests from "@pages/user/Requests";
import Reservations from "@pages/user/Reservations";
import Settings from "@pages/user/Settings";
import Users from "@pages/user/Users";

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
            { path: "/dashboard", element: <Dashboard /> },
            { path: "/profile", element: <Profile /> },
            { path: "/settings", element: <Settings /> },
            { path: "/inbox", element: <Inbox /> },
            { path: "/notifications", element: <Notifications /> },

            // Client-specific routes
            { path: "/favorites", element: <Favorites /> },
            { path: "/reservations", element: <Reservations /> },

            // Host-specific routes
            { path: "/listings", element: <Listings /> },
            { path: "/requests", element: <Requests /> },

            // Admin-specific routes
            { path: "/users", element: <Users /> },
        ],
    },
]);
