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
        setIsLoading(true);


        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "https://caffeina-haven.web.app/checkoutSuccess",
            },
        });
        if (error) {
            setMessage(error.message)
        }
        else {
            //
        }
        setIsLoading(false)
    }



    return (
        <form onSubmit={handleSubmit} className="payment-form font-body text-white">
            <PaymentElement className="payment-element font-body text-white" />
            <button disabled={isLoading || !stripe || !elements} className="pay-button bg-second px-4 py-2 hover:bg-white hover:text-black duration-500">
                <span>{isLoading ? 'Loading' : 'Pay now'}</span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
};

export default CheckoutForm;