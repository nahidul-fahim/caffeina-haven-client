import useDownAnimation from "../../Hooks/useDownAnimation/useDownAnimation";
import { motion } from "framer-motion";

const CenteredSectionTitle = ({ smallText, bigText }) => {

    // animation
    const downAnimation = useDownAnimation();




    return (
        <motion.div
            variants={downAnimation(1.1, 0)}
            initial="hidden"
            whileInView="visible">
            <p className="section-top-text text-second uppercase font-body text-center flex flex-col gap-2 items-center mb-1">{smallText}</p>
            <h2 className="text-[40px] text-center lg:text-[50px] leading-tight font-heading text-white uppercase">{bigText}</h2>
        </motion.div>
    );
};

export default CenteredSectionTitle;