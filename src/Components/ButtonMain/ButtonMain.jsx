import { FaArrowRightLong } from "react-icons/fa6";


const ButtonMain = ({ buttonText }) => {
    return (
        <button className='text-white bg-second font-medium uppercase font-heading px-6 md:px-7 py-3 hover:text-white hover:translate-y-[-5px] duration-500 group flex justify-center items-center gap-2'>
            <span>{buttonText}</span>
            <FaArrowRightLong className="hidden group-hover:flex text-white duration-500" />
        </button>
    );
};

export default ButtonMain;