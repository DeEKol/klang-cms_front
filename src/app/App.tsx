// ? Library Imports
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
// ? Layer Imports
// ? Api Imports
import { HomePage } from "../pages/HomePage";
import { AboutPage } from "../pages/AboutPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { SwaggerDoc } from "../pages/SwaggerDoc";
import { LessonPage } from "../pages/LessonPage";
import { LessonIdPage } from "../pages/LessonIdPage";

const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/about", element: <AboutPage /> },
    { path: "*", element: <NotFoundPage /> }, // * Обработчик 404
    { path: "/api-docs", element: <SwaggerDoc /> },
    { path: "/lesson", element: <LessonPage /> },
    {
        path: "/lesson/:id",
        element: <LessonIdPage />,
    },
]);

function App() {
    // console.log(import.meta.env.VITE_TEST);
    return <RouterProvider router={router} />;
}

export default App;
