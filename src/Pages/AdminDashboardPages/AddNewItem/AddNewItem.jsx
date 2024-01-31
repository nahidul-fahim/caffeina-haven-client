import { useRef, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import useCurrentUser from "../../../Hooks/useCurrentUser/useCurrentUser";
import { FaUpload } from "react-icons/fa6";
import useAxiosPublic from "../../../Hooks/useAxiosPublic/useAxiosPublic";
import useSuccessToast from "../../../Hooks/useSuccessToast/useSuccessToast";
import useFailedToast from "../../../Hooks/useFailedToast/useFailedToast";


const foodOriginList = ["american", "bangladeshi", "chinese", "french", "indian", "italian", "japanese", "korean", "mexican", "moroccan", "thai", "turkish"];


// imgBB hosting
const imgHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY
const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`


const AddNewItem = () => {


    // hooks and custom hooks
    const axiosSecure = useAxiosSecure();
    const { userPending, user } = useCurrentUser();
    const [selectedImageName, setSelectedImageName] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const axiosPublic = useAxiosPublic();
    const successToast = useSuccessToast();
    const failedToast = useFailedToast();
    const itemAddingForm = useRef(null);


    // image input and get the file name
    const handleImageInput = e => {
        e.preventDefault();
        const fileInput = e.target;
        if (fileInput.files.length > 0) {
            const file = { image: fileInput.files[0] }
            const fileName = fileInput.files[0].name;
            setSelectedImageName(fileName);
            setSelectedImage(file)
        }
        else {
            setSelectedImageName('')
        }
    }


    // get today's date
    const todayDate = new Date().toDateString().slice(4);


    // post the item data to database
    const handleAddNewItem = e => {
        e.preventDefault();
        const form = e.target;

        if (selectedImage) {
            axiosPublic.post(imgUploadUrl, selectedImage, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
                .then(res => {
                    if (res.data) {
                        const itemName = form.itemName.value;
                        const itemCategory = form.itemCategory.value;
                        const itemPrice = form.itemPrice.value;
                        const foodOrigin = form.foodOrigin.value;
                        const itemDescription = form.itemDescription.value;
                        const addedBy = user?.userName;
                        const adderEmail = user?.userEmail;
                        const adderImage = user?.photo;
                        const addedOn = todayDate;
                        const itemImage = res.data.data.display_url;

                        const newItemInfo = { itemName, itemCategory, itemPrice, foodOrigin, itemDescription, addedBy, adderEmail, adderImage, addedOn, itemImage }

                        // send the data to database
                        axiosSecure.post("/addNewItem", newItemInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    itemAddingForm.current.reset();
                                    successToast("New Item Added!")
                                }
                            })
                            // database adding failed
                            .catch(err => failedToast(err.code))
                    }
                })
                // imgBb hosting failed
                .catch(() => failedToast("Try again!"))
        }
    }




    return (
        <div className="mt-5 md:mt-7 lg:mt-10 w-full flex flex-col justify-center items-center gap-7">
            <h2 className="text-4xl uppercase font-heading text-center">Add new item</h2>

            {/* new item adding form */}
            <form onSubmit={handleAddNewItem} ref={itemAddingForm}
                className="w-full flex flex-col justify-center items-center p-8 lg:p-14 gap-7 font-body font-light">

                <div className="w-full flex flex-col md:flex-row justify-center items-center gap-5 md:gap-8 lg:gap-14">
                    {/* item name */}
                    <input required type="text" name="itemName" id="itemName" placeholder="Item name" className="w-full md:w-1/2 bg-[#00000000] border-b-[1px] py-3 border-lightBlack focus:outline-none focus:border-white text-white" />

                    {/* item category */}
                    <select required name="itemCategory" id="itemCategory" defaultValue={""} className="w-full md:w-1/2 bg-[#00000000] border-b-[1px] py-3 border-lightBlack focus:outline-none focus:border-white text-[#a2abb1] appearance-none">
                        <option disabled value="">Choose Category</option>
                        <option value="beverages">Beverages</option>
                        <option value="bakery">Bakery</option>
                        <option value="sandwiches">Sandwiches</option>
                        <option value="salads">Salads</option>
                        <option value="desserts">Desserts</option>
                        <option value="soups">Soups</option>
                    </select>
                </div>


                <div className="w-full flex flex-col md:flex-row justify-center items-center gap-5 md:gap-8 lg:gap-14">
                    {/* item price */}
                    <input required type="number" step={.01} min={1} name="itemPrice" id="itemPrice" placeholder="Item price ($)" className="w-full md:w-1/2 bg-[#00000000] border-b-[1px] py-3 border-lightBlack focus:outline-none focus:border-white text-white" />

                    {/* item origin */}
                    <select required name="foodOrigin" id="foodOrigin" defaultValue={""} className="w-full md:w-1/2 bg-[#00000000] border-b-[1px] py-3 border-lightBlack focus:outline-none focus:border-white text-[#a2abb1] appearance-none">
                        <option disabled value="">Choose food origin</option>
                        {
                            foodOriginList.map((origin, index) =>
                                <option key={index} value={origin} className="capitalize">{origin}</option>)
                        }
                    </select>
                </div>

                {/* item description */}
                <textarea required name="itemDescription" id="itemDescription" placeholder="Item description" className="w-full bg-[#00000000] border-b-[1px] py-3 border-lightBlack focus:outline-none focus:border-white text-white" />

                {/* image file input */}
                <label
                    htmlFor="image"
                    className="cursor-pointer bg-[#00000000] relative focus:outline-none border-b-[1px] py-3 border-lightBlack focus:border-white transition-all duration-500 w-full text-[#9CA3AF] flex justify-start items-center gap-2"
                >
                    <FaUpload className="text-[#9CA3AF]" /> {selectedImageName.length > 25 ? selectedImageName.slice(0, 25) + "...." : selectedImageName || "Choose item's image"}
                    <input
                        type="file"
                        name="image"
                        id="image"
                        accept="image/*"
                        onChange={handleImageInput}
                        className="cursor-pointer opacity-0 absolute top-0 left-0 w-full" />
                </label>

                {/* submit button */}
                <input type="submit" value="Add item" className="w-full bg-second text-white px-5 py-2 hover:bg-third duration-500 cursor-pointer font-medium" />
            </form>
        </div>
    );
};

export default AddNewItem;