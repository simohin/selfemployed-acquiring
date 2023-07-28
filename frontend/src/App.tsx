import React from 'react';
import './App.css';
import {Provider} from "react-redux";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Main} from "./layouts/Main";
import {store} from "./store/models";
import {createTheme, responsiveFontSizes, ThemeProvider} from "@mui/material";

let theme = createTheme();
theme = responsiveFontSizes(theme);

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
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <RouterProvider router={router}/>
            </Provider>
        </ThemeProvider>
    )
}
