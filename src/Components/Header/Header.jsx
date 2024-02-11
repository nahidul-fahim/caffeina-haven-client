import { Link, NavLink } from "react-router-dom";
import ButtonSecond from "../ButtonSecond/ButtonSecond";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoBagHandle } from "react-icons/io5";
import useAuthContext from "../../Hooks/useAuthContext/useAuthContext";
import useCurrentUser from "../../Hooks/useCurrentUser/useCurrentUser";
import useCartItems from "../../Hooks/useCartItems/useCartItems";



// website logo
const logo = "https://i.ibb.co/sR7yV2c/website-Logo.png";

const Header = () => {

    // hooks and custom hooks
    const { currentUser, authLoading, signOutUser } = useAuthContext();
    const { userPending, user } = useCurrentUser();
    const { cartItemsPending, cartItems } = useCartItems();



    // navigation menu
    const navMenu =
        <>
            <NavLink to={"/"}
                className={({ isActive }) => {
                    return isActive ? "active-menu-link" : "menu-link"
                }}>Home</NavLink>
            <NavLink to={"/allMenus"}
                className={({ isActive }) => {
                    return isActive ? "active-menu-link" : "menu-link"
                }}>Our Menu</NavLink>
            <NavLink to={"/about"}
                className={({ isActive }) => {
                    return isActive ? "active-menu-link" : "menu-link"
                }}>About</NavLink>
            <NavLink to={"/contact"}
                className={({ isActive }) => {
                    return isActive ? "active-menu-link" : "menu-link"
                }}>Contact</NavLink>
            <NavLink to={"/storyHub"}
                className={({ isActive }) => {
                    return isActive ? "active-menu-link" : "menu-link"
                }}>Story Hub</NavLink>
        </>


    // user sign out
    const handleSignOut = () => {
        signOutUser();
    }




    return (
        <nav className="container mx-auto absolute top-0 left-[50%] translate-x-[-50%] z-[99] flex flex-col justify-between items-center px-5 gap-0">
            {/* upper side heading */}
            <div className="w-full py-2 flex justify-end items-center border-b-[1px] border-[#ffffff21] gap-3 md:gap-5">

                {/* sign in button or user details */}
                {
                    authLoading ? <span className="loading loading-ring loading-sm"></span>
                        :
                        <div>
                            {
                                currentUser ?
                                    <div className="flex justify-end items-center gap-3">
                                        <img src={currentUser?.photoURL} alt="" className="w-[35px] h-[35px] bg-cover rounded-[50%]" />
                                        <p className="font-body text-white text-[16px]">{currentUser?.displayName}</p>
                                        <button onClick={handleSignOut}
                                            className="bg-second uppercase text-white px-3 py-1 text-[14px] font-body hover:bg-white hover:text-black duration-500 font-medium">Sign out</button>
                                    </div>
                                    :
                                    <Link to={"/signIn"}><button className="bg-second uppercase text-white px-3 py-1 text-[14px] font-body hover:bg-white hover:text-black duration-500">Sign In</button></Link>
                            }
                        </div>
                }


                {/* show dashboard button or cart button if user is admin */}
                {
                    user ?
                        <>
                            {
                                userPending || cartItemsPending ?
                                    <p className="text-lightWhite text-[14px] font-body">Loading...</p>
                                    :
                                    <>
                                        {
                                            user?.userType === "admin" ?
                                                <Link to={"/dashboard"}><button className="uppercase font-medium text-white px-1 py-1 text-[14px] font-body duration-500 menu-link">Dashboard</button></Link>
                                                :
                                                <Link to={"/myCart"}>
                                                    <div className="indicator">
                                                        {cartItems.length > 0 ?
                                                            <span className="indicator-item text-[12px] rounded-[50%] w-[20px] h-[20px] flex justify-center items-center bg-[#d10404] text-white font-body font-medium">{cartItems.length}</span> : ""}
                                                        <button className="uppercase font-medium text-white p-1 font-body hover:text-second duration-500"> <IoBagHandle className="text-[30px]" /></button>
                                                    </div>
                                                </Link>
                                        }
                                    </>
                            }
                        </>
                        :
                        ""
                }
            </div>

            {/* lower side heading */}
            <div className="navbar bg-[#ffffff00] w-full flex justify-between items-center">

                {/* logo + small device toggle icon */}
                <div className="w-[40%] lg:w-[30%] flex justify-start items-center gap-2">
                    <div className="dropdown lg:hidden">
                        <div tabIndex={0} role="button">
                            <FaBarsStaggered className="text-xl" />
                        </div>
                        <ul tabIndex={0} className="menu menu-sm space-y-3 text-[18px] dropdown-content mt-5 z-[1] p-5 shadow w-52 font-body bg-black">
                            {navMenu}
                        </ul>
                    </div>
                    <Link to={"/"}><img src={logo} alt="website logo" className="w-full md:w-[50%] lg:w-[65%] cursor-pointer hover:scale-110 duration-500" /></Link>
                </div>

                {/* navigation menu for larger device */}
                <div className="hidden lg:flex w-0 lg:w-[50%] font-body justify-center items-center gap-8">
                    {navMenu}
                </div>


                <div className="w-[60%] lg:w-[20%] justify-end items-center">
                    <Link to={"/findATable"}><ButtonSecond buttonText={"Find A Table"} /></Link>
                </div>
            </div>
        </nav>
    );
};

export default Header;