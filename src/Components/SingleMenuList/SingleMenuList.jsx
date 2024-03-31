import { IoBagHandle } from "react-icons/io5";
import useCurrentUser from "../../Hooks/useCurrentUser/useCurrentUser";
import useFailedToast from "../../Hooks/useFailedToast/useFailedToast";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import useSuccessToast from "../../Hooks/useSuccessToast/useSuccessToast";
import useCartItems from "../../Hooks/useCartItems/useCartItems";
import { useRef } from "react";



const SingleMenuList = ({ singleMenu }) => {

    // get data from singleMenu
    const { addedOn, itemDescription, itemImage, itemName, itemPrice, _id } = singleMenu;


    // hooks
    const { userPending, user } = useCurrentUser();
    const axiosSecure = useAxiosSecure();
    const failedToast = useFailedToast();
    const successToast = useSuccessToast();
    const { cartItemsRefetch } = useCartItems();
    const cartAddingForm = useRef(null);


    // get today's date
    const todayDate = new Date().toDateString().slice(4);


    // handle open modal
    const handleOpenModal = id => {
        document.getElementById(id).showModal()
    }


    // handle add to cart
    const handleAddToCart = e => {
        e.preventDefault();
        if (!user || userPending) {
            document.getElementById(_id).close();
            return failedToast("Please sign in first!");
        }

        const foodQuantity = parseInt(e.target.foodQuantity.value);
        const buyerName = user?.userName;
        const buyerEmail = user?.email;
        const buyerId = user?._id;
        const foodImage = itemImage;
        const foodName = itemName;
        const foodPrice = parseFloat(itemPrice);
        const foodId = _id;
        const orderPlacingStatus = "pending";

        const newOrderedFoodInfo = { buyerName, buyerEmail, buyerId, foodImage, foodName, foodPrice, foodId, orderPlacingStatus, foodQuantity };

        axiosSecure.post("/newOrderApi", newOrderedFoodInfo)
            .then(res => {
                if (res.data.insertedId) {
                    cartAddingForm.current.reset();
                    document.getElementById(_id).close();
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
                    <button disabled={user?.userType === "admin"} onClick={() => handleOpenModal(_id)}
                        className="text-second p-1 rounded-[50%] text-[20px] hover:text-white duration-500 flex justify-center items-center disabled:opacity-30 disabled:cursor-not-allowed">
                        <IoBagHandle />
                    </button>
                </div>

            </div>


            {/* cart adding modal */}
            <dialog id={_id} className="modal modal-bottom sm:modal-middle py-5">
                <div className="modal-box bg-third flex flex-col justify-center items-center gap-4 font-body border-[1px] border-dotted border-lightWhite">
                    <h3 className="font-medium text-3xl">Place your order</h3>
                    <div className="modal-action w-full flex justify-center items-start gap-5">

                        {/* show item details */}
                        <div className="w-1/2 flex flex-col justify-start items-start gap-3">
                            <img src={itemImage} alt="Item image" className="w-full rounded-lg" />
                            <h3 className="text-2xl font-medium font-heading">{itemName}</h3>
                        </div>

                        {/* item quantity details */}
                        <div className="w-1/2 flex flex-col justify-start items-start gap-5">

                            <p className="font-body font-semibold text-3xl text-second">${itemPrice}</p>

                            <form method="dialog" ref={cartAddingForm}
                                onSubmit={handleAddToCart}
                                className="w-full flex flex-col justify-start items-start gap-3">
                                {/* quantity */}
                                <label className="text-lightWhite">Quantity *</label>
                                <input required type="number" name="foodQuantity" id="foodQuantity" defaultValue={1} step={1} min={1} className="bg-main p-2 lg:p-4 w-[70px] lg:w-[90px] focus:outline-none" />
                                {/* submit button */}
                                <input type="submit" value="Add to Cart" className="w-full bg-second text-white px-4 py-3 hover:bg-white hover:text-black duration-500 cursor-pointer" />
                            </form>

                        </div>
                    </div>
                </div>
            </dialog>



        </div >
    );
};

export default SingleMenuList;