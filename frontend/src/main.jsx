import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./js/script.js";
import "./styles/animation.css";
import "./styles/index.css";
import "./styles/output.css"; // tailwind's output
import "./styles/responsive.css";
import "./styles/style.css"; // custom styles

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
