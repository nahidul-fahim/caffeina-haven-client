import { useEffect, useMemo, useRef, useState } from "react";
import LoadingAnimation from "../../Components/LoadingAnimation/LoadingAnimation";
import useCartItems from "../../Hooks/useCartItems/useCartItems";
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import useFailedToast from "../../Hooks/useFailedToast/useFailedToast";
import { MdCancel } from "react-icons/md";
import useSuccessToast from "../../Hooks/useSuccessToast/useSuccessToast";




const bgImg = "https://i.ibb.co/4gRwyng/scrsht-com-3-59-17-PM.png"



const MyCart = () => {


    // hooks and custom Hooks
    const { cartItemsPending, cartItems, cartItemsRefetch } = useCartItems();
    const [totalAmount, setTotalAmount] = useState(0);
    const axiosSecure = useAxiosSecure();
    const failedToast = useFailedToast();
    const successToast = useSuccessToast();
    const [discount, setDiscount] = useState(null);
    const [discountedAmount, setDiscountedAmount] = useState(null);
    const couponInput = useRef(null);


    // count the total here
    useEffect(() => {
        if (!cartItemsPending) {
            const totalPrice = cartItems.reduce((accumulator, item) => {
                return accumulator += item.foodPrice * item.foodQuantity;
            }, 0)
            setTotalAmount(totalPrice.toFixed(2))
            setDiscountedAmount(totalPrice.toFixed(2))
            sessionStorage.setItem("final-amount", totalPrice.toFixed(2))
        }
    }, [cartItemsPending, cartItems])



    // handle remove item from cart
    const handleRemoveFromCart = id => {
        axiosSecure.delete(`/deleteItemFromCartApi/${id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    successToast("Item removed from cart!")
                    cartItemsRefetch();
                }
            })
            .catch(err => failedToast(err.code))
    }


    // handle apply coupon functionality
    const handleApplyCoupon = e => {
        e.preventDefault();
        const couponCode = e.target.couponCode.value;

        const applyCouponInfo = { couponCode };

        axiosSecure.post("/couponCodeValidationApi", applyCouponInfo)
            .then(res => {
                const data = res.data;
                if (data.coupon) {
                    couponInput.current.reset();
                    applyDiscountPercentage(parseFloat(data.discountPercentage));
                    return setDiscount(parseFloat(data.discountPercentage));
                }
                failedToast("Invalid coupon")
            })
            .catch(err => failedToast(err.code));
    }


    // handle discounted price
    const applyDiscountPercentage = discount => {
        const actualDiscount = discount / 100;
        const totalAfterDiscount = totalAmount - totalAmount * actualDiscount;
        setDiscountedAmount(totalAfterDiscount.toFixed(2));
        sessionStorage.setItem("final-amount", totalAfterDiscount.toFixed(2))
    }




    // columns for tanStack table
    const columns = [
        {
            accessorKey: "",
            header: " ",
            cell: row => <button onClick={() => handleRemoveFromCart(row.row.original._id)}
                className="w-fit text-xl text-[#ff4747] hover:text-[#bd2a2a] duration-300"><MdCancel /> </button>
        },
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
            cell: row => <p className="text-center text-[16px]">{row.row.original.foodQuantity} nos</p>
        },
        {
            accessorKey: "",
            header: "Subtotal",
            cell: row => <p className="text-center text-[16px]">$ {parseFloat((row.row.original.foodQuantity) * (row.row.original.foodPrice)).toFixed(2)}</p>
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


            {/* cart page content section */}
            <div className="container mx-auto my-5 md:my-7 lg:my-10 w-full flex flex-col justify-center items-center gap-7 p-5">


                {/* table + coupon */}
                <div className="w-full bg-third flex flex-col justify-center items-center gap-5 py-7">
                    {/* table to show all the products on cart */}
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

                    {/* coupon apply functionality functionality */}
                    <div className="w-full flex justify-end items-center">
                        <form onSubmit={handleApplyCoupon} ref={couponInput}
                            className="w-full md:w-fit flex flex-col md:flex-row justify-end items-center gap-4 px-5 md:px-0">
                            {/* coupon code */}
                            <input type="text" name="couponCode" placeholder="Coupon code" id="couponCode" className="focus:outline-none bg-black px-3 md:px-5 py-2 md:py-3 self-stretch font-body" />
                            {/* submit button */}
                            <input type="submit" value="Apply Coupon" className="bg-second px-3 md:px-5 py-2 md:py-3 font-heading uppercase cursor-pointer hover:bg-white hover:text-black duration-500 self-stretch" />
                        </form>
                    </div>
                </div>


                {/* total count section */}
                <div className="w-full bg-third px-5 py-10 mt-5 flex flex-col justify-start items-center gap-4">
                    <h3 className="text-3xl font-heading uppercase text-white">Cart Total</h3>

                    {/* subtotal and total */}
                    <div className="w-full font-body flex flex-col md:flex-row justify-center items-center gap-5 mt-5">
                        {/* subtotal */}
                        <div className="w-full md:w-1/2 flex justify-between items-center border-[1px] border-lightBlack border-dotted p-3 self-stretch">
                            <p>Subtotal</p>
                            <p>${totalAmount}</p>
                        </div>
                        {/* total */}
                        <div className="w-full md:w-1/2 flex justify-between items-center border-[1px] border-lightBlack border-dotted p-3 self-stretch">
                            <p className="text-2xl">Total <span className="text-[18px] text-[#ff3b3b]">{discount ? `(${discount}% Discount)` : ""}</span></p>
                            <p className="text-2xl">${discountedAmount}</p>
                        </div>
                    </div>

                    {/* checkout button */}
                    <Link to={"/checkout"} state={{ 'totalAmount': totalAmount, 'discountedAmount': discountedAmount }} className="w-full bg-second py-3 text-xl md:py-4 font-heading uppercase text-center mt-3 hover:bg-white hover:text-black duration-500 font-medium">Proceed to checkout</Link>
                </div>

            </div>

        </div>
    );
};

export default MyCart;