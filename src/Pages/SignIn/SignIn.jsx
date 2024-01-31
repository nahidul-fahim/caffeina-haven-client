import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { MdHome } from "react-icons/md";
import { Link } from "react-router-dom";
import CenteredSectionTitle from "../../Components/CenteredSectionTitle/CenteredSectionTitle";
import { useState } from "react";


const img1 = "https://i.ibb.co/FWDxTW1/restaurant.jpg";

const SignIn = () => {

    // hooks and custom hooks
    const [showPassword, setShowPassword] = useState(false);


    // handle show password
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }



    return (
        <div className="min-h-[100vh] flex justify-center items-center"
            style={{
                background: `linear-gradient(to bottom, #000000c2, #000000a8), url(${img1})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed'
            }}>
            <div className="container mx-auto py-[100px] md:py-10 px-5 lg:p-10 flex flex-col justify-center items-center gap-5">
                <CenteredSectionTitle smallText={"Sign In"} bigText={"Welcome Back"} />

                {/* registration form */}
                <form className="mt-5 md:mt-8 w-full md:w-2/4 lg:w-1/3 flex flex-col justify-center items-center gap-5 font-body">

                    {/* email input */}
                    <input required type="email" name="userEmail" id="userEmail" placeholder="Your Email" className="w-full bg-[#00000000] border-b-[1px] px-5 py-3 border-lightBlack focus:outline-none focus:border-white text-white" />

                    {/* password input */}
                    <div className="w-full">
                        <div className="flex relative w-full justify-center items-center">
                            <input required type={showPassword ? "text" : "password"} name="password" placeholder="Password" id="password" className="w-full bg-[#00000000] border-b-[1px] px-5 py-3 border-lightBlack focus:outline-none focus:border-white text-white" />
                            <span onClick={handleShowPassword} className="absolute right-2 text-lightWhite"> {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />} </span>
                        </div>
                        {/* {
                            passwordErrorMessage ? <p className="text-[14px] font-regular text-[#c73c3c]">{passwordErrorMessage}</p> : ''
                        } */}
                    </div>


                    {/* submit button */}
                    <input type="submit" value="Register now" className="w-full bg-second text-white px-5 py-2 hover:bg-third duration-500 cursor-pointer" />
                </form>

                {/* login page toggle */}
                <div className="mt-5 flex justify-center items-center gap-4">
                    <p className="text-center font-medium text-lightWhite">Not registered yet?</p>
                    <Link to="/register" className="font-semibold text-white border-b-2 border-white hover:text-second py-1 hover:border-second duration-300">Register</Link>
                </div>

                {/* back to homepage button */}
                <Link to="/" className="absolute top-10 left-5 lg:left-10 flex justify-center items-center gap-2 text-[18px] font-body hover:text-second duration-500 hover:scale-105"><MdHome />Back to Home</Link>

            </div>

        </div>
    );
};

export default SignIn;