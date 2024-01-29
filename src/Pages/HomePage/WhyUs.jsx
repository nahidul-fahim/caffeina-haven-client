import CenteredSectionTitle from "../../Components/CenteredSectionTitle/CenteredSectionTitle";
import { MdRestaurantMenu } from "react-icons/md";
import { GiCoffeeCup } from "react-icons/gi";
import { SiCodechef } from "react-icons/si";




const WhyUs = () => {



    return (
        <div className="container mx-auto p-5 mt-[30px] md:mt-[50px] lg:mt-[70px]">
            <CenteredSectionTitle smallText={"Features"} bigText={"Why People Choose Us?"} />

            <div className="flex flex-col lg:flex-row justify-between items-center gap-[30px] lg:gap-[50px] mt-10 lg:mt-14">

                {/* card 1 */}
                <div className="flex flex-col justify-center items-center gap-4 w-full md:w-2/3 lg:w-1/3">
                    <MdRestaurantMenu className="text-[100px] text-lightWhite" />
                    <h3 className="text-3xl text-center font-heading">Menu for every taste</h3>
                    <p className="text-lightWhite font-body text-center">Discover a menu tailored to satisfy every palate, where flavors harmonize to create a culinary symphony.</p>
                </div>

                {/* card 2 */}
                <div className="flex flex-col justify-center items-center gap-4 w-full md:w-2/3 lg:w-1/3">
                    <GiCoffeeCup className="text-[100px] text-lightWhite" />
                    <h3 className="text-3xl text-center font-heading">Menu for every taste</h3>
                    <p className="text-lightWhite font-body text-center">Every cup tells a story of excellence, ensuring a consistently exceptional coffee experience.</p>
                </div>

                {/* card 3 */}
                <div className="flex flex-col justify-center items-center gap-4 w-full md:w-2/3 lg:w-1/3">
                    <SiCodechef className="text-[100px] text-lightWhite" />
                    <h3 className="text-3xl text-center font-heading">Experienced chefs</h3>
                    <p className="text-lightWhite font-body text-center">Experience culinary mastery with our seasoned chefs, crafting delectable dishes that redefine the art of flavor.</p>
                </div>
            </div>
        </div>
    );
};

export default WhyUs;