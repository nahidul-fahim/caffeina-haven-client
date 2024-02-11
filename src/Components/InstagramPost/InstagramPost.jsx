import useFadeAnimation from "../../Hooks/useFadeAnimation/useFadeAnimation";
import { motion } from "framer-motion";


const img19 = "https://i.ibb.co/ygVGcbY/ig-9.jpg";
const img2 = "https://i.ibb.co/DpkZVRd/coffee-1.jpg";
const img3 = "https://i.ibb.co/6JmNTGC/coffee-2.jpg";
const img4 = "https://i.ibb.co/vHjbJKf/ig-20.jpg";
const img5 = "https://i.ibb.co/CW9zP8T/blog-5-140x140-jpg.webp";
const img6 = "https://i.ibb.co/PrKSzcT/coffee-bg.jpg ";
const img7 = "https://i.ibb.co/MSQTgnX/food-3.jpg";
const img8 = "https://i.ibb.co/D4ZXrpN/st-coffee8.jpg";
const img9 = "https://i.ibb.co/v3xhWys/restaurant.jpg";
const img10 = "https://i.ibb.co/YLBvjBt/ig-7-255x255.jpg";
const img11 = "https://i.ibb.co/QYm3VD8/coffee-4.jpg";
const img12 = "https://i.ibb.co/MnfLLcc/ig-16.jpg";
const img13 = "https://i.ibb.co/QfWCSx9/ig-19-370x370.jpg";
const img14 = "https://i.ibb.co/yyS7ykV/ig-4-300x300.jpg";
const img15 = "https://i.ibb.co/kGB5dvN/coffee-bg-1.jpg";



const InstagramPost = () => {

    // hooks
    const fadeAnimation = useFadeAnimation();

    return (

        <div className="w-full mx-auto relative mt-14">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 opacity-70">
                <img src={img19} alt="" className="md:col-span-2 md:row-span-2 justify-self-stretch" />
                <img src={img2} alt="" className="self-stretch justify-self-stretch" />
                <img src={img3} alt="" className="self-stretch justify-self-stretch" />
                <img src={img4} alt="" className="md:col-span-2 md:row-span-2 self-stretch justify-self-stretch" />
                <img src={img5} alt="" className="self-stretch justify-self-stretch" />
                <img src={img6} alt="" className="self-stretch justify-self-stretch" />
                <img src={img7} alt="" className="self-stretch justify-self-stretch" />
                <img src={img8} alt="" className="self-stretch justify-self-stretch" />
                <img src={img9} alt="" className="md:col-span-2 md:row-span-2 self-stretch justify-self-stretch" />
                <img src={img10} alt="" className="self-stretch justify-self-stretch" />
                <img src={img11} alt="" className="self-stretch justify-self-stretch" />
                <img src={img12} alt="" className="self-stretch justify-self-stretch" />
                <img src={img13} alt="" className="self-stretch justify-self-stretch" />
                <img src={img14} alt="" className="self-stretch justify-self-stretch" />
                <img src={img15} alt="" className="self-stretch justify-self-stretch" />
            </div>

            <motion.div
                variants={fadeAnimation(1.4, .4)}
                initial="hidden"
                whileInView={"visible"}
                className="bg-white w-[250px] lg:w-[300px] h-[250px] lg:h-[300px] rounded-[50%] flex justify-center items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[99] text-second hover:text-main duration-300">
                <p className="text-center font-body font-medium capitalize text-2xl">Follow Us on <br />Instagram</p>
            </motion.div>
        </div>

    )
        ;
};

export default InstagramPost;