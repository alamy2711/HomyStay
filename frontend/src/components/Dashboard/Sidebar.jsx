import { useAuth } from "@contexts/AuthContext";
import React, { use, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { NAV_ITEMS } from "../../constants/navigationItems";
import { useSidebar } from "../../contexts/SidebarContext";
import { beautifyString } from "../../utils/stringUtils";
import NavItem from "./NavItem";
import { useNotifications } from "../../contexts/NotificationsContext";

export default function Sidebar() {
    const location = useLocation();
    const { user, logout } = useAuth();
    const {notifications, setLoading : setNotificationsLoading} = useNotifications();
    const navItems = NAV_ITEMS[user?.role] || [];
    const { isHidden, toggleHidden, isCollapsed, toggleCollapsed } =
        useSidebar();


    useEffect(() => {
        setNotificationsLoading(true);
    }, []);

    const notificationCount = notifications.filter((notification) => !notification.is_seen).length;

    return (
        <aside
            className={`zoverflow-hidden fixed top-0 left-0 z-40 h-screen transition-all duration-300 lg:-translate-x-0 ${isHidden ? "-translate-x-full" : ""} ${
                isCollapsed ? "w-18.5" : "w-64"
            } border-r border-gray-200 bg-white shadow-sm`} // 18.5 => 64
        >
            <div className="h-full overflow-x-hidden overflow-y-auto px-3 py-4">
                {/* Logo and Toggle */}
                <div className="mb-8 flex items-center justify-between px-2">
                    <Link to="/">
                        <img
                            src="/images/HomyStay.png"
                            alt="HomyStay Logo"
                            className={`h-6 transition-all duration-600 lg:h-7 ${isCollapsed ? "translate-x-15 opacity-0" : ""}`}
                        />
                    </Link>
                    <button
                        onClick={toggleCollapsed}
                        className="hover:bg-primary-50 rounded-lg p-2"
                        aria-label="Toggle sidebar"
                    >
                        {isCollapsed ? (
                            <FaAngleRight className="h-6 w-6 text-gray-700" />
                        ) : (
                            <FaAngleLeft className="h-6 w-6 text-gray-700" />
                        )}
                    </button>
                </div>

                {/* Navigation */}
                <nav>
                    <ul className="space-y-2">
                        {navItems.map((item) => (
                            <NavItem
                                key={item.path}
                                item={item}
                                isActive={location.pathname === item.path}
                                alert={item.name == "Notifications" ? notificationCount : 0}
                            />
                        ))}
                    </ul>
                </nav>

                {/* User Profile and Logout */}
                <div
                    className={`absolute right-0 bottom-0 left-0 overflow-x-hidden border-t border-gray-100 px-3 py-4 shadow-sm ${isCollapsed ? "flex justify-center" : ""}`}
                >
                    <div
                        className={`flex w-full items-center gap-2 ${isCollapsed ? "flex-col" : "justify-between"} `}
                    >
                        {user && (
                            <Link
                                onClick={toggleHidden}
                                to="/profile"
                                className="flex items-center gap-2"
                            >
                                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-300">
                                    <img
                                        src={user.profile_picture}
                                        className="h-full w-full object-cover object-center"
                                        alt="User Profile Picture"
                                    />
                                </div>
                                <div
                                    className={`overflow-hidden text-nowrap ${isCollapsed ? "w-0" : "w-35"} `}
                                >
                                    <p className="truncate text-sm font-medium text-gray-900">
                                        {`${user.first_name}  ${user.last_name}`}
                                    </p>
                                    <p className="truncate text-xs text-gray-500">
                                        {/* {user.email} */}
                                        {beautifyString(user.role)}
                                    </p>
                                </div>
                            </Link>
                        )}
                        <button
                            onClick={logout}
                            className={`hover:bg-primary-50 rounded-lg p-2`}
                            title="Logout"
                        >
                            <TbLogout className="h-6 w-6 text-gray-700" />
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
}
