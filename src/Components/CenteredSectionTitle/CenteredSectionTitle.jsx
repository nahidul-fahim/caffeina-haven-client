

const CenteredSectionTitle = ({ smallText, bigText }) => {



    return (
        <div>
            <p className="section-top-text text-second uppercase font-body text-center flex flex-col gap-2 items-center mb-1">{smallText}</p>
            <h2 className="text-[40px] text-center lg:text-[50px] leading-tight font-heading text-white uppercase">{bigText}</h2>
        </div>
    );
};

export default CenteredSectionTitle;