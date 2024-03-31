import { useQuery } from "@tanstack/react-query";
import useCurrentUser from "../useCurrentUser/useCurrentUser";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";


const useCartItems = () => {


    // hooks and custom hooks
    const { userPending, user } = useCurrentUser();
    const axiosSecure = useAxiosSecure();


    const { isPending: cartItemsPending, data: cartItems, refetch: cartItemsRefetch } = useQuery({
        queryKey: ["cart-items", user?.email],
        enabled: !userPending,
        queryFn: async () => {
            const res = await axiosSecure.get(`/getAllCartItemsApi/${user?.email}`);
            return res.data;
        }
    })

    return { cartItemsPending, cartItems, cartItemsRefetch }
};

export default useCartItems;