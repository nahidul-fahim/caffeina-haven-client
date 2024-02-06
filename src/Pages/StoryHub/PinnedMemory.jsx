

const PinnedMemory = ({ memory }) => {


    const { postDate, userImage, _id, pinnedStatus } = memory;



    return (
        <>
            {
                pinnedStatus === "pin" ?
                    <div className={`w-fit flex flex-col justify-center items-center gap-3 lg:gap-4 font-body`}>
                        <p className="text-lightBlack text-center text-[14px]">{postDate}</p>
                        <a href={`#${_id}`}>
                            <img src={userImage} alt="" className="w-[60px] h-[60px] rounded-[50%]" />
                        </a>
                    </div>
                    :
                    ""
            }
        </>

    );
};

export default PinnedMemory;