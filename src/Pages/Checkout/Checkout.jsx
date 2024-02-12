import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import useCartItems from "../../Hooks/useCartItems/useCartItems";
import LoadingAnimation from "../../Components/LoadingAnimation/LoadingAnimation";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckoutForm";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import useUpAnimation from "../../Hooks/useUpAnimation/useUpAnimation";

// bg image
const bgImg = "https://i.ibb.co/G2q3W6L/snezhana-hulak-TUc-AOOHd-Mek-unsplash-2.jpg";

// stripe
// TODO: ADD PUBLISHABLE KEY
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_Key);


const Checkout = () => {

    // hooks and custom hooks
    const upAnimation = useUpAnimation();
    const axiosSecure = useAxiosSecure();
    const location = useLocation();
    const { cartItemsPending, cartItems } = useCartItems();
    const [clientSecret, setClientSecret] = useState("");


    // get data from location state coming from my cart route
    const totalAmount = location.state?.totalAmount;
    const discountedAmount = location.state?.discountedAmount;
    const finalAmount = sessionStorage.getItem("final-amount")


    // post api to get payment intent from backend
    useEffect(() => {
        const price = { finalAmount }
        axiosSecure.post("/create-payment-intent", price)
            .then(res => {
                setClientSecret(res.data?.clientSecret)
            })
    }, [axiosSecure, finalAmount])

    // setting theme and options
    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };



    // conditional loading state
    if (cartItemsPending) {
        return <LoadingAnimation />
    }


    return (
        <div className="mx-auto">
            {/* page heading section */}
            <div
                className="h-[400px] md:h-[450px] lg:h-[500px] flex flex-col justify-center items-center gap-4"
                style={{
                    background: `linear-gradient(to top, #000000cc, #000000a6), url(${bgImg})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }}>
                <motion.h1
                    variants={upAnimation(1.4, 0.1)}
                    initial="hidden"
                    whileInView={"visible"}
                    className="text-5xl uppercase md:text-7xl font-heading text-center mt-[100px]">Checkout</motion.h1>
            </div>

            {/* checkout page content */}
            <div className="container mx-auto p-5 flex flex-col lg:flex-row justify-center items-center gap-5 lg:gap-14 mt-10">

                {/* items table section */}
                <div className="w-full lg:w-2/5 flex flex-col justify-start items-start gap-4 text-[20px] bg-third p-8 font-body">
                    {
                        cartItems.map(item =>
                            <div key={item?._id} className="font-body text-lightWhite flex justify-between items-center w-full border-b-[1px] border-lightBlack pb-3">
                                <p>{item?.foodName} x {item?.foodQuantity}</p>
                                <p>${((item?.foodPrice) * (item?.foodQuantity)).toFixed(2)}</p>
                            </div>)
                    }
                    <p>Subtotal: ${totalAmount}</p>
                    <p>Discount: ${(totalAmount - discountedAmount).toFixed(2)}</p>
                    <p className="text-2xl">Total: ${discountedAmount}</p>
                </div>

                {/* stripe elements */}
                <div className="w-full lg:w-2/5">
                    {
                        clientSecret && (
                            <Elements options={options} stripe={stripePromise}>
                                <CheckOutForm clientSecret={clientSecret} />
                            </Elements>
                        )
                    }
                </div>
            </div>

        </div>
    );
};

export default Checkout;