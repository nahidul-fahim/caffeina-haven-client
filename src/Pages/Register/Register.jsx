import { useRef, useState } from "react";
import CenteredSectionTitle from "../../Components/CenteredSectionTitle/CenteredSectionTitle";
import { FaUpload } from "react-icons/fa";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { MdHome } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuthContext from "../../Hooks/useAuthContext/useAuthContext";
import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";
import useSuccessToast from "../../Hooks/useSuccessToast/useSuccessToast";
import useFailedToast from "../../Hooks/useFailedToast/useFailedToast";


// background image
const img1 = "https://i.ibb.co/FWDxTW1/restaurant.jpg";

// imgBB hosting
const imgHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY
const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`



const Register = () => {

    // hooks and custom hooks
    const [selectedImageName, setSelectedImageName] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
    const { createNewUser, updateUserProfile } = useAuthContext();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();
    const registerForm = useRef(null);
    const successToast = useSuccessToast();
    const failedToast = useFailedToast();


    // handle show password
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }


    // image input and get the file name
    const handleImageInput = e => {
        e.preventDefault();
        const fileInput = e.target;
        if (fileInput.files.length > 0) {
            const file = { image: fileInput.files[0] }
            const fileName = fileInput.files[0].name;
            setSelectedImageName(fileName);
            setSelectedImage(file)
        }
        else {
            setSelectedImageName('')
        }
    }


    // get today's date
    const todayDate = new Date().toDateString().slice(4);



    // sign up functionality
    const handleRegister = e => {
        e.preventDefault();

        // if selected image file is available, upload the image to imgBB
        if (selectedImage) {
            axiosPublic.post(imgUploadUrl, selectedImage, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
                .then(res => {
                    // if image file is uploaded proceed to the further procedures
                    if (res.data) {

                        // get the data from form
                        const userName = e.target.userName.value;
                        const email = e.target.userEmail.value;
                        const password = e.target.password.value;
                        const photo = res.data.data.display_url;
                        const userCreationDate = todayDate;
                        const userType = "user";

                        // insert the form data into an object
                        const newUserInfo = { userName, email, photo, userCreationDate, userType }


                        // regular expression for password
                        const regExPattern = /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/;
                        setPasswordErrorMessage();

                        // password validation
                        if (!regExPattern.test(password)) {
                            setPasswordErrorMessage("Password should be minimum 6 characters, contain at least 1 capital letter & 1 special character");
                            return;
                        }

                        // create new user function
                        createNewUser(email, password)
                            .then(result => {
                                // if new user is created send the data to database
                                if (result.user) {
                                    const currentUsersInfo = result.user;
                                    // post the new user data to database
                                    axiosPublic.post("/createNewUser", newUserInfo)
                                        .then(res => {
                                            const data = res.data;
                                            if (data.insertedId) {
                                                successToast('Account creation successful!')
                                                updateUserProfile(currentUsersInfo, userName, photo)
                                                registerForm.current.reset();
                                                setSelectedImageName('');
                                                navigate(location?.state ? location.state : "/")
                                            }
                                        })
                                        // database post error
                                        .catch(err => {
                                            const error = err.code;
                                            failedToast(error)
                                        })
                                }
                            })
                            // firebase account creation error
                            .catch(error => {
                                failedToast(error)
                            });
                    }
                })
                // imgBb file upload error
                .catch(err => failedToast(err.code));
        }
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
                <CenteredSectionTitle smallText={"Free Registration"} bigText={"Join Caffeina Now"} />

                {/* registration form */}
                <form onSubmit={handleRegister} ref={registerForm}
                    className="mt-5 md:mt-8 w-full md:w-2/4 lg:w-1/3 flex flex-col justify-center items-center gap-5 font-body">

                    {/* name input */}
                    <input required type="text" name="userName" id="userName" placeholder="Your Name" className="w-full bg-[#00000000] border-b-[1px] px-5 py-3 border-lightBlack focus:outline-none focus:border-white text-lightWhite" />

                    {/* email input */}
                    <input required type="email" name="userEmail" id="userEmail" placeholder="Your Email" className="w-full bg-[#00000000] border-b-[1px] px-5 py-3 border-lightBlack focus:outline-none focus:border-white text-white" />

                    {/* password input */}
                    <div className="w-full">
                        <div className="flex relative w-full justify-center items-center">
                            <input required type={showPassword ? "text" : "password"} name="password" placeholder="Password" id="password" className="w-full bg-[#00000000] border-b-[1px] px-5 py-3 border-lightBlack focus:outline-none focus:border-white text-white" />
                            <span onClick={handleShowPassword} className="absolute right-2 text-lightWhite"> {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />} </span>
                        </div>
                        {
                            passwordErrorMessage ? <p className="text-[14px] font-regular text-[#c73c3c]">{passwordErrorMessage}</p> : ''
                        }
                    </div>

                    {/* image file input */}
                    <label
                        htmlFor="image"
                        className="cursor-pointer bg-[#00000000] relative focus:outline-none border-b-[1px] px-5 py-3 border-lightBlack focus:border-white transition-all duration-500 w-full text-[#9CA3AF] flex justify-start items-center gap-2"
                    >
                        <FaUpload className="text-[#9CA3AF]" /> {selectedImageName.length > 25 ? selectedImageName.slice(0, 25) + "...." : selectedImageName || "Choose your profile picture"}
                        <input
                            type="file"
                            name="image"
                            id="image"
                            accept="image/*"
                            onChange={handleImageInput}
                            className="cursor-pointer opacity-0 absolute top-0 left-0 w-full" />
                    </label>

                    {/* submit button */}
                    <input type="submit" value="Register now" className="w-full bg-second text-white px-5 py-2 hover:bg-third duration-500 cursor-pointer" />
                </form>

                {/* login page toggle */}
                <div className="mt-5 flex justify-center items-center gap-4">
                    <p className="text-center font-medium text-lightWhite">Already have an account?</p>
                    <Link to="/signIn" className="font-semibold text-white border-b-2 border-white hover:text-second py-1 hover:border-second duration-300">Sign In</Link>
                </div>

                {/* back to homepage button */}
                <Link to="/" className="absolute top-10 left-5 lg:left-10 flex justify-center items-center gap-2 text-[18px] font-body hover:text-second duration-500 hover:scale-105"><MdHome />Back to Home</Link>

            </div>

        </div>
    );
};

export default Register;