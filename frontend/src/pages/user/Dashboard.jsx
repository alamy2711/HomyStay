import { useAuth } from "@contexts/AuthContext";
import {
    BellIcon,
    BuildingOfficeIcon,
    CalendarIcon,
    ChatBubbleLeftRightIcon,
    Cog6ToothIcon,
    HeartIcon,
    UserIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function Dashboard() {
    const { user, loading: userLoading } = useAuth();

    if (userLoading) return null;

    // Get the appropriate links based on user role
    const getDashboardLinks = () => {
        const commonLinks = [
            { name: "Profile", path: "/profile", icon: UserIcon },
            { name: "Settings", path: "/settings", icon: Cog6ToothIcon },
            { name: "Notifications", path: "/notifications", icon: BellIcon },
            { name: "Inbox", path: "/inbox", icon: ChatBubbleLeftRightIcon },
        ];

        if (user.role === "client") {
            return [
                { name: "Favorites", path: "/favorites", icon: HeartIcon },
                {
                    name: "Reservations",
                    path: "/reservations",
                    icon: CalendarIcon,
                },
                ...commonLinks,
            ];
        } else if (user.role === "host") {
            return [
                {
                    name: "Listings",
                    path: "/listings",
                    icon: BuildingOfficeIcon,
                },
                {
                    name: "Reservations",
                    path: "/reservations",
                    icon: CalendarIcon,
                },
                ...commonLinks,
            ];
        } else if (user.role === "admin") {
            return [
                { name: "Users", path: "/users", icon: UsersIcon },
                ...commonLinks,
            ];
        }
        return commonLinks;
    };

    return (
        <div>
            <h1 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">
                Welcome, {user.name}!
            </h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {getDashboardLinks().map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className="block rounded-lg border border-gray-200 bg-white p-6 shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                        <div className="flex items-center">
                            <item.icon className="mr-4 h-8 w-8 text-blue-600 dark:text-blue-400" />
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {item.name}
                            </h2>
                        </div>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Click to view {item.name.toLowerCase()}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
