// ? Library Imports
import React, { useEffect } from "react";
// ? Layer Imports
import TestUI from "../shared/ui-kit/TestUI/TestUI";
// ? Api Imports
import { fetchData } from "../shared/api/api";

function App() {
    console.log(import.meta.env.VITE_TEST);

    useEffect(() => {
        fetchData<{ text: string }>("").then((data) => {
            console.log(data.text);
        });
    }, []);

    // ? Render
    return (
        <div>
            <h1>Hello, World!</h1>
            <TestUI />
        </div>
    );
}

export default App;
