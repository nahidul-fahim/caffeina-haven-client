import { Link } from "react-router-dom";
import ButtonMain from "../../Components/ButtonMain/ButtonMain";
import useCartItems from "../../Hooks/useCartItems/useCartItems";
import { useEffect } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import useFailedToast from "../../Hooks/useFailedToast/useFailedToast";


const CheckoutSuccess = () => {

    // hooks
    const axiosSecure = useAxiosSecure();
    const { cartItemsPending, cartItems, cartItemsRefetch } = useCartItems();
    const failedToast = useFailedToast();


    useEffect(() => {
        if (!cartItemsPending) {
            const allItemIds = cartItems.map(item => item._id);
            const allItems = { allItemIds };
            axiosSecure.post("/deleteCartItemsAfterPaymentApi", allItems)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        cartItemsRefetch();
                    }
                })
                .catch(err => failedToast(err.code))
        }
    }, [cartItemsPending, cartItems, axiosSecure, cartItemsRefetch, failedToast])



    return (
        <div className="min-h-screen flex flex-col justify-center items-center gap-5">
            <h2 className="font-heading text-4xl text-center text-[#19df19]">Payment Successful!</h2>
            <Link to={"/"}><ButtonMain buttonText={"Back to Home"} /></Link>
        </div>
    );
};

export default CheckoutSuccess;