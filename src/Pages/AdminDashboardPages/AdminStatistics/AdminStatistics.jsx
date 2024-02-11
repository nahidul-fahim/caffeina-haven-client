import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import LoadingAnimation from "../../../Components/LoadingAnimation/LoadingAnimation";



const AdminStatistics = () => {

    // hooks and custom hooks
    const axiosSecure = useAxiosSecure();

    // data fetch
    const { isPending: statisticsPending, data: statistics } = useQuery({
        queryKey: ["all-statistics"],
        queryFn: async () => {
            const res = await axiosSecure.get("/adminStatisticsPageInfoApi");
            return res.data;
        }
    })

    if (statisticsPending) {
        return <LoadingAnimation />
    }


    return (
        <div className="mt-5 lg:mt-10 container mx-auto font-body flex flex-col md:flex-row flex-wrap justify-center md:justify-evenly items-stretch gap-8">
            {/* total users */}
            <div className="bg-gradient-to-r from-[#0DAFD8] to-[#0c6dff] p-10 flex justify-center items-center gap-3 flex-col rounded-xl justify-self-stretch	">
                <p className=" text-9xl font-bold text-center">{statistics?.totalUsers}</p>
                <p className="text-4xl font-bold ">Total Users</p>
            </div>

            {/* total reservation */}
            <div className="bg-gradient-to-r from-[#ff4fd9] to-[#d60076] p-10 flex justify-center items-center gap-3 flex-col rounded-xl justify-self-stretch	">
                <p className=" text-9xl font-bold text-center">{statistics?.totalReservation}</p>
                <p className="text-4xl font-bold ">Reservations</p>
            </div>

            {/* total memories */}
            <div className="bg-gradient-to-r from-[#3cccb9] to-[#00c271] p-10 flex justify-center items-center gap-3 flex-col rounded-xl justify-self-stretch	">
                <p className=" text-9xl font-bold text-center">{statistics?.totalMemories}</p>
                <p className="text-4xl font-bold ">Memories</p>
            </div>
        </div>
    );
};

export default AdminStatistics;