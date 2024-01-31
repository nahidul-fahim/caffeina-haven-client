import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { MdHome } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CenteredSectionTitle from "../../Components/CenteredSectionTitle/CenteredSectionTitle";
import { useState } from "react";
import useAuthContext from "../../Hooks/useAuthContext/useAuthContext";
import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";
import useSuccessToast from "../../Hooks/useSuccessToast/useSuccessToast";
import useFailedToast from "../../Hooks/useFailedToast/useFailedToast";
import { FaGoogle } from "react-icons/fa";


const img1 = "https://i.ibb.co/FWDxTW1/restaurant.jpg";

const SignIn = () => {

    // hooks and custom hooks
    const [showPassword, setShowPassword] = useState(false);
    const { createNewUserByGoogle, signInUser } = useAuthContext();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const successToast = useSuccessToast();
    const failedToast = useFailedToast();


    // get todays date
    const todayDate = new Date().toDateString().slice(4);


    // Toggle between show password and hide password
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }


    //Login using email-password
    const handleSignIn = e => {
        e.preventDefault();
        const userEmail = e.target.userEmail.value;
        const password = e.target.password.value;
        signInUser(userEmail, password)
            .then(() => {
                successToast("Signed in successfully!")
                // Redirect to path after login
                navigate(location?.state ? location.state : "/")
            })
            .catch(error => {
                const errorCode = error.code;
                failedToast(errorCode)
            })
    }


    //sign in using Google 
    const handleGoogleSignIn = () => {
        createNewUserByGoogle()
            .then(result => {
                if (result) {

                    const data = result?.user;

                    // get the user info from google login
                    const name = data?.displayName;
                    const email = data?.email;
                    const userName = data?.displayName;
                    const photo = data?.photoURL;
                    const userCreationDate = todayDate;
                    const userType = "user";
                    const verifyStatus = "not verified";
                    const newUserInfo = { name, email, userName, photo, userCreationDate, userType, verifyStatus }


                    // post the new user data to database
                    axiosPublic.post("/createNewUser", newUserInfo)
                        .then(() => {
                            successToast("Successful!")
                            // Redirect to path after login
                            navigate(location?.state ? location.state : "/")
                        })
                        // database post error
                        .catch(err => {
                            const error = err.code;
                            failedToast(error)
                        })
                }

            })
            // firebase google-login error
            .catch(error => {
                failedToast(error.code)
            })
    };





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
                <form onSubmit={handleSignIn}
                    className="mt-5 md:mt-8 w-full md:w-2/4 lg:w-1/3 flex flex-col justify-center items-center gap-5 font-body">

                    {/* email input */}
                    <input required type="email" name="userEmail" id="userEmail" placeholder="Your Email" className="w-full bg-[#00000000] border-b-[1px] px-5 py-3 border-lightBlack focus:outline-none focus:border-white text-white" />

                    {/* password input */}
                    <div className="w-full">
                        <div className="flex relative w-full justify-center items-center">
                            <input required type={showPassword ? "text" : "password"} name="password" placeholder="Password" id="password" className="w-full bg-[#00000000] border-b-[1px] px-5 py-3 border-lightBlack focus:outline-none focus:border-white text-white" />
                            <span onClick={handleShowPassword} className="absolute right-2 text-lightWhite"> {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />} </span>
                        </div>
                    </div>


                    {/* submit button */}
                    <input type="submit" value="Sign In" className="w-full bg-second text-white px-5 py-2 hover:bg-third duration-500 cursor-pointer" />
                </form>


                {/* google button */}
                <button onClick={handleGoogleSignIn}
                    className="font-heading font-medium px-5 py-2 border-[1px] hover:bg-white hover:text-black duration-500 flex justify-center items-center gap-3 uppercase mt-2">
                    <FaGoogle /> Sign In Using Google
                </button>


                {/* login page toggle */}
                <div className="mt-2 flex justify-center items-center gap-4">
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