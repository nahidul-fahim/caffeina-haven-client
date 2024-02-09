import { Navigate } from "react-router-dom";
import LoadingAnimation from "../../Components/LoadingAnimation/LoadingAnimation";
import useIsAdmin from "../../Hooks/useIsAdmin/useIsAdmin";


const AdminRoute = ({ children }) => {

    // hooks and custom hooks
    const { isAdminPending, isAdmin } = useIsAdmin();

    if (isAdminPending) {
        return <LoadingAnimation />
    }

    if (isAdmin) {
        return children;
    }

    return (<Navigate to={"/"}></Navigate>)

};

export default AdminRoute; "#ff7a22"