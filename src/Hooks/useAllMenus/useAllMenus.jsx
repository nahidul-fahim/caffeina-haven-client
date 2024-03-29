import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../useAxiosPublic/useAxiosPublic";


const useAllMenus = (selectedCategory, selectedOrigin) => {

    // hooks and custom hooks
    const axiosPublic = useAxiosPublic();


    // fetch the data
    const { isPending: allMenusPending, data: allMenus, refetch: allMenusRefetch } = useQuery({
        queryKey: ["all-menus", selectedCategory, selectedOrigin],
        queryFn: async () => {
            const res = await axiosPublic.get(`/allMenu?category=${selectedCategory}&foodOrigin=${selectedOrigin}`)
            return res.data;
        }
    })


    return { allMenusPending, allMenus, allMenusRefetch };
};

export default useAllMenus;