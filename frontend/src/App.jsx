import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import { router } from "./router/index";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </>
    );
}

export default App;
