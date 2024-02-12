import axios from "axios";
import useAuthContext from "../useAuthContext/useAuthContext";
import { useNavigate } from "react-router-dom";

// create axios instance
const axiosSecure = axios.create({
    baseURL: 'https://caffeina-haven-server.vercel.app'
    // baseURL: 'http://localhost:5000'
})

const useAxiosSecure = () => {


    // hooks and custom hooks
    const { signOutUser } = useAuthContext();
    const navigate = useNavigate();



    // axios interceptor to add token in header while request for verification in backend
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token');
        config.headers.authorization = `Bearer ${token}`;
        return config;
    },
        function (error) {
            return Promise.reject(error)
        }
    );


    // intercepts 401 and 403 status
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        // for 401 or 403 logout the user and move the user to the login
        if (status === 401 || status === 403) {
            await signOutUser();
            navigate("/signIn")
        }
        return Promise.reject(error);
    })
    return axiosSecure;
};

export default useAxiosSecure;
