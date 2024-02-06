


const SectionTitle = ({ smallText, bigText }) => {
    return (
        <div>
            <p className="text-second uppercase text-[17px] font-body section-top-text flex gap-2 items-center mb-2">{smallText}</p>
            <h2 className="text-[40px] uppercase lg:text-[50px] leading-tight font-heading text-white">{bigText}</h2>
        </div>
    );
};

export default SectionTitle;