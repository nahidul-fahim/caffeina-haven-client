import useDownAnimation from "../../Hooks/useDownAnimation/useDownAnimation";
import { motion } from "framer-motion"


const SectionTitle = ({ smallText, bigText }) => {

    // animations
    const downAnimation = useDownAnimation();


    return (
        <motion.div
            variants={downAnimation(1.1, 0)}
            initial="hidden"
            whileInView="visible"
        >
            <p className="text-second uppercase text-[17px] font-body section-top-text flex gap-2 items-center mb-2">{smallText}</p>
            <h2 className="text-[40px] uppercase lg:text-[50px] leading-tight font-heading text-white">{bigText}</h2>
        </motion.div>
    );
};

export default SectionTitle;