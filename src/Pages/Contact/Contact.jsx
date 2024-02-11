import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion"
import useUpAnimation from "../../Hooks/useUpAnimation/useUpAnimation";
import useRightAnimation from "../../Hooks/useRightAnimation/useRightAnimation";
import useScrollToTop from "../../Hooks/useScrollToTop/useScrollToTop";
import { useEffect } from "react";


const bgImg = "https://i.ibb.co/Jpbs9D7/snezhana-hulak-TUc-AOOHd-Mek-unsplash-2.jpg";
const img1 = "https://i.ibb.co/7RLVCyP/christoffer-engstrom-h0iw5llyk-Ts-unsplash-1.jpg";
const img2 = "https://i.ibb.co/fdNsdhd/coffee-bg-1.jpg";


const Contact = () => {

    // hooks
    const upAnimation = useUpAnimation();
    const rightAnimation = useRightAnimation();
    const scrollToTop = useScrollToTop();

    useEffect(() => {
        scrollToTop();
    }, [scrollToTop])



    return (
        <div className="mx-auto overflow-x-hidden">
            {/* page heading section */}
            <div
                className="h-[400px] md:h-[450px] lg:h-[500px] flex flex-col justify-center items-center gap-4"
                style={{
                    background: `linear-gradient(to top, #000000a6, #000000a6), url(${bgImg})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }}>
                <motion.h1
                    variants={upAnimation(1.2, 0)}
                    initial="hidden"
                    whileInView={"visible"}
                    className="text-5xl uppercase md:text-7xl font-heading text-center mt-[100px]">Contact Us</motion.h1>
            </div>


            {/* contact information */}
            <div className="mt-14 container mx-auto flex flex-col md:flex-row justify-start items-center gap-10 px-5 lg:px-10 py-7">
                <motion.div
                    variants={rightAnimation(1.2, 0.4)}
                    initial="hidden"
                    whileInView={"visible"}
                    className="w-full md:w-1/2">
                    <img src={img1} alt="" className="rounded-t-[250px] max-h-[720px] w-full" />
                </motion.div>

                <div className="w-full md:w-1/2 flex flex-col justify-start items-start gap-5 lg:gap-7">
                    <SectionTitle smallText={"Our location"} bigText={"Where to find us"} />
                    <p className="font-body text-lightWhite">

                        Discover the inviting haven of Caffeina at 123 Main Street in the heart of Anytown, USA. Nestled on this charming street, our cozy abode awaits, inviting you to indulge in the exquisite flavors we have to offer. Join us for a delightful experience, where the comforting aroma of brewed coffee mingles with the warmth of a welcoming environment. Your journey to Caffeina begins at our idyllic location on 123 Main Street.
                    </p>
                    <p className="flex justify-center items-center gap-2 font-body text-lightWhite"><FaMapMarkerAlt /> 123 Main Street, Anytown, USA </p>
                    <p className="flex justify-center items-center gap-2 font-body text-lightWhite"><FaPhoneAlt />(555) 123-4567 </p>
                    <p className="flex justify-center items-center gap-2 font-body text-lightWhite"><FaEnvelope /> caffeina@haven.com </p>
                </div>
            </div>

            {/* newsletter section */}
            <div className="py-[130px] mt-14 px-5 md:px-10"
                style={{
                    background: `linear-gradient(to top, #000000a6, #000000a6), url(${img2})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundAttachment: 'fixed'
                }}>
                <SectionTitle smallText={"Get In Touch"} bigText={"Subscribe To Our Newsletter"} />
                <div className="mt-5 flex justify-start items-center gap-5">
                    <input type="email" name="" id="" className="bg-main px-5 py-4 font-body focus:outline-none" placeholder="Enter your mail" />
                    <input type="submit" value="Subscribe" className="bg-second px-5 py-3 font-heading text-xl cursor-pointer hover:bg-third duration-500" />
                </div>

            </div>



        </div>
    );
};

export default Contact;