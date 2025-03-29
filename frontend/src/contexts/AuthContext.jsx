import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

// Dummy User Data
const userData = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        id: null,
        name: null,
        email: null,
        role: null,
    });
    const [token, setToken] = useState();
    // const [token, setToken] = useState(localStorage.getItem("token"));

    // Dummy User Data / Token for demonstration purposes
    useEffect(() => {
        // setUser(userData);
        // setToken("dummy_token_1234567890");
    });

    // Save token and user info in local storage (so it persists on page refresh)
    // useEffect(() => {
    //     if (token) {
    //         localStorage.setItem("token", token);
    //     } else {
    //         localStorage.removeItem("token");
    //     }
    // }, [token]);

    return (
        <AuthContext.Provider value={{ user, setUser, token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
