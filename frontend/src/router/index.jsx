import { createBrowserRouter } from "react-router-dom";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Explore from "../pages/Explore";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Signup from "../pages/Signup";

export const router = createBrowserRouter([
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
        path: "*",
        element: <h1>404 - NOT FOUND</h1>,
    },
]);
