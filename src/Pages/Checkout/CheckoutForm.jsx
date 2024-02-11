import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";


const CheckoutForm = ({ clientSecret }) => {

    // hooks and custom hooks
    const stripe = useStripe();
    const elements = useElements();

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);



    useEffect(() => {
        if (!stripe || !clientSecret) {
            return;
        }
        console.log(clientSecret)
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });

    }, [stripe, clientSecret])




    // handle checkout form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        console.log("handle payment form working")
        setIsLoading(true);
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:5173/checkout",
            },
        });
        if (error) {
            setMessage(error.message)
        }
        else {
            console.log(error)
        }
        setIsLoading(false)
    }






    return (
        <form onSubmit={handleSubmit}>

            <PaymentElement />
            <button disabled={isLoading || !stripe || !elements}>
                <span>
                    {isLoading ? "Loading" : "Pay now"}
                </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
};

export default CheckoutForm;