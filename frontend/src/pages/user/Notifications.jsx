import axiosClient from "@/lib/axiosClient";
import { useAuth } from "@contexts/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import { useNotifications } from "../../contexts/NotificationsContext";
import { formatTimeAgo } from "../../utils/dateFormatter";

// Components

// Icons
import { CalendarIcon, ClipboardIcon } from "@heroicons/react/24/outline";
import {
    FiAlertCircle,
    FiBell,
    FiCheck,
    FiMail,
    FiTrash2,
} from "react-icons/fi";
import { MdOutlineMarkEmailRead } from "react-icons/md";

export default function Users() {
    const { user: currentUser } = useAuth();
    const {
        notifications,
        setNotifications,
        loading: notificationsLoading,
        setLoading: setNotificationsLoading,
    } = useNotifications();
    // const [notifications, setNotifications] = useState([]);
    // const [notificationsLoading, setNotificationsLoading] = useState(true);
    const [selectedNotification, setSelectedNotification] = useState({
        value: "all",
        label: "All Notifications",
    });
    const navigate = useNavigate();

    useEffect(() => {
        setNotificationsLoading(true);
    }, []);

    // useEffect(() => {
    //     axiosClient
    //         .get("/notifications")
    //         .then((response) => {
    //             setNotifications(response.data);
    //             setNotificationsLoading(false);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching users:", error);
    //         });
    // }, [notificationsLoading]);

    // Role options for react-select
    const notificationOptions = [
        { value: "all", label: "All Notifications" },
        ...(currentUser?.role === "client"
            ? [
                  { value: "reservation", label: "Reservations" },
                  { value: "message", label: "Messages" },
              ]
            : currentUser?.role === "host"
              ? [
                    { value: "request", label: "Requests" },
                    { value: "message", label: "Messages" },
                ]
              : []),
        { value: "system", label: "System" },
    ];
    // Get icon for notification type
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

    // Filter
    const filteredNotifications =
        selectedNotification.value === "all"
            ? notifications
            : notifications.filter(
                  (n) => n.type === selectedNotification.value,
              );

    // Mark all as read
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

    const deleteNotification = (notificationId) => {
        axiosClient
            .delete(`/notifications/${notificationId}`)
            .then((response) => {
                setNotificationsLoading(true);
                toast.success("Notification deleted successfully!");
            })
            .catch((error) => {
                console.error("Error deleting notification:", error);
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
        <section className="my-15 px-4 lg:px-6">
            <div className="mx-auto max-w-screen-xl overflow-hidden rounded-lg bg-white shadow-sm">
                {/* Header */}
                <div className="from-primary-600 to-primary-700 bg-gradient-to-br px-6 py-4">
                    <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:gap-0 md:text-left">
                        <div>
                            <h1 className="text-2xl font-bold text-white">
                                Notifications
                            </h1>
                            <p className="text-primary-100 mt-1">
                                View and manage your notifications
                            </p>
                        </div>
                    </div>
                </div>

                {/* Controls Section */}
                <div className="border-b border-gray-200 p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        {/* Mark All as Read */}
                        <div className="w-full md:w-1/3">
                            <button
                                className="text-primary-700 hover:text-primary-800 flex items-center justify-between gap-2 hover:underline"
                                onClick={markAllAsRead}
                            >
                                <MdOutlineMarkEmailRead className="text-xl" />
                                Mark all as read
                            </button>
                        </div>

                        {/* Notification Filter */}
                        <div className="w-full md:w-1/4">
                            <Select
                                options={notificationOptions}
                                value={selectedNotification}
                                onChange={setSelectedNotification}
                                isSearchable={false}
                                menuPortalTarget={document.body}
                                menuPosition="fixed"
                                styles={{
                                    control: (base, state) => ({
                                        ...base,
                                        borderColor: state.isFocused
                                            ? "var(--color-primary-700)"
                                            : base.borderColor,
                                        boxShadow: state.isFocused
                                            ? "0 0 0 1px var(--color-primary-700)"
                                            : base.boxShadow,
                                        "&:hover": {
                                            borderColor:
                                                "var(--color-primary-700)",
                                        },
                                    }),
                                    option: (base, state) => ({
                                        ...base,
                                        backgroundColor: state.isSelected
                                            ? "var(--color-primary-700)" // selected
                                            : state.isFocused
                                              ? "var(--color-primary-100)" // hover
                                              : "white",
                                        color: state.isSelected
                                            ? "white"
                                            : "#000",
                                        ":active": {
                                            backgroundColor:
                                                "var(--color-primary-700)",
                                            color: "white",
                                        },
                                    }),
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Notifications Section */}
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    {filteredNotifications.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            No notifications found
                        </div>
                    ) : (
                        <ul className="divide-y divide-gray-200">
                            {filteredNotifications.map((notification) => (
                                <li
                                    key={notification.id}
                                    className={`zhover:bg-gray-50 duration-300 ${!notification.is_seen ? "bg-primary-50" : ""}`}
                                >
                                    <div className="px-4 py-4 sm:px-6">
                                        <div className="flex items-start justify-between">
                                            <div
                                                className="min-w-0 flex-1 cursor-pointer"
                                                onClick={() =>
                                                    handleNotificationClick(
                                                        notification.type,
                                                        notification.id,
                                                    )
                                                }
                                            >
                                                <div className="flex items-center gap-3">
                                                    {getNotificationIcon(
                                                        notification.type,
                                                    )}
                                                    <div className="flex-1">
                                                        <p
                                                            className={`text-sm font-medium ${!notification.read ? "text-gray-900" : "text-gray-600"}`}
                                                        >
                                                            {
                                                                notification.subject
                                                            }
                                                        </p>
                                                        <p className="mt-1 text-sm text-gray-500">
                                                            {
                                                                notification.content
                                                            }
                                                        </p>
                                                        <p className="mt-1 text-xs text-gray-400">
                                                            {formatTimeAgo(
                                                                new Date(
                                                                    notification.created_at,
                                                                ),
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="ml-4 flex flex-shrink-0 gap-2">
                                                {!notification.read && (
                                                    <button
                                                        onClick={() =>
                                                            markAsRead(
                                                                notification.id,
                                                            )
                                                        }
                                                        className="p-1 text-gray-400 hover:text-green-500"
                                                        title="Mark as read"
                                                    >
                                                        <FiCheck size={18} />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() =>
                                                        deleteNotification(
                                                            notification.id,
                                                        )
                                                    }
                                                    className="p-1 text-gray-400 hover:text-red-500"
                                                    title="Delete"
                                                >
                                                    <FiTrash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </section>
    );
}
