import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";


const useAuthContext = () => {

    const authInfo = useContext(AuthContext);

    return authInfo;
};

export default useAuthContext;