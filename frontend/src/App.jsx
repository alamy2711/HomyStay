import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ApartmentsProvider } from "./contexts/ApartmentsContext";
import { AuthProvider } from "./contexts/AuthContext";
import { router } from "./router/index";
import { NotificationsProvider } from "./contexts/NotificationsContext";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <AuthProvider>
                <ApartmentsProvider>
                    <NotificationsProvider>
                        <RouterProvider router={router} />
                    </NotificationsProvider>
                </ApartmentsProvider>
            </AuthProvider>
            <ToastContainer
                position="bottom-right"
                theme="light"
                limit={3}
                newestOnTop={false}
                draggable
            />
        </>
    );
}

export default App;
