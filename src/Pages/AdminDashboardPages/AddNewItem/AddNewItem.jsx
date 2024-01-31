




const AddNewItem = () => {




    return (
        <div className="mt-5 md:mt-7 lg:mt-10 w-full flex flex-col justify-center items-center gap-7">
            <h2 className="text-4xl uppercase font-heading text-center">Add new item</h2>

            {/* new item adding form */}
            <form className="w-full flex flex-col justify-center items-center p-8 lg:p-14 gap-7 font-body font-light">

                <div className="w-full flex flex-col md:flex-row justify-center items-center gap-5 md:gap-8 lg:gap-14">
                    {/* item name */}
                    <input required type="text" name="itemName" id="itemName" placeholder="Item name" className="w-full md:w-1/2 bg-[#00000000] border-b-[1px] py-3 border-lightBlack focus:outline-none focus:border-white text-white" />

                    {/* item category */}
                    <input required type="text" name="itemCategory" id="itemCategory" placeholder="Item category" className="w-full md:w-1/2 bg-[#00000000] border-b-[1px] py-3 border-lightBlack focus:outline-none focus:border-white text-white" />
                </div>


                <div className="w-full flex flex-col md:flex-row justify-center items-center gap-5 md:gap-8 lg:gap-14">
                    {/* item price */}
                    <input required type="number" step={.01} min={1} name="itemPrice" id="itemPrice" placeholder="Item price" className="w-full md:w-1/2 bg-[#00000000] border-b-[1px] py-3 border-lightBlack focus:outline-none focus:border-white text-white" />

                    {/* item availability */}
                    <select name="availability" id="availability" className="w-full md:w-1/2 bg-[#00000000] border-b-[1px] py-3 border-lightBlack focus:outline-none focus:border-white text-white appearance-none">
                        <option disabled>Is the item available?</option>
                        <option value="available">Available</option>
                        <option value="unavailable">Unavailable</option>
                    </select>
                </div>

                {/* item name */}
                <input required type="text" name="itemName" id="itemName" placeholder="Item Name" className="w-full bg-[#00000000] border-b-[1px] py-3 border-lightBlack focus:outline-none focus:border-white text-white" />
                {/* item name */}
                <input required type="text" name="itemName" id="itemName" placeholder="Item Name" className="w-full bg-[#00000000] border-b-[1px] py-3 border-lightBlack focus:outline-none focus:border-white text-white" />
            </form>
        </div>
    );
};

export default AddNewItem;