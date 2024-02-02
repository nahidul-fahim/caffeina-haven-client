

const SingleMenuList = ({ singleMenu }) => {

    // get data from singleMenu
    const { addedBy, addedOn, adderEmail, adderImage, foodOrigin, itemCategory, itemDescription, itemImage, itemName, itemPrice, _id } = singleMenu;

    // get today's date
    const todayDate = new Date().toDateString().slice(4);


    return (
        <div className="w-full flex justify-start items-center gap-4">

            <img src={itemImage} alt={`${itemName}'s image`} className="w-[75px] h-[75px] bg-cover" />


            <div className="flex flex-col justify-center items-start gap-1 w-full">

                <div className="flex justify-start items-center gap-7 w-full">
                    <h3 className="font-heading text-2xl text-white">{itemName}</h3>
                    {
                        todayDate === addedOn ? <p className="text-[14px] text-second ml-[-20px] font-body font-medium">NEW</p> : ""
                    }
                    <div className="h-[7px] border-y-[1px] border-[#333333] flex-1"></div>
                    <p className="font-body text-xl text-white">${itemPrice}</p>
                </div>
                <p className="text-left font-body text-[16px] text-lightWhite">{itemDescription}</p>

            </div>
        </div>
    );
};

export default SingleMenuList;