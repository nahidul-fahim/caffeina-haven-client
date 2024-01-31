import { FaArrowRightLong } from "react-icons/fa6";

const ButtonSecond = ({ buttonText }) => {
    return (
        <button className='text-white font-medium border-2 uppercase font-heading border-white px-5 md:px-5 py-2 hover:text-black hover:bg-white hover:translate-y-[-5px] duration-500 group flex justify-center items-center gap-2'>
            <span>{buttonText}</span>
            <FaArrowRightLong className="hidden group-hover:flex text-second duration-500" />
        </button>
    );
};

export default ButtonSecond;