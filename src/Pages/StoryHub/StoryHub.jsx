import { FaCamera } from "react-icons/fa6";
import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";
import { useRef, useState } from "react";
import useCurrentUser from "../../Hooks/useCurrentUser/useCurrentUser";
import { Link } from "react-router-dom";
import ButtonMain from "../../Components/ButtonMain/ButtonMain";
import useFailedToast from "../../Hooks/useFailedToast/useFailedToast";
import useSuccessToast from "../../Hooks/useSuccessToast/useSuccessToast";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingAnimation from "../../Components/LoadingAnimation/LoadingAnimation";
import SingleMemory from "./SingleMemory";
import PinnedMemory from "./PinnedMemory";
import { motion } from "framer-motion"
import useUpAnimation from "../../Hooks/useUpAnimation/useUpAnimation";
import useRightAnimation from "../../Hooks/useRightAnimation/useRightAnimation";


const bgImg = "https://i.ibb.co/fdNsdhd/coffee-bg-1.jpg";
// image hosting (imgBB) key and url
const imgHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY
const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`

const StoryHub = () => {


    // hooks and custom hooks
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [selectedImage, setSelectedImage] = useState(null);
    const { userPending, user } = useCurrentUser();
    const failedToast = useFailedToast();
    const successToast = useSuccessToast();
    const postMemoryForm = useRef(null);
    const upAnimation = useUpAnimation();
    const rightAnimation = useRightAnimation();



    // get all the posted memories
    const { isPending: memoriesPending, data: allMemories, refetch: memoriesRefetch } = useQuery({
        queryKey: ["all-memories"],
        queryFn: async () => {
            const res = await axiosPublic.get("/getAllMemoriesApi")
            return res.data;
        }
    })


    // image input and get the file name
    const handleImageInput = e => {
        e.preventDefault();
        const fileInput = e.target;
        if (fileInput.files.length > 0) {
            const file = { image: fileInput.files[0] }
            setSelectedImage(file)
        }
        else {
            setSelectedImage(null)
        }
    }


    // display the selected image
    const renderSelectedImage = () => {
        if (selectedImage) {
            const imageUrl = URL.createObjectURL(selectedImage.image);
            return (
                <div>
                    <img
                        src={imageUrl}
                        alt="Selected"
                        className="w-[80px] h-[80px] bg-cover object-cover rounded-md"
                    />
                </div>
            );
        }
    };


    // get time and date
    const currentTime = new Date().toLocaleTimeString();
    const todayDate = new Date().toDateString();


    // post new user memories to database
    const handlePostNewMemory = e => {
        e.preventDefault();
        const form = e.target;
        const userPost = form.userPost.value;
        const postDate = todayDate;
        const postTime = currentTime;
        const userId = user?._id;
        const userName = user?.userName;
        const userEmail = user?.userEmail;
        const userType = user?.userType;
        const userImage = user?.photo;


        // call the function after the post image value is set
        const handleDbPost = (postedImage) => {
            const postImage = postedImage;
            // get the info in an object
            const newPostInfo = { userPost, postImage, postDate, postTime, userId, userName, userEmail, userType, userImage };

            //send the data to database
            axiosSecure.post("/postNewMemoryApi", newPostInfo)
                .then(res => {
                    if (res.data.insertedId) {
                        memoriesRefetch();
                        successToast("Posted successfully!");
                        postMemoryForm.current.reset();
                        setSelectedImage(null);
                    }
                })
                // db post error
                .catch(err => failedToast(err.code))
        }


        if (selectedImage) {
            axiosPublic.post(imgUploadUrl, selectedImage, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
                .then(res => {
                    if (res.data) {
                        handleDbPost(res.data.data.display_url);
                    }
                })
        }
        else {
            handleDbPost("no-image");
        }
    }



    // conditional loading
    if (memoriesPending || userPending) {
        return <LoadingAnimation />
    }



    return (
        <div className="mx-auto overflow-x-hidden">
            {/* page heading section */}
            <div
                className="h-[400px] md:h-[450px] lg:h-[500px] flex flex-col justify-center items-center gap-4"
                style={{
                    background: `linear-gradient(to top, #000000a6, #000000a6), url(${bgImg})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }}>
                {/* post form for user to post something */}
                {
                    user ?
                        <motion.div
                            variants={upAnimation(1.5, 0.3)}
                            initial="hidden"
                            whileInView={"visible"}
                            className="mt-[100px] bg-[#0e0e0e77] rounded-[10px] w-[95%] lg:w-[750px] flex flex-col justify-start items-center p-5 gap-2 font-body">
                            <h1 className="text-xl text-center uppercase md:text-2xl font-heading">Share Your Thoughts</h1>

                            {/* message and image post */}
                            {
                                user?.userStatus === "blocked" ?
                                    <p className="mt-4 text-center text-[#e65858] md:text-2xl font-body">You are blocked from posting anything</p>
                                    :
                                    <form onSubmit={handlePostNewMemory} ref={postMemoryForm}
                                        className="w-full flex flex-col justify-center items-center gap-2">

                                        {/* message + image */}
                                        <div className="w-full flex justify-center items-center gap-2 md:gap-5">
                                            {/* message input */}
                                            <textarea required name="userPost" placeholder="Reveal your thoughts" maxLength={250} id="userPost" className="w-[90%] border-[1px] border-[#ffffff00] bg-[#f0f0f021] focus:outline-none focus:border-lightBlack px-3 py-1 text-[16px] rounded-[5px]" />
                                            {/* image file input */}
                                            <label
                                                htmlFor="image"
                                                className="cursor-pointer relative focus:outline-none bg-[#f0f0f021] w-[50px] h-[50px] rounded-[5px] p-2 transition-all duration-500 text-white flex justify-center items-center gap-2 text-2xl"
                                            >
                                                <FaCamera />
                                                <input
                                                    type="file"
                                                    name="postImage"
                                                    id="postImage"
                                                    accept="image/*"
                                                    onChange={handleImageInput}
                                                    className="cursor-pointer opacity-0 absolute top-0 right-0 w-[50px] h-[50px]" />
                                            </label>
                                        </div>

                                        {/* show image and submit button */}
                                        <div className="w-full flex justify-start items-center gap-3">
                                            {/* show selected image */}
                                            {
                                                selectedImage ? <>{renderSelectedImage()}</> : ""
                                            }
                                            <input type="submit" value="Share" className="bg-second text-white px-4 py-1 hover:bg-white hover:text-black duration-500 cursor-pointer rounded-[3px]" />
                                        </div>
                                    </form>
                            }
                        </motion.div>
                        :
                        <div className="flex flex-col gap-4 justify-center items-center p-5 bg-[#0e0e0e77] mt-[100px]">
                            <p className="text-2xl md:text-3xl text-center font-heading text-white">Please sign in to share your thoughts</p>
                            <Link to={"/signIn"}><ButtonMain buttonText={"Sign in"} /></Link>
                        </div>
                }
            </div>



            {/* page content section */}
            <div className="container mx-auto p-5 flex flex-col lg:flex-row justify-center items-start gap-10 mt-10 min-h-[100vh] overflow-y-auto">

                {/* pinned memories shortcut */}
                <motion.div
                    variants={rightAnimation(.8, 0.5)}
                    initial="hidden"
                    whileInView={"visible"}
                    className="w-full lg:w-1/5 flex flex-col justify-start items-start gap-4 py-5 sticky-div">
                    <h3 className="font-heading text-xl text-white uppercase">Pinned</h3>
                    <div className="w-full grid grid-cols-4 md:grid-cols-6 lg:grid-cols-2">
                        {
                            allMemories.map((memory, index) => <PinnedMemory key={index} memory={memory}></PinnedMemory>)
                        }
                    </div>
                </motion.div>


                {/* show memories */}
                <div className="w-[98%] lg:w-4/5 flex flex-col justify-start items-start gap-14">
                    {
                        allMemories.map((memory, index) => <SingleMemory key={index} memory={memory} memoriesRefetch={memoriesRefetch}></SingleMemory>)
                    }
                </div>


            </div>

        </div>
    );
};

export default StoryHub;