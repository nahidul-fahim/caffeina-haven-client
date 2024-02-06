import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import LoadingAnimation from "../../../Components/LoadingAnimation/LoadingAnimation";
import { useMemo } from "react";
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";


const AllReservation = () => {

    // hooks and custom hooks
    const axiosSecure = useAxiosSecure();


    // fetch data
    const { isPending: allReservationPending, data: allReservation } = useQuery({
        queryKey: ["all-reservation"],
        queryFn: async () => {
            const res = await axiosSecure.get("/getAllReservationApi")
            return res.data;
        }
    })

    // columns for tanStack table
    const columns = [
        {
            accessorKey: "",
            header: "#",
            cell: row => <p>{row.row.index + 1}</p>
        },
        {
            accessorKey: "reserverName",
            header: "Reserved By"
        },
        {
            accessorKey: "reserverEmail",
            header: "Email",
        },
        {
            accessorKey: "reserverPhone",
            header: "Phone"
        },
        {
            accessorKey: "totalPerson",
            header: "Person"
        },
        {
            accessorKey: "reserveDate",
            header: "Date"
        },
        {
            accessorKey: "reserveTime",
            header: "Time"
        },
        {
            accessorKey: "specialRequest",
            header: "Request",
            cell: row => <p className="text-center text-[16px]">{row.row.original.specialRequest}</p>
        },
        {
            accessorKey: "reservedOn",
            header: "Reserved on",
        },
    ]


    // get the data
    const data = useMemo(() => allReservation ?? [], [allReservation]); // if 'allUsers' is not available, the data will be '[]'.



    // tanStack table
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })



    // conditional loading
    if (allReservationPending) {
        return <LoadingAnimation />
    }


    return (
        <div className="container mx-auto mt-5 md:mt-7 lg:mt-10 w-full flex flex-col justify-center items-center gap-7">
            <h2 className="text-4xl uppercase font-heading text-center">All Reservation</h2>

            {/* table to show all the products */}
            <div className="w-full mt-10">
                <table className="w-full font-body font-light text-[16px]">
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

export default AllReservation;