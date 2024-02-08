import { IoBagHandle } from "react-icons/io5";
import useCurrentUser from "../../Hooks/useCurrentUser/useCurrentUser";
import useFailedToast from "../../Hooks/useFailedToast/useFailedToast";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import useSuccessToast from "../../Hooks/useSuccessToast/useSuccessToast";
import useCartItems from "../../Hooks/useCartItems/useCartItems";



const SingleMenuList = ({ singleMenu }) => {

    // get data from singleMenu
    const { addedOn, itemDescription, itemImage, itemName, itemPrice, _id } = singleMenu;


    // hooks
    const { userPending, user } = useCurrentUser();
    const axiosSecure = useAxiosSecure();
    const failedToast = useFailedToast();
    const successToast = useSuccessToast();
    const { cartItemsRefetch } = useCartItems();


    // get today's date
    const todayDate = new Date().toDateString().slice(4);


    // handle add to cart
    const handleAddToCart = id => {
        if (!user || userPending) {
            return failedToast("Please sign in first!")
        }

        const buyerName = user?.userName;
        const buyerEmail = user?.userEmail;
        const buyerId = user?._id;
        const foodImage = itemImage;
        const foodName = itemName;
        const foodPrice = itemPrice;
        const foodId = id;
        const orderPlacingStatus = "pending";

        const newOrderedFoodInfo = { buyerName, buyerEmail, buyerId, foodImage, foodName, foodPrice, foodId, orderPlacingStatus };

        axiosSecure.post("/newOrderApi", newOrderedFoodInfo)
            .then(res => {
                if (res.data.insertedId) {
                    successToast("Added to cart!")
                    cartItemsRefetch();
                }
            })
            .catch(err => failedToast(err.code))
    }





    return (
        <div className="w-full flex justify-start items-center gap-4">

            <img src={itemImage} alt={`${itemName}'s image`} className="w-[75px] h-[75px] bg-cover" />


            <div className="flex flex-col justify-center items-start gap-1 w-full">

                <div className="flex justify-start items-center gap-2 md:gap-7 w-full">
                    <h3 className="font-heading text-xl md:text-2xl text-white max-w-fit">{itemName}</h3>
                    {
                        todayDate === addedOn ? <p className="text-[12px] md:text-[14px] text-second ml-[-5px] md:ml-[-20px] font-body font-medium">NEW</p> : ""
                    }
                    <div className="h-[7px] border-y-[1px] border-[#333333] flex-1"></div>
                    <p className="font-body text-[18px] md:text-xl text-white">${itemPrice}</p>
                </div>
                <div className="flex justify-between items-center gap-4 w-full">

                    {/* item description */}
                    <p className="text-left font-body text-[16px] text-lightWhite">{itemDescription}</p>

                    {/* add to cart button */}
                    <button onClick={() => handleAddToCart(_id)}
                        className="text-second p-1 rounded-[50%] text-[20px] hover:text-white duration-500 flex justify-center items-center">
                        <IoBagHandle />
                    </button>
                </div>

            </div>
        </div>
    );
};

export default SingleMenuList;