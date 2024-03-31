import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import LoadingAnimation from "../../../Components/LoadingAnimation/LoadingAnimation";
import { useMemo } from "react";
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import useFailedToast from "../../../Hooks/useFailedToast/useFailedToast";
import useSuccessToast from "../../../Hooks/useSuccessToast/useSuccessToast";
import Swal from "sweetalert2";


const AllUsers = () => {

    // hooks and custom hooks
    const axiosSecure = useAxiosSecure();
    const failedToast = useFailedToast();
    const successToast = useSuccessToast();


    // fetch data
    const { isPending: allUsersPending, data: allUsers, refetch: allUsersRefetch } = useQuery({
        queryKey: ["all-users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/allUsers")
            return res.data;
        }
    })


    // handle blacklist user
    const handleBlackListUser = id => {
        const userStatus = "blocked";
        const updatedUserStatus = { userStatus };

        axiosSecure.put(`/updateUser/${id}`, updatedUserStatus)
            .then(res => {
                const data = res.data;
                if (data.modifiedCount > 0) {
                    allUsersRefetch();
                    successToast("Updated status!")
                }
            })
            .catch(err => {
                failedToast(err.code);
            })
    }


    // columns for tanStack table
    const columns = [
        {
            accessorKey: "",
            header: "#",
            cell: row => <p>{row.row.index + 1}</p>
        },
        {
            accessorKey: "userName",
            header: "Name"
        },
        {
            accessorKey: "_id",
            header: "ID",
            cell: row => <p className="text-center text-[16px]">{row.row.original._id}</p>
        },
        {
            accessorKey: "email",
            header: "Email"
        },
        {
            accessorKey: "photo",
            header: "Image",
            cell: row => <div className="flex justify-center items-center">
                <img src={row.row.original.photo} alt="user image" className="w-[60px] h-[60px] rounded-[50%]" />
            </div>
        },
        {
            accessorKey: "userCreationDate",
            header: "Registered on",
            cell: row => <div className="flex w-full justify-center items-center">
                <p className="capitalize text-center">{row.row.original.userCreationDate}</p>
            </div>
        },
        {
            accessorKey: "userStatus",
            header: "Status",
            cell: row => <div className="flex w-full justify-center items-center">
                <p className={`${row.row.original.userStatus === "blocked" ? "text-[#ff2a2a]" : "text-[#18e429]"} capitalize text-center`}>{row.row.original.userStatus || "Regular"}</p>
            </div>
        },
        {
            accessorKey: "",
            header: "Action",
            cell: (row) => <button disabled={row.row.original.userStatus === "blocked"} onClick={() => {
                Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "red",
                    cancelButtonColor: "black",
                    confirmButtonText: "Yes, block the user!",
                }).then((result) => {
                    if (result.isConfirmed) {
                        handleBlackListUser(row.row.original._id)
                    }
                });
            }}
                className="bg-[#af0606] disabled:bg-[#694d4d] disabled:cursor-not-allowed px-2 text-[16px] uppercase hover:bg-third duration-500 py-1">Block</button>
        },
    ]


    // get the data
    const data = useMemo(() => allUsers ?? [], [allUsers]); // if 'allUsers' is not available, the data will be '[]'.



    // tanStack table
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })



    // conditional loading
    if (allUsersPending) {
        return <LoadingAnimation />
    }


    return (
        <div className="container mx-auto mt-5 md:mt-7 lg:mt-10 w-full flex flex-col justify-center items-center gap-7">
            <h2 className="text-4xl uppercase font-heading text-center">All Users</h2>

            {/* table to show all the products */}
            <div className="w-full mt-10">
                <table className="w-full font-body text-[16px]">
                    <thead>
                        {
                            table.getHeaderGroups().map((headerGroup, index) =>
                                <tr key={index} className="table-row text-second font-semibold">
                                    {headerGroup.headers.map(header =>
                                        <th key={header?.id} className="table-description text-sub">
                                            {
                                                flexRender(header.column.columnDef.header, header.getContext())
                                            }
                                        </th>)}
                                </tr>
                            )}
                    </thead>

                    <tbody>
                        {
                            table.getRowModel().rows.map((row, index) =>
                                <tr key={index} className="table-row">
                                    {
                                        row.getVisibleCells().map((cell, index) =>
                                            <td key={index} className="text-center table-description">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>)
                                    }
                                </tr>)
                        }
                    </tbody>
                </table>

                {/* pagination buttons */}
                <div className="w-full flex justify-between items-center gap-10 mt-5 font-body font-semibold">
                    <button disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}
                        className="hover:text-sub duration-300 disabled:text-gray"
                    >Previous</button>
                    <button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}
                        className="hover:text-sub duration-300 disabled:text-gray">Next</button>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;