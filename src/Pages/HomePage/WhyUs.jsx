import CenteredSectionTitle from "../../Components/CenteredSectionTitle/CenteredSectionTitle";
import { MdRestaurantMenu } from "react-icons/md";
import { GiCoffeeCup } from "react-icons/gi";
import { SiCodechef } from "react-icons/si";
import useFadeAnimation from "../../Hooks/useFadeAnimation/useFadeAnimation";
import { motion } from "framer-motion";




const WhyUs = () => {

    // animation hook
    const fadeAnimation = useFadeAnimation();



    return (
        <div className="container mx-auto p-5 mt-[30px] md:mt-[50px] lg:mt-[70px]">
            <CenteredSectionTitle smallText={"Features"} bigText={"Why People Choose Us?"} />

            <motion.div
                variants={fadeAnimation(1.7, 0.1)}
                initial="hidden"
                whileInView={"visible"}
                className="flex flex-col lg:flex-row justify-between items-center gap-[30px] lg:gap-[50px] mt-10 lg:mt-14">

                {/* card 1 */}
                <div className="flex flex-col justify-center items-center gap-4 w-full md:w-2/3 lg:w-1/3 bg-third px-5 py-10 border-dotted border-lightBlack border-[1px] hover:shadow-[0_0_50px_#61616133] duration-300 self-stretch">
                    <MdRestaurantMenu className="text-[100px] text-lightWhite" />
                    <h3 className="text-3xl text-center font-heading">Menu for every taste</h3>
                    <p className="text-lightWhite font-body text-center">Discover a menu tailored to satisfy every palate, where flavors harmonize to create a culinary symphony.</p>
                </div>

                {/* card 2 */}
                <div className="flex flex-col justify-center items-center gap-4 w-full md:w-2/3 lg:w-1/3 bg-third px-5 py-10 border-dotted border-lightBlack border-[1px] hover:shadow-[0_0_50px_#61616133] duration-300 self-stretch">
                    <GiCoffeeCup className="text-[100px] text-lightWhite" />
                    <h3 className="text-3xl text-center font-heading">Menu for every taste</h3>
                    <p className="text-lightWhite font-body text-center">Every cup tells a story of excellence, ensuring a consistently exceptional coffee experience.</p>
                </div>

                {/* card 3 */}
                <div className="flex flex-col justify-center items-center gap-4 w-full md:w-2/3 lg:w-1/3 bg-third px-5 py-10 border-dotted border-lightBlack border-[1px] hover:shadow-[0_0_50px_#61616133] duration-300 self-stretch">
                    <SiCodechef className="text-[100px] text-lightWhite" />
                    <h3 className="text-3xl text-center font-heading">Experienced chefs</h3>
                    <p className="text-lightWhite font-body text-center">Experience culinary mastery with our seasoned chefs, crafting delectable dishes that redefine the art of flavor.</p>
                </div>
            </motion.div>
        </div>
    );
};

export default WhyUs;