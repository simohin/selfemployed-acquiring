import React from 'react';
import './App.css';
import {Provider} from "react-redux";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Main} from "./layouts/Main";
import {store} from "./store/models";

export const App = () => {
    const router = createBrowserRouter([
        {
            path: "",
            element: (
                <Main/>
            )
        },
    ])
    return (
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    )
}
