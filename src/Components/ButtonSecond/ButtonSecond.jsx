import { FaArrowRightLong } from "react-icons/fa6";

const ButtonSecond = ({ buttonText }) => {
    return (
        <button className='text-white font-medium border-2 uppercase font-heading border-white px-6 md:px-8 py-3 md:py-4 hover:text-white hover:border-third hover:bg-third hover:scale-105 duration-500 group flex justify-center items-center gap-2'>
            <span>{buttonText}</span>
            <FaArrowRightLong className="hidden group-hover:flex duration-500" />
        </button>
    );
};

export default ButtonSecond;