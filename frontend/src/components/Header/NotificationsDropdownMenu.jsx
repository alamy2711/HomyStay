import axiosClient from "@/lib/axiosClient";
import { useEffect, useRef, useState } from "react";
import { FaRegCheckCircle, FaRegClock, FaRegTimesCircle } from "react-icons/fa";
import { HiOutlineBell } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "../../contexts/NotificationsContext";
import { formatTimeAgo } from "../../utils/dateFormatter";

// Icons
import { CalendarIcon, ClipboardIcon } from "@heroicons/react/24/outline";
import { FiAlertCircle, FiBell, FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";

const notificationsData = [
    {
        id: 1,
        title: "New Message",
        message: "You have a new message from John",
        time: "5 min ago",
        read: false,
        icon: <FaRegCheckCircle className="h-5 w-5" />,
    },
    {
        id: 2,
        title: "Payment Received",
        message: "Your subscription payment was processed",
        time: "2 hours ago",
        read: true,
        icon: <FaRegClock className="h-5 w-5" />,
    },
    {
        id: 3,
        title: "System Alert",
        message: "Scheduled maintenance tonight at 10 PM",
        time: "1 day ago",
        read: false,
        icon: <FaRegTimesCircle className="h-5 w-5" />,
    },
    {
        id: 5,
        title: "New Message",
        message: "You have a new message from Maya",
        time: "1 day ago",
        read: false,
        icon: <FaRegCheckCircle className="h-5 w-5" />,
    },
    {
        id: 6,
        title: "Payment Received",
        message: "Your subscription payment was processed",
        time: "2 hours ago",
        read: true,
        icon: <FaRegClock className="h-5 w-5" />,
    },
    {
        id: 7,
        title: "System Alert",
        message: "Scheduled maintenance tonight at 10 PM",
        time: "1 day ago",
        read: false,
        icon: <FaRegTimesCircle className="h-5 w-5" />,
    },
    {
        id: 8,
        title: "New Message",
        message: "You have a new message from Maya",
        time: "1 day ago",
        read: false,
        icon: <FaRegCheckCircle className="h-5 w-5" />,
    },
];

const NotificationsDropdownMenu = () => {
    const {
        notifications,
        setNotifications,
        loading: notificationsLoading,
        setLoading: setNotificationsLoading,
    } = useNotifications();
    const [isOpen, setIsOpen] = useState(false);
    // const [notifications, setNotifications] = useState(notificationsData);

    const ref = useRef(null);
    const navigate = useNavigate();

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

    useEffect(() => {
        setNotificationsLoading(true);
    }, []);
    const getNotificationIcon = (type) => {
        switch (type) {
            case "reservation":
                // return <FiCalendar className="text-blue-500" size={20} />;
                return <CalendarIcon className="h-6 w-6 text-blue-500" />;
            case "request":
                return <ClipboardIcon className="h-6 w-6 text-green-500" />;
            case "message":
                return <FiMail className="text-purple-500" size={20} />;
            case "system":
                return <FiAlertCircle className="text-yellow-500" size={20} />;
            default:
                return <FiBell className="text-gray-500" size={20} />;
        }
    };

    const markAllAsRead = () => {
        axiosClient.post("/notifications/mark-all-as-read").then((response) => {
            setNotificationsLoading(true);
        });
    };

    // Mark as read
    const markAsRead = (notificationId) => {
        axiosClient
            .post(`/notifications/${notificationId}/mark-as-read`)
            .then((response) => {
                setNotificationsLoading(true);
            })
            .catch((error) => {
                console.error("Error marking notification as read:", error);
                setNotificationsLoading(true);
            });
    };

    const handleNotificationClick = (type, id) => {
        markAsRead(id);
        switch (type) {
            case "reservation":
                navigate("/reservations");
                break;
            case "request":
                navigate("/requests");
                break;
            case "message":
                navigate("/messages");
                break;
            default:
                break;
        }
    };

    return (
        <div className="relative inline-flex" ref={ref}>
            {/* Notification Bell Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                // className="text-primary-700 hover:text-primary-800 relative p-2 transition-colors"
                className="hover:text-primary-700 bg-primary-100 text-primary-500 relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-xl ring-0 duration-400 hover:ring-[1.5px] lg:h-10 lg:w-10"
            >
                <HiOutlineBell className="h-7 w-7" />
                {notifications.some((n) => !n.is_seen) && (
                    <span className="absolute top-1.75 right-2.5 h-2.25 w-2.25 rounded-full bg-red-500"></span>
                )}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-10 right-0 z-50 mt-2 w-80 overflow-hidden rounded-lg bg-white shadow-md shadow-gray-300">
                    <div className="flex items-center justify-between border-b border-gray-100 p-4">
                        <Link to="/notifications">
                            <h3 className="hover:text-primary-800 font-semibold text-gray-800">
                                Notifications
                            </h3>
                        </Link>
                        <button
                            onClick={markAllAsRead}
                            className="text-primary-700 hover:text-primary-800 text-sm"
                        >
                            Mark all as read
                        </button>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-6 text-center text-gray-500">
                                <HiOutlineBell className="mx-auto mb-2 h-12 w-12 text-gray-400" />
                                <p>No new notifications</p>
                            </div>
                        ) : (
                            notifications.map((notification) => (
                                <div
                                    onClick={() =>
                                        handleNotificationClick(
                                            notification.type,
                                            notification.id,
                                        )
                                    }
                                    key={notification.id}
                                    className={`cursor-pointer border-b border-gray-100 p-4 last:border-0 ${
                                        !notification.is_seen
                                            ? "bg-primary-50"
                                            : "bg-white"
                                    } hover:bg-primary-100 transition-colors`}
                                >
                                    <div className="flex items-start">
                                        <span className="text-primary-700 mt-1 mr-3">
                                            {getNotificationIcon(
                                                notification.type,
                                            )}
                                        </span>
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between">
                                                <h4
                                                    className={`text-sm ${!notification.is_seen ? "font-semibold" : ""}`}
                                                >
                                                    {notification.subject}
                                                </h4>
                                                {!notification.is_seen && (
                                                    <span className="bg-primary-700 ml-2 h-2 w-2 rounded-full"></span>
                                                )}
                                            </div>
                                            <p className="mt-1 text-sm text-gray-600">
                                                {notification.content}
                                            </p>
                                            <p className="mt-2 text-xs text-gray-400">
                                                {formatTimeAgo(
                                                    new Date(
                                                        notification.created_at,
                                                    ),
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationsDropdownMenu;
