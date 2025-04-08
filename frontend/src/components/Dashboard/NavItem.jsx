import { Link } from "react-router-dom";
import { useSidebar } from "../../contexts/SidebarContext";

export default function NavItem({ item, isActive, alert = 2 }) {
    const { toggleHidden, isCollapsed } = useSidebar();

    return (
        <li>
            {item.name == "Profile" && <hr className="my-4 text-gray-200" />}
            <Link
                to={item.path}
                onClick={toggleHidden}
                className={`hover:bg-primary-50 group flex items-center rounded-2xl p-3 ${
                    isActive ? "bg-primary-100" : ""
                }`}
            >
                <item.icon
                    className={`h-6 min-w-6 ${isActive ? "text-primary-700" : "text-gray-700"}`}
                />

                <span
                    className={`px-3 transition-all duration-600 ${isCollapsed ? "translate-x-15" : ""} ${isActive ? "text-primary-700 font-semibold" : "text-gray-700"}`}
                >
                    {item.name}
                </span>
                {(item.name == "Inbox" || item.name == "Notifications") &&
                    alert > 0 && (
                        <div className="bg-primary-700 absolute right-5 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full">
                            <span className="text-center text-[0.7rem] leading-none font-[500] text-white">
                                {alert}
                            </span>
                        </div>
                    )}

                {isCollapsed && (
                    <div
                        className={`bg-primary-600 invisible absolute left-full ml-3 -translate-x-3 rounded-md px-2 py-1 text-sm font-[500] text-white opacity-20 transition-all group-hover:visible group-hover:translate-x-0 group-hover:opacity-100`}
                    >
                        {item.name}
                    </div>
                )}
            </Link>
        </li>
    );
}
