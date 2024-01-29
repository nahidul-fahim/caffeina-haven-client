


const SectionTitle = ({ smallText, bigText }) => {
    return (
        <div>
            <p className="text-lightWhite uppercase font-body font-semibold section-top-text flex gap-2 items-center mb-2">{smallText}</p>
            <h2 className="text-35px md:text-[40px] lg:text-[50px] leading-tight font-heading text-white capitalize">{bigText}</h2>
        </div>
    );
};

export default SectionTitle;