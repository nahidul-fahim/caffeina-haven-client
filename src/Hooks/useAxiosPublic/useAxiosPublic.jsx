import axios from "axios";

// create axios instance
const axiosPublic = axios.create({
    baseURL: 'https://caffeina-haven-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
}

export default useAxiosPublic;