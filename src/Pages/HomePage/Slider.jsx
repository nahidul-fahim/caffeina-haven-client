import { Link } from "react-router-dom";
import { Zoom } from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ButtonSecond from "../../Components/ButtonSecond/ButtonSecond";


const sliderImg1 = "https://i.ibb.co/2gcynV3/st-coffee2-jpg.webp";
const sliderImg2 = "https://i.ibb.co/xM81mdR/st-coffee5-jpg.webp";
const sliderImg3 = "https://i.ibb.co/3pt67Pp/st-coffee6-jpg.webp";

const Slider = () => {




    const properties = {
        prevArrow: <button className='button-style button-style-left'><FaArrowLeft /></button>,
        nextArrow: <button className='button-style button-style-right'><FaArrowRight /></button>
    }



    return (
        <Zoom {...properties} scale={0.6} pauseOnHover={false}>

            {/* slider 1 */}
            <div className="each-slide-effect relative">
                <div style={{
                    backgroundImage: `linear-gradient(to right, #121a1dd9, #00000050) , url(${sliderImg2})`,
                }}>
                    <span className='container flex flex-col justify-center items-center'>
                        <p className="text-white uppercase font-body font-semibold slider-top-text">Welcome to caffeina</p>
                        <h2 className='text-[50px] md:text-[70px] lg:text-[110px] z-50 font-normal text-center text-white uppercase font-heading'>Coffee & Chocolate</h2>
                        <div className="w-full flex justify-center items-center gap-2">
                            <Link to="/">
                                <ButtonSecond buttonText={"Book A Table"} />
                            </Link>

                            <Link to="/">
                                <button className='text-white font-medium uppercase font-heading px-6 md:px-8 py-3 md:py-4 hover:scale-105 duration-500 group flex justify-center items-center gap-2'>Open Menu</button>
                            </Link>
                        </div>
                    </span>
                </div>
            </div>

            {/* slider 2 */}
            <div className="each-slide-effect relative">
                <div style={{
                    backgroundImage: `linear-gradient(to right, #121a1dd9, #00000050) , url(${sliderImg3})`,
                }}>
                    <span className='container flex flex-col justify-center items-center'>
                        <p className="text-white uppercase font-body font-semibold slider-top-text">Hello! new friend</p>
                        <h2 className='text-[50px] md:text-[70px] lg:text-[110px] z-50 font-normal text-center text-white uppercase font-heading'>Reserve your table</h2>
                        <div className="w-full flex justify-center items-center gap-2">
                            <Link to="/">
                                <ButtonSecond buttonText={"Book A Table"} />
                            </Link>

                            <Link to="/">
                                <button className='text-white font-medium uppercase font-heading px-6 md:px-8 py-3 md:py-4 hover:scale-105 duration-500 group flex justify-center items-center gap-2'>Open Menu</button>
                            </Link>
                        </div>
                    </span>
                </div>
            </div>

            {/* slider 3 */}
            <div className="each-slide-effect relative">
                <div style={{
                    backgroundImage: `linear-gradient(to right, #121a1dd9, #00000050) , url(${sliderImg1})`,
                }}>
                    <span className='container flex flex-col justify-center items-center'>
                    <p className="text-white uppercase font-body font-semibold slider-top-text">Make your day</p>
                        <h2 className='text-[50px] md:text-[70px] lg:text-[110px] z-50 font-normal text-center text-white uppercase font-heading'>Visit our place</h2>
                        <div className="w-full flex justify-center items-center gap-2">
                            <Link to="/">
                                <ButtonSecond buttonText={"Book A Table"} />
                            </Link>

                            <Link to="/">
                                <button className='text-white font-medium uppercase font-heading px-6 md:px-8 py-3 md:py-4 hover:scale-105 duration-500 group flex justify-center items-center gap-2'>Open Menu</button>
                            </Link>
                        </div>
                    </span>
                </div>
            </div>




        </Zoom>
    );
};

export default Slider;