import { createBrowserRouter, Navigate } from "react-router";
import Home from "../pages/home/Home";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import DashboardLayouts from "../Layouts/DashboardLayouts/DashboardLayouts";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import MainLayouts from "../Layouts/MainLayouts/MainLayouts";
import MyCart from "../pages/MyCart/MyCart";
import OrdersPage from "../pages/OrdersPage/OrdersPage";
import MyOrdersPage from "../pages/MyOrdersPage/MyOrdersPage";
import ProtectedRoute from "./protectedRoute";

export const router = createBrowserRouter([
    {
        path: "",
        element: <MainLayouts/>,
        children: [
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
                path: "my-cart",
                element: <MyCart/>
            },
            {
                path: "my-orders",
                element: <ProtectedRoute children={<MyOrdersPage/>}/>
            },
        ]
    },
    {
        path: "dashboard",
        element: <ProtectedRoute children={<DashboardLayouts/>}/> ,
        children:[
            {
                path: '',
                element: <Navigate to={'products'}/>
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
                element: <OrdersPage/>
            },
        ]
    },
])