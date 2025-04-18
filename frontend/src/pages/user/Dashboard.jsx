import { useAuth } from "@contexts/AuthContext";
import {
    BuildingOfficeIcon,
    CalendarIcon,
    HeartIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { NAV_ITEMS } from "../../constants/navigationItems";

export default function Dashboard() {
    const { user, loading: userLoading } = useAuth();

    if (userLoading) return null;

    // Get the appropriate links based on user role
    const getDashboardLinks = () => {
        // const commonLinks = [
        //     { name: "Profile", path: "/profile", icon: UserIcon },
        //     { name: "Settings", path: "/settings", icon: Cog6ToothIcon },
        //     { name: "Notifications", path: "/notifications", icon: BellIcon },
        //     { name: "Inbox", path: "/inbox", icon: ChatBubbleLeftRightIcon },
        // ];
        const commonLinks = NAV_ITEMS[user?.role].slice(1) || [];

        return commonLinks;
    };

    return (
        <section className="my-15 px-4 lg:px-6">
            <div className="mx-auto max-w-screen-xl rounded-lg bg-white px-4 py-10 font-bold shadow-sm">
                <h1 className="mb-6 text-2xl font-bold text-gray-800">
                    Welcome, <span className="text-primary-700">{user.first_name}</span>!
                </h1>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {getDashboardLinks().map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="block rounded-lg border border-gray-200 bg-white p-6 shadow-md hover:bg-primary-50"
                        >
                            <div className="flex items-center">
                                <item.icon className="mr-4 h-8 w-8 text-primary-700" />
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {item.name}
                                </h2>
                            </div>
                            <p className="mt-2 text-gray-600">
                                Click to view {item.name.toLowerCase()}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
