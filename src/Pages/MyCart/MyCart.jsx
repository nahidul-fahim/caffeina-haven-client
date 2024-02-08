import { useMemo, useState } from "react";
import LoadingAnimation from "../../Components/LoadingAnimation/LoadingAnimation";
import useCartItems from "../../Hooks/useCartItems/useCartItems";
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";



const bgImg = "https://i.ibb.co/4gRwyng/scrsht-com-3-59-17-PM.png"



const MyCart = () => {


    // hooks and custom Hooks
    const { cartItemsPending, cartItems, cartItemsRefetch } = useCartItems();
    const [updated, setUpdated] = useState(false);



    // handle quantity
    const handleQuantityChange = (id, quantity, price) => {
        const cartDetails = JSON.stringify([quantity, quantity * price]);
        sessionStorage.setItem(id, cartDetails);
        setUpdated(!updated);
    }



    // columns for tanStack table
    const columns = [
        {
            accessorKey: "",
            header: "#",
            cell: row => <p>{row.row.index + 1}</p>
        },
        {
            accessorKey: "foodImage",
            header: "Image",
            cell: row => <div className="flex justify-center items-center">
                <img src={row.row.original.foodImage} alt="Food image" className="w-[70px] h-[70px]" />
            </div>
        },
        {
            accessorKey: "foodName",
            header: "Item name",
            cell: row => <p className="text-center text-[16px]">{row.row.original.foodName}</p>
        },
        {
            accessorKey: "foodPrice",
            header: "Price",
            cell: row => <p className="text-center text-[16px]">${row.row.original.foodPrice}</p>
        },
        {
            accessorKey: "",
            header: "Quantity",
            cell: row => <div>
                <input type="number" onChange={(e) => handleQuantityChange(row.row.original._id, parseFloat(e.target.value), row.row.original.foodPrice)} min={1} step={1} defaultValue={JSON.parse(sessionStorage.getItem(row.row.original._id)) ? (JSON.parse(sessionStorage.getItem(row.row.original._id)))[0] : 1} name="foodQuantity" id="foodQuantity" className="bg-main p-2 focus:outline-none" />
            </div>
        },
        {
            accessorKey: "",
            header: "Sub-total",
            cell: row => <p className="text-center text-[16px]">$ {JSON.parse(sessionStorage.getItem(row.row.original._id)) ? (JSON.parse(sessionStorage.getItem(row.row.original._id)))[1] : row.row.original.foodPrice}</p>
        },
    ]


    // get the data
    const data = useMemo(() => cartItems ?? [], [cartItems]); // if 'allUsers' is not available, the data will be '[]'.



    // tanStack table
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })


    // conditional loading
    if (cartItemsPending) {
        return <LoadingAnimation />
    }



    return (
        <div className="mx-auto">
            {/* page heading section */}
            <div
                className="h-[400px] md:h-[450px] lg:h-[500px] flex flex-col justify-center items-center gap-4"
                style={{
                    background: `linear-gradient(to top, #000000a6, #000000a6), url(${bgImg})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }}>
                <h1 className="text-5xl uppercase md:text-7xl font-heading text-center mt-[100px]">Cart</h1>
            </div>

            {/* table to show all the products on cart */}
            <div className="container mx-auto my-5 md:my-7 lg:my-10 w-full flex flex-col justify-center items-center gap-7 bg-third p-5">
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
            </div>

        </div>
    );
};

export default MyCart;