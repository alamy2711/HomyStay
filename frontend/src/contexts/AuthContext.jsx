import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
    user: {},
    setUser: () => {},
    token: null,
    setToken: () => {},
    loading: null,
});

// Dummy User Data
const userData = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    profilePicture: "/images/users/pfp-0004.jpg",
    role: "host",
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [token, setToken] = useState();
    const [loading, setLoading] = useState(true);
    // const [token, setToken] = useState(localStorage.getItem("token"));

    // Dummy User Data / Token for demonstration purposes
    useEffect(() => {
        setUser(userData);
        setToken();
        setLoading(false);
    }, []);

    // Save token and user info in local storage (so it persists on page refresh)
    // useEffect(() => {
    //     if (token) {
    //         localStorage.setItem("token", token);
    //     } else {
    //         localStorage.removeItem("token");
    //     }
    // }, [token]);

    return (
        <AuthContext.Provider
            value={{ user, setUser, token, setToken, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
