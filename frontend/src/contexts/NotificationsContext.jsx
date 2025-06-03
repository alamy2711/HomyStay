import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../lib/axiosClient";
import { useAuth } from "./AuthContext";


const NotificationsContext = createContext({
    notifications: [],
    setNotifications: () => {},
    loading: null,
    setLoading: () => {},
});

export const NotificationsProvider = ({ children }) => {

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const {token} = useAuth();

    // useEffect(() => {
    //     axiosClient
    //         .get("/notifications")
    //         .then((response) => {
    //             setNotifications(response.data);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching users:", error);
    //         })
    //         .finally(() => {
    //             setLoading(false);
    //         });
    // }, [loading]);

    useEffect(() => {
        const fetchNotifications = () => {
            if (!token) {
                return;
            }
            axiosClient
                .get("/notifications")
                .then((response) => {
                    setNotifications(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching notifications:", error);
                });
        };

        fetchNotifications(); // initial fetch

        const interval = setInterval(fetchNotifications, 10000); // every 10s

        return () => clearInterval(interval); // cleanup on unmount
    }, [loading, token]);


    return (
        <NotificationsContext.Provider value={{ notifications, loading, setLoading }}>
            {children}
        </NotificationsContext.Provider>
    );
};

export const useNotifications = () => {
    return useContext(NotificationsContext);
};

