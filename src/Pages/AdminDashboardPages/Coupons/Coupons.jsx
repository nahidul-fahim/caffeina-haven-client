import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import useFailedToast from "../../../Hooks/useFailedToast/useFailedToast";
import useSuccessToast from "../../../Hooks/useSuccessToast/useSuccessToast";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useMemo } from "react";
import LoadingAnimation from "../../../Components/LoadingAnimation/LoadingAnimation";




const Coupons = () => {


    // hooks and custom hooks
    const axiosSecure = useAxiosSecure();
    const failedToast = useFailedToast();
    const successToast = useSuccessToast();


    // fetch data
    const { isPending: couponsPending, data: allCoupons, refetch: couponsRefetch } = useQuery({
        queryKey: ["all-coupons"],
        queryFn: async () => {
            const res = await axiosSecure.get("/getAllCouponAdminApi")
            return res.data;
        }
    })


    // create new coupon
    const handleCreateNewCoupon = e => {
        e.preventDefault();
        const form = e.target;
        const couponName = form.couponName.value;
        const discountPercentage = parseInt(form.discountPercentage.value);

        const newCouponInfo = { couponName, discountPercentage };

        axiosSecure.post("/newCouponCreateApi", newCouponInfo)
            .then(res => {
                const data = res.data;
                if (data.insertedId) {
                    couponsRefetch();
                    successToast("New coupon created")
                    document.getElementById('couponAddingModal').close();
                }
            })
            .catch(err => {
                failedToast(err.code);
            })
    }


    // delete a coupon
    const handleDeleteCoupon = id => {
        axiosSecure.delete(`/deleteCouponApi/${id}`)
            .then(res => {
                const data = res.data;
                if (data.deletedCount > 0) {
                    successToast("Coupon deleted!")
                    couponsRefetch()
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
            accessorKey: "couponName",
            header: "Coupon"
        },
        {
            accessorKey: "_id",
            header: "ID",
            cell: row => <p className="text-center text-lightWhite text-[16px]">{row.row.original._id}</p>
        },
        {
            accessorKey: "discountPercentage",
            header: "Discount",
            cell: row => <p className="text-center">{row.row.original.discountPercentage}%</p>
        },
        {
            accessorKey: "",
            header: "Action",
            cell: (row) => <button onClick={() => {
                Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "red",
                    cancelButtonColor: "black",
                    confirmButtonText: "Yes, Delete Coupon!",
                }).then((result) => {
                    if (result.isConfirmed) {
                        handleDeleteCoupon(row.row.original._id)
                    }
                });
            }}
                className="bg-[#af0606] disabled:bg-[#694d4d] disabled:cursor-not-allowed px-2 text-[16px] uppercase hover:bg-third duration-500 py-1">Delete</button>
        },
    ]


    // get the data
    const data = useMemo(() => allCoupons ?? [], [allCoupons]); // if 'allUsers' is not available, the data will be '[]'.



    // tanStack table
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })



    // conditional loading
    if (couponsPending) {
        return <LoadingAnimation />
    }


    return (
        <div className="container mx-auto mt-5 md:mt-7 lg:mt-10 w-full flex flex-col justify-center items-center gap-7">
            <h2 className="text-4xl uppercase font-heading text-center">Coupons</h2>

            {/* coupon adding button */}
            <div className="w-full flex justify-end items-center">
                <button onClick={() => document.getElementById('couponAddingModal').showModal()}
                    className="bg-second text-white hover:bg-main hover:text-white duration-500 font-heading font-medium uppercase px-4 py-3">Add New Coupon</button>
            </div>


            {/* coupon showing table */}
            <table className="w-full font-body text-[16px] mt-5">
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


            {/* coupon adding modal */}
            <dialog id="couponAddingModal" className="modal modal-bottom sm:modal-middle py-5">
                <div className="modal-box bg-third flex flex-col justify-center items-center gap-4 font-body">
                    <h3 className="font-medium text-3xl">Add new coupon</h3>
                    <div className="modal-action w-full">
                        <form onSubmit={handleCreateNewCoupon} method="dialog" className="w-full flex flex-col justify-center items-center gap-3">

                            {/* coupon name */}
                            <input type="text" name="couponName" id="couponName" placeholder="Coupon name" className="w-full md:w-3/4 bg-main text-lightWhite px-4 py-3 focus:outline-none" />

                            {/* discount percentage */}
                            <input type="number" name="discountPercentage" id="discountPercentage" placeholder="Discount percentage" min={5} step={1} className="w-full md:w-3/4 bg-main text-lightWhite px-4 py-3 focus:outline-none" />

                            {/* submit button */}
                            <input type="submit" value="Create Coupon" className="w-full md:w-3/4 bg-second text-white px-4 py-3 hover:bg-white hover:text-black duration-500 cursor-pointer" />
                        </form>
                    </div>
                </div>
            </dialog>

        </div>

    );
};

export default Coupons;