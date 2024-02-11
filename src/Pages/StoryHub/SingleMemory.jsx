import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import useCurrentUser from "../../Hooks/useCurrentUser/useCurrentUser";
import useSuccessToast from "../../Hooks/useSuccessToast/useSuccessToast";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";


const SingleMemory = ({ memory, memoriesRefetch }) => {

    // hooks
    const { user } = useCurrentUser();
    const axiosSecure = useAxiosSecure();
    const successToast = useSuccessToast();

    const { userPost, postImage, postDate, postTime, userName, userType, userImage, _id, pinnedStatus, likeCount, likedBy } = memory;


    const likeCheckByUser = Array.isArray(likedBy) && likedBy.includes(user?._id) || false;


    // handle pin or unpin a post
    const handlePinPost = (id, pinUpdate) => {
        const pinnedStatus = pinUpdate;
        const pinUpdateInfo = { pinnedStatus };
        let pinMessage = '';
        pinUpdate === 'unpin' ? pinMessage = "Unpinned!" : pinMessage = "Pinned!"

        axiosSecure.put(`/postInteractApi/${id}`, pinUpdateInfo)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    memoriesRefetch();
                    successToast(pinMessage)
                }
            })
    }

    // like or dislike post
    const handlePostLike = (id, likStatus) => {
        const likeUpdate = likStatus;
        const likedPerson = user?._id;
        const updatedLikeInfo = { likeUpdate, likedPerson };

        axiosSecure.put(`/postInteractApi/${id}`, updatedLikeInfo)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    memoriesRefetch();
                }
            })
    }





    return (
        <div id={_id} className={`w-full bg-third p-8 md:p-10 relative flex flex-col justify-start items-start gap-4 font-body group rounded-[10px]`}>
            <img src={userImage} alt={`${userName}'s image`} className="w-[60px] h-[60px] absolute top-[-20px] left-[-20px] rounded-[50%]" />
            <h4 className="text-xl font-body ml-4">
                {userName} {userType === "admin" ? <span className="capitalize text-white bg-lightBlack rounded-[30px] px-2 py-1 text-[16px]">{userType}</span> : ""}
            </h4>

            {/* show image if available */}
            <p className="text-lightWhite">{userPost}</p>
            {
                postImage !== "no-image" ?
                    <img src={postImage} alt="post image" className="max-w-[250px] max-h-[150px] md:max-w-[300px] md:max-h-[200px] bg-cover object-contain rounded"></img>
                    :
                    ""
            }

            {/* date and time */}
            <p className="text-lightBlack absolute bottom-2 right-2 text-[14px]">{postDate} || {postTime}</p>


            {/* admin post pin option */}
            {
                user?.userType === "admin" && pinnedStatus !== "pin" ? <button onClick={() => handlePinPost(_id, "pin")} className="opacity-0 group-hover:opacity-100 absolute top-3 right-3 text-2xl duration-300">📌</button> : ""
            }
            {
                user?.userType === "admin" && pinnedStatus !== "unpin" ? <button onClick={() => handlePinPost(_id, 'unpin')} className="absolute top-3 right-3 text-2xl duration-300 rotate-[-45deg]">📌</button> : ""
            }
            {
                user?.userType !== "admin" && pinnedStatus === "pin" ? <p className="absolute top-3 right-3 text-2xl duration-300 rotate-[-45deg]">📌</p> : ""
            }

            {/* post like and remove like button */}
            {
                likeCheckByUser ?
                    <button onClick={() => handlePostLike(_id, 'removeLike')}
                        className="text-2xl font-body absolute bottom-[-18px] left-5 flex justify-center items-center gap-2">
                        <FcLike /> <span className="text-[16px] text-white">{likeCount || 0}</span>
                    </button>
                    :
                    <button onClick={() => handlePostLike(_id, 'like')}
                        className="text-2xl font-body absolute bottom-[-18px] left-5 flex justify-center items-center gap-2">
                        <FcLikePlaceholder /> <span className="text-[16px] text-white">{likeCount || 0}</span>
                    </button>
            }


        </div>
    );
};

export default SingleMemory;