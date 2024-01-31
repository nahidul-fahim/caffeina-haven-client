import { useQuery } from "@tanstack/react-query";
import useAuthContext from "../useAuthContext/useAuthContext";
import useAxiosPublic from "../useAxiosPublic/useAxiosPublic";


const useCurrentUser = () => {

    // hooks and custom hooks
    const axiosPublic = useAxiosPublic();
    const { currentUser, authLoading } = useAuthContext();
    const userEmail = currentUser?.email;

    const { isPending: userPending, data: user, refetch: userRefetch } = useQuery({
        queryKey: ["current-user", userEmail],
        enabled: !authLoading,
        queryFn: async () => {
            const res = await axiosPublic.get(`/currentUser/${userEmail}`)
            return res.data;
        }
    })

    return { userPending, user, userRefetch }
};

export default useCurrentUser;