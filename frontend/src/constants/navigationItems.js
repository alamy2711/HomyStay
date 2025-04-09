import {
    BellIcon,
    BuildingOfficeIcon,
    CalendarIcon,
    ChatBubbleLeftRightIcon,
    ClipboardIcon,
    Cog6ToothIcon,
    HeartIcon,
    HomeIcon,
    UserIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";

// Navigation items configuration
export const NAV_ITEMS = {
    client: [
        { name: "Dashboard", path: "/dashboard", icon: HomeIcon },
        { name: "Favorites", path: "/favorites", icon: HeartIcon },
        { name: "Reservations", path: "/reservations", icon: CalendarIcon },
        { name: "Inbox", path: "/inbox", icon: ChatBubbleLeftRightIcon },
        { name: "Notifications", path: "/notifications", icon: BellIcon },
        { name: "Profile", path: "/profile", icon: UserIcon },
        { name: "Settings", path: "/settings", icon: Cog6ToothIcon },
    ],
    host: [
        { name: "Dashboard", path: "/dashboard", icon: HomeIcon },
        { name: "Listings", path: "/listings", icon: BuildingOfficeIcon },
        { name: "Requests", path: "/requests", icon: ClipboardIcon },
        { name: "Inbox", path: "/inbox", icon: ChatBubbleLeftRightIcon },
        { name: "Notifications", path: "/notifications", icon: BellIcon },
        { name: "Profile", path: "/profile", icon: UserIcon },
        { name: "Settings", path: "/settings", icon: Cog6ToothIcon },
    ],
    admin: [
        { name: "Dashboard", path: "/dashboard", icon: HomeIcon },
        { name: "Users", path: "/users", icon: UsersIcon },
        { name: "Notifications", path: "/notifications", icon: BellIcon },
        { name: "Profile", path: "/profile", icon: UserIcon },
        { name: "Settings", path: "/settings", icon: Cog6ToothIcon },
    ],
    super_admin: [
        { name: "Dashboard", path: "/dashboard", icon: HomeIcon },
        { name: "Users", path: "/users", icon: UsersIcon },
        { name: "Notifications", path: "/notifications", icon: BellIcon },
        { name: "Profile", path: "/profile", icon: UserIcon },
        { name: "Settings", path: "/settings", icon: Cog6ToothIcon },
    ],
};
