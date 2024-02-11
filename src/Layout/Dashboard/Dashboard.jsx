import { Link, NavLink, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import useCurrentUser from "../../Hooks/useCurrentUser/useCurrentUser";
import { useEffect } from "react";

// website logo
const logo = "https://i.ibb.co/sR7yV2c/website-Logo.png";
const bgImg = "https://i.ibb.co/FWDxTW1/restaurant.jpg";

const Dashboard = () => {

    // hooks and custom hooks
    const location = useLocation();
    const { userPending, user } = useCurrentUser();
    const navigate = useNavigate();

    console.log(location)

    useEffect(() => {
        if (!userPending && user?.userType === "admin" && location.pathname.slice(0, 11) === "/dashboard") {
            navigate("/dashboard/adminStatistics")
        }
    }, [location.pathname, user?.userType, userPending, navigate])



    // navigation menu
    const adminMenu =
        <>
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/dashboard/adminStatistics"}>Statistics</NavLink>
            <NavLink to={"/dashboard/addNewItem"}>Add Item</NavLink>
            <NavLink to={"/dashboard/allItems"}>All Items</NavLink>
            <NavLink to={"/dashboard/allUsers"}>All Users</NavLink>
            <NavLink to={"/dashboard/allReservation"}>All Reservation</NavLink>
            <NavLink to={"/dashboard/coupons"}>Coupons</NavLink>
        </>



    return (
        <div>
            <div className="h-[400px] flex flex-col justify-center items-center gap-4"
                style={{
                    background: `linear-gradient(to top, #000000f2, #00000072), url(${bgImg})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }}>
                <Link to={"/"}><img src={logo} alt="Website logo" className="w-[125px] h-[50px] hover:scale-110 duration-500" /></Link>
                <h1 className="text-5xl uppercase md:text-7xl font-heading text-center">Dashboard</h1>
                <div className="flex flex-wrap justify-center items-center gap-5 font-body mt-2">
                    {adminMenu}
                </div>
            </div>

            {/* outlet div */}
            <div className="container mx-auto p-5">
                <Outlet />
            </div>
        </div >
    );
};

export default Dashboard;