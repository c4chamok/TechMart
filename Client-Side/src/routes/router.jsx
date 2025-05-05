import { createBrowserRouter, Navigate } from "react-router";
import Home from "../pages/home/Home";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import DashboardLayouts from "../Layouts/DashboardLayouts/DashboardLayouts";
import ProductsPage from "../pages/ProductsPage/ProductsPage";

export const router = createBrowserRouter([
    {
        path: "",
        element: <Home/>
    },
    {
        path: "signup",
        element: <SignUpPage/>
    },
    {
        path: "login",
        element: <LoginPage/>
    },
    {
        path: "dashboard",
        element: <DashboardLayouts/>,
        children:[
            {
                path: '',
                element: <Navigate to={'stats'}/>
            },
            {
                path:"stats",
                element: <h2 className="text-5xl ">this is stats page</h2>
            },
            {
                path:"products",
                element: <ProductsPage/>
            },
            {
                path:"users",
                element: <h2 className="text-5xl ">this is All Users page</h2>
            },
            {
                path:"orders",
                element: <h2 className="text-5xl ">this is All orders page</h2>
            },
        ]
    },
])