import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import Main from "../layout/Main";
import AddProduct from "../pages/AddProduct/AddProduct";
import AllBuyers from "../pages/AllBuyers/AllBuyers";
import AllUser from "../pages/AllUser/AllUser";
import Blog from "../pages/Blog/Blog";
import Category from "../pages/Category/Category";
import Dashboard from "../pages/Dashboard/Dashboard";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import MyProducts from "../pages/MyProducts/MyProducts";
import NoRoutepage from "../pages/NoRoutePage/NoRoutepage";
import Register from "../pages/Register/Register";
import AdminRoute from "./AdminRoute";
import PrivateRoutes from "./PrivateRoutes";
import SellerRoute from "./SellerRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/category/:id',
                element: <PrivateRoutes><Category></Category></PrivateRoutes>
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            },
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                path: '/dashboard',
                element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>
            },
            {
                path: '/dashboard/all-sellers',
                element: <PrivateRoutes><AdminRoute><AllUser></AllUser></AdminRoute></PrivateRoutes>
            },
            {
                path: '/dashboard/all-buyers',
                element: <PrivateRoutes><AdminRoute><AllBuyers></AllBuyers></AdminRoute></PrivateRoutes>
            },
            {
                path: '/dashboard/add-product',
                element: <PrivateRoutes><SellerRoute><AddProduct></AddProduct></SellerRoute></PrivateRoutes>
            },
            {
                path: '/dashboard/my-product',
                element: <PrivateRoutes><SellerRoute><MyProducts></MyProducts></SellerRoute></PrivateRoutes>
            },
        ]
    },
    {
        path: '*',
        element: <NoRoutepage></NoRoutepage>
    }
])

export default router;