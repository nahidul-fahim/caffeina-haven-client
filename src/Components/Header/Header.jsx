import { Link, NavLink } from "react-router-dom";
import ButtonSecond from "../ButtonSecond/ButtonSecond";
import { FaBarsStaggered } from "react-icons/fa6";
import useAuthContext from "../../Hooks/useAuthContext/useAuthContext";
import { Spinner } from "keep-react";



// website logo
const logo = "https://i.ibb.co/sR7yV2c/website-Logo.png";

const Header = () => {

    // hooks and custom hooks
    const { currentUser, authLoading, signOutUser } = useAuthContext();


    // navigation menu
    const navMenu =
        <>
            <NavLink>Home</NavLink>
            <NavLink>About</NavLink>
            <NavLink>Contact</NavLink>
            <NavLink>Story Hub</NavLink>
        </>


    // user sign out
    const handleSignOut = () => {
        signOutUser();
    }




    return (
        <nav className="container mx-auto absolute z-[99] flex flex-col justify-between items-center px-5 gap-0 overflow-x-hidden">
            {/* upper side heading */}
            <div className="w-full py-2 flex justify-end items-center border-b-[1px] border-[#ffffff21]">
                {
                    authLoading ? <Spinner className="text-second" size="sm" />
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


            </div>



            {/* bottom side heading */}
            <div className="w-full flex justify-between items-center py-2">

                {/* logo */}
                <div className="w-2/5 lg:w-1/5 flex justify-start items-center">
                    <img src={logo} alt="website logo" className="w-[80%] md:w-[50%] lg:w-[65%]" />
                </div>

                {/* nav menu */}
                <div className="w-3/5 hidden lg:flex justify-center items-center gap-8 font-body">
                    {navMenu}
                </div>

                {/* button */}
                <div className="hidden w-1/5 lg:flex justify-end items-center">
                    <ButtonSecond buttonText={"Find A Table"} />
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