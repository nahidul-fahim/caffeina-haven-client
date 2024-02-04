import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import useCurrentUser from "../../Hooks/useCurrentUser/useCurrentUser";
import useSuccessToast from "../../Hooks/useSuccessToast/useSuccessToast";


const PinnedMemory = ({ memory, memoriesRefetch }) => {

    // hooks
    const { user } = useCurrentUser();
    const axiosSecure = useAxiosSecure();
    const successToast = useSuccessToast();

    const { userPost, postImage, postDate, postTime, userName, userType, userImage, _id, pinnedStatus } = memory;


    // handle pin or unpin a post
    const handlePinPost = (id, pinUpdate) => {
        const pinnedStatus = pinUpdate;
        const pinUpdateInfo = { pinnedStatus };
        let pinMessage = null;
        pinUpdate === null ? pinMessage = "Unpinned!" : pinMessage = "Pinned!"

        axiosSecure.put(`/pinAPostApi/${id}`, pinUpdateInfo)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    memoriesRefetch();
                    successToast(pinMessage)
                }
            })
    }



    return (
        <div className="w-full">
            {
                pinnedStatus === "pinned" ?
                    <div className={`w-full bg-third p-8 md:p-10 relative flex flex-col justify-start items-start gap-4 font-body group border-2`}>
                        <img src={userImage} alt={`${userName}'s image`} className="w-[60px] h-[60px] absolute top-[-20px] left-[-20px] rounded-[50%]" />
                        <h4 className="text-xl font-body ml-4">
                            {userName} {userType === "admin" ? <span className="capitalize text-white bg-second px-2 py-1 text-[16px]">{userType}</span> : ""}
                        </h4>

                        {/* show image if available */}
                        <p className="text-lightWhite">{userPost}</p>
                        {
                            postImage !== "no-image" ?
                                <img src={postImage} alt="post image" className="max-w-[250px] max-h-[150px] md:max-w-[300px] md:max-h-[200px] bg-cover object-contain"></img>
                                :
                                ""
                        }

                        {/* date and time */}
                        <p className="text-lightBlack absolute bottom-2 right-2 text-[14px]">{postDate} || {postTime}</p>

                        {/* admin pin option */}
                        {
                            user?.userType === "admin" && pinnedStatus !== "pinned" ? <button onClick={() => handlePinPost(_id, "pinned")} className="opacity-0 group-hover:opacity-100 absolute top-3 right-3 text-2xl duration-300">📌</button> : ""
                        }
                        {
                            pinnedStatus ? <button onClick={() => handlePinPost(_id, null)} className="absolute top-3 right-3 text-2xl duration-300 rotate-[-45deg]">📌</button> : ""
                        }
                    </div>
                    :
                    ""
            }
        </div>

    );
};

export default PinnedMemory;