import Lottie from "lottie-react";
import errorAnimation from "../../assets/errorPage.json"
import { Link } from "react-router-dom";
import ButtonMain from "../../Components/ButtonMain/ButtonMain";


const ErrorPage = () => {
    return (
        <div className="h-[100vh] flex flex-col gap-5 justify-center items-center">
            <Lottie animationData={errorAnimation} loop={true} className="w-[450px] lg:w-[600px]" />
            <Link to={"/"}><ButtonMain buttonText={"Back to home"} /></Link>
        </div>
    );
};

export default ErrorPage;