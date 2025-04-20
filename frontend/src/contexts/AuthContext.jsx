import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../lib/axiosClient";


const AuthContext = createContext({
    user: {},
    setUser: () => {},
    token: null,
    setToken: () => {},
    loading: null,
});





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
                    setUser(data.data);
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
