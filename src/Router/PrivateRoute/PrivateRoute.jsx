import { Navigate, useLocation } from "react-router-dom";
import LoadingAnimation from "../../Components/LoadingAnimation/LoadingAnimation";
import useAuthContext from "../../Hooks/useAuthContext/useAuthContext";


const PrivateRoute = ({ children }) => {

    // hooks and custom hooks
    const { authLoading, currentUser } = useAuthContext();
    const location = useLocation();

    if (authLoading) {
        return <LoadingAnimation />
    }

    if (currentUser) {
        return children;
    }

    return (<Navigate state={location.pathname} to={"/signIn"}></Navigate>)
};

export default PrivateRoute;