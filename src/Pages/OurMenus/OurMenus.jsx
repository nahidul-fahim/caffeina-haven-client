import { useState } from "react";
import LoadingAnimation from "../../Components/LoadingAnimation/LoadingAnimation";
import SingleMenuList from "../../Components/SingleMenuList/SingleMenuList";
import useAllMenus from "../../Hooks/useAllMenus/useAllMenus";


const bgImg = "https://i.ibb.co/R7zFLT7/home-bg-8-1.jpg";

// const foodOriginList = ["american", "bangladeshi", "chinese", "french", "indian", "italian", "japanese", "korean", "mexican", "moroccan", "thai", "turkish"];

const foodCategories = ["All", "Bakery", "Beverages", "Desserts", "Salads", "Sandwiches", "Soups"];

const OurMenus = () => {


    // hooks and custom hooks
    const [selectedCategory, setSelectedCategory] = useState("all");
    const { allMenusPending, allMenus } = useAllMenus(selectedCategory);



    // conditional loading
    if (allMenusPending) {
        return <LoadingAnimation />
    }



    return (
        <div className="mx-auto">
            {/* page heading section */}
            <div
                className="h-[500px] flex flex-col justify-center items-center gap-4"
                style={{
                    background: `linear-gradient(to top, #000000a6, #00000059), url(${bgImg})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }}>
                <h1 className="text-5xl uppercase md:text-7xl font-heading text-center mt-[100px]">Our Menu</h1>
            </div>

            {/* page content section */}
            <div className="container mx-auto p-5 flex flex-col justify-center items-center gap-10">

                {/* food category tab selection */}
                <div className="w-full flex justify-center items-center gap-x-5 gap-y-2 md:gap-8 flex-wrap">
                    {
                        foodCategories.map((category, index) =>
                            <button key={index} onClick={() => setSelectedCategory(category.toLowerCase())}
                                className={`text-white py-2 font-body ${selectedCategory === category.toLowerCase() ? "active-menu-link" : "menu-link"}`}>
                                {category}
                            </button>)
                    }
                </div>

                {/* showing menu list */}
                {
                    allMenus.length === 0 ?
                        <p className="text-2xl text-lightWhite text-center font-body mt-10">Oops! No item available!</p>
                        :
                        <div className="w-full mt-5 grid grid-cols-1 lg:grid-cols-2 gap-10 justify-center items-center">
                            {
                                allMenus.map((singleMenu, index) =>
                                    <SingleMenuList key={index} singleMenu={singleMenu}></SingleMenuList>
                                )
                            }
                        </div>
                }
            </div>




        </div>
    );
};

export default OurMenus;