import Lottie from "lottie-react";
import loadingAnimation from "../../assets/loadingAnimation.json"


const LoadingAnimation = () => {

    return <div className="h-[100vh] flex justify-center items-center">
        <Lottie animationData={loadingAnimation} loop={true} />
    </div>
};

export default LoadingAnimation;