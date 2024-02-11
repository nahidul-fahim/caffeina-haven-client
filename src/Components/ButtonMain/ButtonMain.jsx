import { FaArrowRightLong } from "react-icons/fa6";
import useUpAnimation from "../../Hooks/useUpAnimation/useUpAnimation";
import { motion } from "framer-motion"


const ButtonMain = ({ buttonText }) => {

    // animation hooks
    const upAnimation = useUpAnimation();


    return (
        <motion.button
            variants={upAnimation(0.4, 0)}
            initial="hidden"
            whileInView={"visible"}
            className='text-white bg-second font-medium uppercase font-heading px-6 md:px-7 py-3 hover:text-white hover:translate-y-[-5px] duration-500 group flex justify-center items-center gap-2'>
            <span>{buttonText}</span>
            <FaArrowRightLong className="hidden group-hover:flex text-white duration-500" />
        </motion.button>
    );
};

export default ButtonMain;