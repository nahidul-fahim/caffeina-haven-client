import { createBrowserRouter } from "react-router-dom";
import Root from "../../Layout/Root/Root";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import Home from "../../Pages/HomePage/Home";
import Register from "../../Pages/Register/Register";
import SignIn from "../../Pages/SignIn/SignIn";
import AddNewItem from "../../Pages/AdminDashboardPages/AddNewItem/AddNewItem";
import Dashboard from "../../Layout/Dashboard/Dashboard";
import OurMenus from "../../Pages/OurMenus/OurMenus";
import AllUsers from "../../Pages/AdminDashboardPages/AllUsers/AllUsers";
import AllItems from "../../Pages/AdminDashboardPages/AllItems/AllItems";


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
        element: <Dashboard />,
        children: [
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
        ],
    },
]);

export default router;