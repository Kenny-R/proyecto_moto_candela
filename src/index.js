import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AlertProvider } from "./contextos/AlertProvider";

const theme = createTheme({
    palette: {
        primary: {
            main: "#000",
        },
        secondary: {
            main: "#f1f1f1",
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <AlertProvider>
            <Routes>
                <Route
                    path="/*"
                    element={
                        <ThemeProvider theme={theme}>
                            <App />
                        </ThemeProvider>
                    }
                />
            </Routes>
        </AlertProvider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
