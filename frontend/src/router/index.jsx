import { createBrowserRouter } from "react-router-dom";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Explore from "../pages/Explore";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Signup from "../pages/Signup";
import ApartmentDetails from "../components/Apartment/ApartmentDetails";
import GuestLayout from "../layouts/GuestLayout";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <GuestLayout />,
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
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
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
                element: <NotFound/>,
            },
        ],
    },
]);
