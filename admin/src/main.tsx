import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Providers from "./redux/provider";
import './globals.css'
import theme from "./utils/theme";
import {ThemeProvider} from "@mui/material";
import {createBrowserRouter,redirect, RouterProvider} from "react-router-dom";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Post from "./pages/posts/Post";
import Create from "./pages/posts/Create";
import config from "../../config.json";
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);


const authenticate = async () => {
    const auth = await fetch('http://localhost:3000/api/auth',{
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'X-API-KEY': config.X_API_KEY
        }
    })
    const authData = await auth.json()
    console.log('authData', authData)
    if (authData.logged_in) {
        return null
    }
    return redirect('/login')
}

//


const router = createBrowserRouter([
    {
        path:"/login",
        element: <Login />
    },
    {
        path: "/",
        element: <Dashboard />,
        loader: async ({params}) => {
            console.log('params', params)
            await authenticate()
            return null
        }
    },
    {
        path: "/posts",
        element: <Post />,
        loader: authenticate
    },
    {
        path: "/posts/create",
        element: <Create/>,
        loader: authenticate
    }
]);

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Providers>
                <RouterProvider router={router} />
                <App />
            </Providers>
        </ThemeProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();