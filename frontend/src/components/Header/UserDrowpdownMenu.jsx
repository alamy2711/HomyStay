import { useAuth } from "@contexts/AuthContext";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// Icons
import {
    HiOutlineCog6Tooth,
    HiOutlineHeart,
    HiOutlineUser,
} from "react-icons/hi2";
import { LuLayoutDashboard } from "react-icons/lu";
import { TbLogout } from "react-icons/tb";

const UserMenu = () => {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    const menuItems = [
        {
            label: "Dashboard",
            icon: <LuLayoutDashboard className="h-5 w-5" />,
            href: "/dashboard",
        },
        {
            label: "Profile",
            icon: <HiOutlineUser className="h-5 w-5" />,
            href: "/profile",
        },
        {
            label: "Favorites",
            icon: <HiOutlineHeart className="h-5 w-5" />,
            href: "/favorites",
        },
        {
            label: "Settings",
            icon: <HiOutlineCog6Tooth className="h-5 w-5" />,
            href: "/settings",
        },
        {
            label: "Logout",
            icon: <TbLogout className="h-5 w-5" />,
            onClick: () => logout(),
        },
    ];

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [ref]);

    return (
        <div className="relative inline-flex" ref={ref}>
            {/* Avatar Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="hover:ring-primary-700 ring-primary-500 relative h-8 w-8 cursor-pointer overflow-hidden rounded-full ring-0 duration-400 hover:ring-[1.5px] lg:h-10 lg:w-10"
            >
                <img
                    src={user.profile_picture}
                    alt="User avatar"
                    className="h-full w-full object-cover"
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-10 right-0 z-50 mt-2 w-48 rounded-lg bg-white py-2 shadow-md shadow-gray-300">
                    {/* Loop over menu items, render favorites for user.role === "client" */}
                    {menuItems.map((item, index) => {
                        if (
                            user.role !== "client" &&
                            item.label === "Favorites"
                        ) {
                            return null;
                        } else {
                            return (
                                <Link
                                    key={index}
                                    to={item.href}
                                    onClick={item.onClick}
                                    className="hover:bg-primary-50 hover:text-primary-700 flex items-center px-4 py-2.5 text-sm text-gray-700 transition-colors"
                                >
                                    <span className="text-primary-700 mr-3">
                                        {item.icon}
                                    </span>
                                    {item.label}
                                </Link>
                            );
                        }
                    })}
                </div>
            )}
        </div>
    );
};

export default UserMenu;
