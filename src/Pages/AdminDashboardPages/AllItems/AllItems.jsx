import { useMemo } from "react";
import useAllMenus from "../../../Hooks/useAllMenus/useAllMenus";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import useFailedToast from "../../../Hooks/useFailedToast/useFailedToast";
import useSuccessToast from "../../../Hooks/useSuccessToast/useSuccessToast";
import Swal from "sweetalert2";
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import LoadingAnimation from "../../../Components/LoadingAnimation/LoadingAnimation";
import { Link } from "react-router-dom";


const AllItems = () => {

    // hooks and custom hooks
    const axiosSecure = useAxiosSecure();
    const failedToast = useFailedToast();
    const successToast = useSuccessToast();
    const { allMenusPending, allMenus, allMenusRefetch } = useAllMenus("all", "all");



    // delete an item
    const handleDeleteItem = id => {
    axiosSecure.delete(`/deleteItemApi/${id}`)
        .then(res => {
            const data = res.data;
            if (data.deletedCount > 0) {
                successToast("Deleted successfully!")
                allMenusRefetch();
            }
        })
        .catch(err => failedToast(err.code))
}



// columns for tanStack table
const columns = [
    {
        accessorKey: "",
        header: "#",
        cell: row => <p>{row.row.index + 1}</p>
    },
    {
        accessorKey: "itemName",
        header: "Item name"
    },
    {
        accessorKey: "itemCategory",
        header: "Category",
        cell: row => <div className="flex w-full justify-center items-center">
            <p className="capitalize text-center">{row.row.original.itemCategory}</p>
        </div>
    },
    {
        accessorKey: "itemPrice",
        header: "Price",
        cell: row => <div className="flex w-full justify-center items-center">
            <p className="capitalize text-center">${row.row.original.itemPrice}</p>
        </div>
    },
    {
        accessorKey: "addedBy",
        header: "Added by"
    },
    {
        accessorKey: "itemImage",
        header: "Image",
        cell: row => <div className="flex justify-center items-center">
            <img src={row.row.original.itemImage} alt="user image" className="w-[60px] h-[60px] rounded-[50%]" />
        </div>
    },
    {
        accessorKey: "addedOn",
        header: "Added on",
        cell: row => <div className="flex w-full justify-center items-center">
            <p className="capitalize text-center">{row.row.original.addedOn}</p>
        </div>
    },
    {
        accessorKey: "",
        header: "Update",
        cell: (row) => <Link to={`/dashboard/updateItem/${row.row.original._id}`}><button className="bg-[#2b81e4] px-2 text-[16px] uppercase hover:bg-third duration-500 py-1">Update</button></Link>
    },
    {
        accessorKey: "",
        header: "Delete",
        cell: (row) => <button onClick={() => {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "red",
                cancelButtonColor: "black",
                confirmButtonText: "Yes, delete!",
            }).then((result) => {
                if (result.isConfirmed) {
                    handleDeleteItem(row.row.original._id)
                }
            });
        }}
            className="bg-[#af0606] disabled:bg-[#694d4d] disabled:cursor-not-allowed px-2 text-[16px] uppercase hover:bg-third duration-500 py-1">Delete</button>
    },
]


// get the data
const data = useMemo(() => allMenus ?? [], [allMenus]); // if 'allUsers' is not available, the data will be '[]'.



// tanStack table
const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
})


// conditional loading
if (allMenusPending) {
    return <LoadingAnimation />
}




return (
    <div className="container mx-auto mt-5 md:mt-7 lg:mt-10 w-full flex flex-col justify-center items-center gap-7">
        <h2 className="text-4xl uppercase font-heading text-center">All Items</h2>

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

export default AllItems;