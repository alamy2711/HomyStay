import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
    user: {},
    setUser: () => {},
    token: null,
    setToken: () => {},
    loading: null,
});

// Dummy User Data
import { ROLES } from "@/constants/userRoles";
import axiosClient from "../lib/axiosClient";

const users = [
    {
        id: 1,
        name: "Carl Johnson",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        profilePicture: "/images/users/pfp-0004.jpg",
        email: "carl.johnson@gmail.com",
        role: ROLES.CLIENT,
        joinDate: "2023-01-15",
    },
    {
        id: 2,
        name: "Jane Smith",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        email: "jsmith@example.com",
        role: ROLES.CLIENT,
        joinDate: "2022-11-03",
    },
    {
        id: 3,
        name: "Alex Johnson",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        email: "AlexJohn@gmail.com",
        role: ROLES.CLIENT,
        joinDate: "2023-03-22",
    },
    {
        id: 4,
        name: "Sarah Williams",
        avatar: "https://randomuser.me/api/portraits/women/4.jpg",
        email: "sarahwl@gmail.com",
        role: ROLES.CLIENT,
        joinDate: "2022-09-10",
    },
    {
        id: 5,
        name: "Michael Brown",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg",
        email: "michael.brown@gmail.com",
        role: ROLES.CLIENT,
        joinDate: "2023-02-18",
    },
    {
        id: 6,
        name: "Emily Davis",
        avatar: "https://randomuser.me/api/portraits/women/6.jpg",
        email: "emily.davis@gmail.com",
        role: ROLES.CLIENT,
        joinDate: "2023-04-05",
    },
    {
        id: 7,
        name: "David Wilson",
        avatar: "https://randomuser.me/api/portraits/men/7.jpg",
        email: "david.wilson@gmail.com",
        role: ROLES.HOST,
        joinDate: "2022-10-25",
    },
    {
        id: 8,
        name: "Jessica Thompson",
        avatar: "https://randomuser.me/api/portraits/women/8.jpg",
        email: "jessica.thompson@gmail.com",
        role: ROLES.ADMIN,
        joinDate: "2023-05-12",
    },
    {
        id: 9,
        name: "Michael Lee",
        avatar: "https://randomuser.me/api/portraits/men/9.jpg",
        email: "michael.lee@gmail.com",
        role: ROLES.SUPER_ADMIN,
        joinDate: "2022-12-07",
    },
];
const userData = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    profilePicture: "/images/users/pfp-0004.jpg",
    role: "admin",
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [token, _setToken] = useState(localStorage.getItem("TOKEN") || null);
    const [loading, setLoading] = useState(true);

    const setToken = (newToken) => {
        _setToken(newToken);

        if (newToken) {
            localStorage.setItem("TOKEN", newToken);
        } else {
            localStorage.removeItem("TOKEN");
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            // await axiosClient.get("/sanctum/csrf-cookie");
            await axiosClient.post("/logout");
            setUser(null);
            setToken(null);
            localStorage.removeItem("TOKEN");
        } catch (error) {
            console.error("Logout failed", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            setLoading(true); // start loading before request

            axiosClient
                .get("/user")
                .then(({ data }) => {
                    setUser(data);
                })
                .catch(() => {
                    setToken(null);
                    setUser(null);
                })
                .finally(() => setLoading(false)); // stop loading in any case
        } else {
            setLoading(false); // no token = no need to load
        }
    }, [token]);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                token,
                setToken,
                logout,
                loading,
                setLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
