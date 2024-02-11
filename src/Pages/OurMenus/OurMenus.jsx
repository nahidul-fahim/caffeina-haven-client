import { useEffect, useState } from "react";
import LoadingAnimation from "../../Components/LoadingAnimation/LoadingAnimation";
import SingleMenuList from "../../Components/SingleMenuList/SingleMenuList";
import useAllMenus from "../../Hooks/useAllMenus/useAllMenus";
import { motion } from "framer-motion"
import useUpAnimation from "../../Hooks/useUpAnimation/useUpAnimation";
import useFadeAnimation from "../../Hooks/useFadeAnimation/useFadeAnimation";
import useDownAnimation from "../../Hooks/useDownAnimation/useDownAnimation";
import useScrollToTop from "../../Hooks/useScrollToTop/useScrollToTop";


const bgImg = "https://i.ibb.co/R7zFLT7/home-bg-8-1.jpg";

const foodOriginList = ["All", "American", "Bangladeshi", "Chinese", "French", "Indian", "Italian", "Japanese", "Korean", "Mexican", "Moroccan", "Thai", "Turkish"];

const foodCategories = ["All", "Bakery", "Beverages", "Desserts", "Salads", "Sandwiches", "Soups"];

const OurMenus = () => {


    // hooks and custom hooks
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedOrigin, setSelectedOrigin] = useState("all");
    const { allMenusPending, allMenus } = useAllMenus(selectedCategory, selectedOrigin);
    const upAnimation = useUpAnimation();
    const fadeAnimation = useFadeAnimation();
    const downAnimation = useDownAnimation();
    const scrollToTop = useScrollToTop();

    useEffect(() => {
        scrollToTop();
    }, [scrollToTop])



    // conditional loading
    if (allMenusPending) {
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
                <motion.h1
                    variants={upAnimation(1.2, 0)}
                    initial="hidden"
                    whileInView={"visible"}
                    className="text-5xl uppercase md:text-7xl font-heading text-center mt-[100px]">Our Menu</motion.h1>
            </div>

            {/* page content section */}
            <div className="container mx-auto p-5 flex flex-col justify-center items-center gap-10">

                {/* food category tab selection */}
                <motion.div
                    variants={downAnimation(1.2, 0.7)}
                    initial="hidden"
                    whileInView={"visible"}
                    className="w-full flex justify-center items-center gap-x-5 gap-y-2 md:gap-8 flex-wrap">
                    {
                        foodCategories.map((category, index) =>
                            <button key={index} onClick={() => setSelectedCategory(category.toLowerCase())}
                                className={`text-white py-2 font-body ${selectedCategory === category.toLowerCase() ? "active-menu-link" : "menu-link"}`}>
                                {category}
                            </button>)
                    }
                </motion.div>

                {/* filter options */}
                <motion.div
                    variants={upAnimation(1.2, 1)}
                    initial="hidden"
                    whileInView={"visible"}
                    className="w-full flex justify-end items-center font-body">
                    <select name="foodOrigin" id="foodOrigin" defaultValue={selectedOrigin}
                        onChange={e => {
                            const selectedFoodOrigin = e.target.value;
                            setSelectedOrigin(selectedFoodOrigin);
                        }}
                        className="bg-[#ffffff00] text-white border-[1px] px-5 py-1 border-[#313131] focus:outline-none focus:border-lightBlack">
                        {
                            foodOriginList.map((origin, index) =>
                                <option key={index} value={origin} className="capitalize">{origin}</option>)
                        }
                    </select>
                </motion.div>

                {/* showing menu list */}
                {
                    allMenus.length === 0 ?
                        <p className="text-2xl text-lightWhite text-center font-body mt-10">Oops! No item available!</p>
                        :
                        <motion.div
                            variants={fadeAnimation(1.5, 0)}
                            initial="hidden"
                            whileInView={"visible"}
                            className="w-full mt-5 grid grid-cols-1 lg:grid-cols-2 gap-10 justify-center items-center">
                            {
                                allMenus.map((singleMenu, index) =>
                                    <SingleMenuList key={index} singleMenu={singleMenu}></SingleMenuList>
                                )
                            }
                        </motion.div>
                }
            </div>

        </div>
    );
};

export default OurMenus;