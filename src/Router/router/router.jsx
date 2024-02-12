import { createBrowserRouter } from "react-router-dom";
import Root from "../../Layout/Root/Root";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import Home from "../../Pages/HomePage/Home";
import Register from "../../Pages/Register/Register";
import SignIn from "../../Pages/SignIn/SignIn";
import AddNewItem from "../../Pages/AdminDashboardPages/AddNewItem/AddNewItem";
import OurMenus from "../../Pages/OurMenus/OurMenus";
import AllUsers from "../../Pages/AdminDashboardPages/AllUsers/AllUsers";
import AllItems from "../../Pages/AdminDashboardPages/AllItems/AllItems";
import UpdateItem from "../../Pages/AdminDashboardPages/UpdateItem/UpdateItem";
import StoryHub from "../../Pages/StoryHub/StoryHub";
import FindATable from "../../Pages/FindATable/FindATable";
import AllReservation from "../../Pages/AdminDashboardPages/AllReservation/AllReservation";
import AboutUs from "../../Pages/AboutUs/AboutUs";
import Contact from "../../Pages/Contact/Contact";
import MyCart from "../../Pages/MyCart/MyCart";
import Coupons from "../../Pages/AdminDashboardPages/Coupons/Coupons";
import Checkout from "../../Pages/Checkout/Checkout";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AdminRoute from "../AdminRoute/AdminRoute";
import Dashboard from "../../Layout/Dashboard/Dashboard";
import AdminStatistics from "../../Pages/AdminDashboardPages/AdminStatistics/AdminStatistics";
import CheckoutSuccess from "../../Pages/Checkout/CheckoutSuccess";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/allMenus",
                element: <OurMenus />
            },
            {
                path: "/about",
                element: <AboutUs />
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/storyHub",
                element: <StoryHub />
            },
            {
                path: "/findATable",
                element: <FindATable />
            },
            {
                path: "/myCart",
                element: <PrivateRoute><MyCart /></PrivateRoute>
            },
            {
                path: "/checkout",
                element: <PrivateRoute><Checkout /></PrivateRoute>
            },
            {
                path: "/checkoutSuccess",
                element: <PrivateRoute><CheckoutSuccess /></PrivateRoute>
            },
        ],
    },
    // register and sign in page
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/signIn",
        element: <SignIn />
    },

    // admin dashboard pages
    {
        path: "dashboard",
        element: <AdminRoute><Dashboard /></AdminRoute>,
        children: [
            {
                path: "adminStatistics",
                element: <AdminStatistics />,
            },
            {
                path: "addNewItem",
                element: <AddNewItem />,
            },
            {
                path: "allUsers",
                element: <AllUsers />,
            },
            {
                path: "allItems",
                element: <AllItems />,
            },
            {
                path: "updateItem/:id",
                element: <UpdateItem />,
            },
            {
                path: "allReservation",
                element: <AllReservation />,
            },
            {
                path: "coupons",
                element: <Coupons />,
            },
        ],
    },
]);

export default router;