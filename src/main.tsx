import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";

const container = document.getElementById("root");
if (container) {
    const root = ReactDOM.createRoot(container as HTMLElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    );
} else {
    console.error("Root container missing in index.html");
}
