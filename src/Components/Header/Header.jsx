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
        <nav className="container mx-auto absolute top-0 z-[99] flex flex-col justify-between items-center px-5 gap-0 overflow-x-hidden">
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
                                    <p className="text-lightWhite font-body">Loading...</p>
                                    :
                                    <>
                                        {
                                            user?.userType === "admin" ?
                                                <Link to={"/dashboard"}><button className="bg-white uppercase font-medium text-main px-3 py-1 text-[14px] font-body hover:bg-main hover:text-white duration-500">Dashboard</button></Link>
                                                :
                                                <Link to={"/myCart"}>
                                                    <div className="indicator">
                                                        {cartItems.length > 0 ?
                                                            <span className="indicator-item text-[14px] rounded-[50%] w-[22px] h-[22px] flex justify-center items-center bg-[#d10404] text-white font-body font-medium">{cartItems.length}</span> : ""}
                                                        <button className="bg-white uppercase font-medium text-main px-3 py-1 text-[14px] font-body hover:bg-main hover:text-white duration-500 flex justify-center items-center gap-2">My Cart <IoBagHandle className="text-[18px]" /></button>
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



            {/* bottom side heading */}
            <div className="w-full flex justify-between items-center py-2">

                {/* logo */}
                <div className="w-2/5 lg:w-1/5 flex justify-start items-center">
                    <Link to={"/"}><img src={logo} alt="website logo" className="w-[80%] md:w-[50%] lg:w-[65%] cursor-pointer hover:scale-110 duration-500" /></Link>
                </div>

                {/* nav menu */}
                <div className="w-3/5 hidden lg:flex justify-center items-center gap-8 font-body">
                    {navMenu}
                </div>

                {/* reservation button */}
                <div className="hidden w-1/5 lg:flex justify-end items-center">
                    <Link to={"/findATable"}><ButtonSecond buttonText={"Find A Table"} /></Link>
                </div>

                {/* smaller device nav menu icon */}
                <div className="w-3/5 flex lg:hidden justify-end items-center">
                    <FaBarsStaggered className="text-2xl" />
                </div>


            </div>

        </nav>
    );
};

export default Header;