import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import useCurrentUser from "../../Hooks/useCurrentUser/useCurrentUser";
import { useEffect } from "react";
import useDownAnimation from "../../Hooks/useDownAnimation/useDownAnimation";
import { motion } from "framer-motion"
import useScrollToTop from "../../Hooks/useScrollToTop/useScrollToTop";

// website logo
const logo = "https://i.ibb.co/sR7yV2c/website-Logo.png";
const bgImg = "https://i.ibb.co/FWDxTW1/restaurant.jpg";

const Dashboard = () => {

    // hooks and custom hooks
    const location = useLocation();
    const { userPending, user } = useCurrentUser();
    const navigate = useNavigate();
    const downAnimation = useDownAnimation();
    const scrollToTop = useScrollToTop();


    // redirect admin to the statistics page
    useEffect(() => {
        scrollToTop();
        if (!userPending && user?.userType === "admin" && location.pathname.slice(0, 11) !== "/dashboard/") {
            navigate("/dashboard/adminStatistics")
        }
    }, [location.pathname, user?.userType, userPending, navigate, scrollToTop])



    // navigation menu
    const adminMenu =
        <>
            <NavLink to={"/"} className={({ isActive }) => {
                return isActive ? "active-menu-link" : "menu-link"
            }}>Home</NavLink>
            <NavLink to={"/dashboard/adminStatistics"} className={({ isActive }) => {
                return isActive ? "active-menu-link" : "menu-link"
            }} >Statistics</NavLink>
            <NavLink to={"/dashboard/addNewItem"} className={({ isActive }) => {
                return isActive ? "active-menu-link" : "menu-link"
            }}>Add Item</NavLink>
            <NavLink to={"/dashboard/allItems"} className={({ isActive }) => {
                return isActive ? "active-menu-link" : "menu-link"
            }}>All Items</NavLink>
            <NavLink to={"/dashboard/allUsers"} className={({ isActive }) => {
                return isActive ? "active-menu-link" : "menu-link"
            }}>All Users</NavLink>
            <NavLink to={"/dashboard/allReservation"} className={({ isActive }) => {
                return isActive ? "active-menu-link" : "menu-link"
            }}>All Reservation</NavLink>
            <NavLink to={"/dashboard/coupons"} className={({ isActive }) => {
                return isActive ? "active-menu-link" : "menu-link"
            }}>Coupons</NavLink>
        </>



    return (
        <div>
            <motion.div
                variants={downAnimation(1.2, 0)}
                initial="hidden"
                whileInView={"visible"}
                className="h-[400px] flex flex-col justify-center items-center gap-4"
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
            </motion.div>

            {/* outlet div */}
            <div className="container mx-auto p-5">
                <Outlet />
            </div>
        </div >
    );
};

export default Dashboard;