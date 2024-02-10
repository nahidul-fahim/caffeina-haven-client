import { Navigate, useLocation } from "react-router-dom";
import LoadingAnimation from "../../Components/LoadingAnimation/LoadingAnimation";
import useIsAdmin from "../../Hooks/useIsAdmin/useIsAdmin";
import useAuthContext from "../../Hooks/useAuthContext/useAuthContext";


const AdminRoute = ({ children }) => {

    // hooks and custom hooks
    const { isAdminPending, isAdmin } = useIsAdmin();
    const { authLoading, currentUser } = useAuthContext();
    const location = useLocation();

    console.log(authLoading, isAdminPending)
    if (authLoading || isAdminPending) {
        return <LoadingAnimation />
    }

    console.log("Current user:", currentUser, "||", "Is Admin:", isAdmin)
    if (currentUser && isAdmin) {
        return children;
    }

    return <Navigate to={"/"} state={{ from: location }}></Navigate>

};

export default AdminRoute;