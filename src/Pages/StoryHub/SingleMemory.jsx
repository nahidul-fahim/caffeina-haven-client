

const SingleMemory = ({ memory }) => {

    const { userPost, postImage, postDate, postTime, userName, userType, userImage } = memory;

    return (
        <div className="w-full bg-third p-8 md:p-10 relative flex flex-col justify-start items-start gap-4 font-body">
            <img src={userImage} alt={`${userName}'s image`} className="w-[60px] h-[60px] absolute top-[-20px] left-[-20px] rounded-[50%]" />
            <h4 className="text-xl font-body ml-4">
                {userName} {userType === "admin" ? <span className="capitalize text-white bg-second px-2 py-1 text-[16px]">{userType}</span> : ""}
            </h4>
            <p className="text-lightWhite">{userPost}</p>
            {
                postImage !== "no-image" ?
                    <img src={postImage} alt="post image" className="max-w-[300px] max-h-[200px] md:max-w-[400px] md:max-h-[300px] bg-cover object-contain"></img>
                    :
                    ""
            }

            {/* date and time */}
            <p className="text-lightBlack absolute bottom-2 right-2 text-[14px]">{postDate} || {postTime}</p>
        </div>
    );
};

export default SingleMemory;