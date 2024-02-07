import { Link } from "react-router-dom";
import ButtonMain from "../../Components/ButtonMain/ButtonMain";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";


const img1 = "https://i.ibb.co/xqzG92t/st-coffee10.jpg";

const WorkingHours = () => {
    return (
        <div className="mt-[30px] md:mt-[50px] lg:mt-[70px] p-10 lg:p-[80px]"
            style={{
                backgroundImage: `linear-gradient(to right, #00000099, #00000073), url(${img1})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed',
                backgroundRepeat: 'no-repeat'
            }}>
            <div className="container mx-auto p-5 flex flex-col md:flex-row justify-between items-center">

                {/* title  */}
                <div className="flex flex-col justify-center items-start gap-5">
                    <SectionTitle smallText={"Reservation"} bigText={"Working hours"} />
                    <Link to={"/findATable"}><ButtonMain buttonText={"Book table"} /></Link>
                </div>


                {/* reservation time */}
                <div className="bg-third px-[40px] lg:px-[80px] py-[70px] mt-10 md:mt-0">
                    <p className="font-body uppercase text-second text-center font-semibold">Monday to Friday</p>
                    <p className="font-heading text-2xl text-white text-center mt-4">09 : 00</p>
                    <p className="font-heading text-2xl text-white text-center">22 : 00</p>

                    <p className="font-body uppercase text-second text-center font-semibold mt-8">Saturday to Sunday</p>
                    <p className="font-heading text-2xl text-white text-center mt-4">11 : 00</p>
                    <p className="font-heading text-2xl text-white text-center">19 : 00</p>

                </div>
            </div>
        </div>
    );
};

export default WorkingHours;