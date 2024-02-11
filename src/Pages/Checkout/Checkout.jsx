import { useLocation } from "react-router-dom";
import useCartItems from "../../Hooks/useCartItems/useCartItems";
import LoadingAnimation from "../../Components/LoadingAnimation/LoadingAnimation";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckoutForm";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";

// bg image
const bgImg = "https://i.ibb.co/4gRwyng/scrsht-com-3-59-17-PM.png";

// stripe
// TODO: ADD PUBLISHABLE KEY
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_Key);


const Checkout = () => {

    // hooks and custom hooks
    const axiosSecure = useAxiosSecure();
    const location = useLocation();
    const { cartItemsPending, cartItems } = useCartItems();
    const [clientSecret, setClientSecret] = useState("");

    // get data from location state coming from my cart route
    const totalAmount = location.state?.totalAmount;
    const discountedAmount = location.state?.discountedAmount;
    // console.log(totalAmount, discountedAmount, clientSecret);
    const finalAmount = sessionStorage.getItem("final-amount")


    // post api to get payment intent from backend
    useEffect(() => {
        const price = { finalAmount }
        console.log(price);
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
                <h1 className="text-5xl uppercase md:text-7xl font-heading text-center mt-[100px]">Checkout</h1>
            </div>


            {/* stripe elements */}
            {
                clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckOutForm clientSecret={clientSecret} />
                    </Elements>
                )
            }

        </div>
    );
};

export default Checkout;