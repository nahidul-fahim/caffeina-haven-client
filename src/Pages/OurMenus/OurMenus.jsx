import LoadingAnimation from "../../Components/LoadingAnimation/LoadingAnimation";
import SingleMenuList from "../../Components/SingleMenuList/SingleMenuList";
import useAllMenus from "../../Hooks/useAllMenus/useAllMenus";


const bgImg = "https://i.ibb.co/R7zFLT7/home-bg-8-1.jpg";

const foodOriginList = ["american", "bangladeshi", "chinese", "french", "indian", "italian", "japanese", "korean", "mexican", "moroccan", "thai", "turkish"];

const OurMenus = () => {


    // hooks and custom hooks
    const { allMenusPending, allMenus, allMenusRefetch } = useAllMenus();


    if (allMenusPending) {
        return <LoadingAnimation />
    }

    console.log(allMenus);



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
                <h1 className="text-5xl uppercase md:text-7xl font-heading text-center">Our Menu</h1>
            </div>

            {/* page content section */}
            <div className="container mx-auto p-5">
                {/* showing menu list */}
                <div className="grid grid-cols-2 gap-10 justify-center items-center">
                    {
                        allMenus.map((singleMenu, index) =>
                            <SingleMenuList key={index} singleMenu={singleMenu}></SingleMenuList>
                        )
                    }
                </div>
            </div>




        </div>
    );
};

export default OurMenus;