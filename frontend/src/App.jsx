import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { router } from "./router/index";
import { ApartmentsProvider } from "./contexts/ApartmentsContext";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <AuthProvider>
                <ApartmentsProvider>
                    <RouterProvider router={router} />
                </ApartmentsProvider>
            </AuthProvider>
        </>
    );
}

export default App;
