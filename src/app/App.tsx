// ? Library Imports
import React from "react";
// ? Layer Imports
// ? Api Imports
import { createBrowserRouter, RouterProvider } from "react-router";
import { HomePage } from "../pages/HomePage";
import { AboutPage } from "../pages/AboutPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import SwaggerDoc from "../pages/SwaggerDoc/SwaggerDoc";
import { LessonPage } from "../pages/LessonPage";

const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/about", element: <AboutPage /> },
    { path: "*", element: <NotFoundPage /> }, // Обработчик 404
    { path: "/api-docs", element: <SwaggerDoc /> },
    { path: "/lesson", element: <LessonPage /> },
]);

// function App() {
//     console.log(import.meta.env.VITE_TEST);
//
//     useEffect(() => {
//         fetchData<{ text: string }>("").then((data) => {
//             console.log(data.text);
//         });
//     }, []);
//
//     // ? Render
//     return (
//         <div>
//             <h1>Hello, World!</h1>
//             <TestUI />
//         </div>
//     );
// }

function App() {
    return <RouterProvider router={router} />;
}

export default App;
