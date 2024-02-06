import { Link } from "react-router-dom";
import ButtonMain from "../../Components/ButtonMain/ButtonMain";
import CenteredSectionTitle from "../../Components/CenteredSectionTitle/CenteredSectionTitle";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";


// image url
const bgImg = "https://i.ibb.co/PrKSzcT/coffee-bg.jpg"
const img1 = "https://i.ibb.co/f4Y0n9W/brooke-cagle-9f-HMo1-5-Io8-unsplash-2.jpg";
const iImg2 = "https://i.ibb.co/nMjL60G/mike-marquez-384421-unsplash.jpg";


const img19 = "https://i.ibb.co/ygVGcbY/ig-9.jpg";
const img2 = "https://i.ibb.co/DpkZVRd/coffee-1.jpg";
const img3 = "https://i.ibb.co/6JmNTGC/coffee-2.jpg";
const img4 = "https://i.ibb.co/vHjbJKf/ig-20.jpg";
const img5 = "https://i.ibb.co/CW9zP8T/blog-5-140x140-jpg.webp";
const img6 = "https://i.ibb.co/PrKSzcT/coffee-bg.jpg ";
const img7 = "https://i.ibb.co/MSQTgnX/food-3.jpg";
const img8 = "https://i.ibb.co/D4ZXrpN/st-coffee8.jpg";
const img9 = "https://i.ibb.co/v3xhWys/restaurant.jpg";
const img10 = "https://i.ibb.co/YLBvjBt/ig-7-255x255.jpg";
const img11 = "https://i.ibb.co/QYm3VD8/coffee-4.jpg";
const img12 = "https://i.ibb.co/MnfLLcc/ig-16.jpg";
const img13 = "https://i.ibb.co/QfWCSx9/ig-19-370x370.jpg";
const img14 = "https://i.ibb.co/yyS7ykV/ig-4-300x300.jpg";
const img15 = "https://i.ibb.co/kGB5dvN/coffee-bg-1.jpg";





const AboutUs = () => {




    return (
        <div className="mx-auto">
            {/* page heading section */}
            <div
                className="h-[400px] md:h-[450px] lg:h-[500px] flex flex-col justify-center items-center gap-4"
                style={{
                    background: `linear-gradient(to top, #000000a6, #000000a6), url(${bgImg})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }}>
                <h1 className="text-5xl uppercase md:text-7xl font-heading text-center mt-[100px]">About Us</h1>
            </div>


            {/* about section */}
            <div className="mt-14 container mx-auto flex justify-start items-center gap-10 px-10 py-7">
                <div className="w-1/2">
                    <img src={img1} alt="" className="rounded-t-[250px]" />
                </div>

                <div className="w-1/2 flex flex-col justify-start items-start gap-7">
                    <SectionTitle smallText={"Welcome to Caffeina!"} bigText={"Our Story"} />
                    <p className="font-body text-lightWhite">

                        Welcome to Caffeina, where passion for flavor meets a cozy ambiance. Our culinary journey is a celebration of diverse tastes, blending global inspirations with local ingredients.
                        <br /><br />
                        At Caffeina, we craft more than just meals; we create experiences. Indulge in a symphony of flavors, from aromatic coffee brews to delectable bites. Our menu is a testament to our commitment to quality and innovation, offering a fusion of traditional and modern dishes.
                        <br /><br />
                        Join us in savoring the art of dining. Explore our menu and let your taste buds embark on a delightful adventure. Click below to discover the gastronomic delights that await you.
                    </p>

                    <Link to={"/allMenus"}><ButtonMain buttonText={"View Menus"} /></Link>
                </div>
            </div>

            {/* instagram post */}
            <div className="w-full mx-auto relative mt-14">
                <div className="grid grid-cols-6 gap-2">
                    <img src={img19} alt="" className="col-span-2 row-span-2 justify-self-stretch" />
                    <img src={img2} alt="" className="self-stretch justify-self-stretch" />
                    <img src={img3} alt="" className="self-stretch justify-self-stretch" />
                    <img src={img4} alt="" className="col-span-2 row-span-2 self-stretch justify-self-stretch" />
                    <img src={img5} alt="" className="self-stretch justify-self-stretch" />
                    <img src={img6} alt="" className="self-stretch justify-self-stretch" />
                    <img src={img7} alt="" className="self-stretch justify-self-stretch" />
                    <img src={img8} alt="" className="self-stretch justify-self-stretch" />
                    <img src={img9} alt="" className="col-span-2 row-span-2 self-stretch justify-self-stretch" />
                    <img src={img10} alt="" className="self-stretch justify-self-stretch" />
                    <img src={img11} alt="" className="self-stretch justify-self-stretch" />
                    <img src={img12} alt="" className="self-stretch justify-self-stretch" />
                    <img src={img13} alt="" className="self-stretch justify-self-stretch" />
                    <img src={img14} alt="" className="self-stretch justify-self-stretch" />
                    <img src={img15} alt="" className="self-stretch justify-self-stretch" />
                </div>

                <div className="bg-white w-[300px] h-[300px] rounded-[50%] flex justify-center items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[99] text-second hover:text-main duration-300">
                    <p className="text-center font-body font-medium capitalize text-2xl">Follow Us on <br />Instagram</p>
                </div>
            </div>


            {/* philosophy section */}
            <div className="mt-14 container mx-auto flex justify-start items-center gap-10 px-10 py-7">

                <div className="w-1/2 flex flex-col justify-start items-start gap-7">
                    <SectionTitle smallText={"Great experience with us"} bigText={"Our Philosophy"} />
                    <p className="font-body text-lightWhite">
                        Step into the warm embrace of Caffeina, where every corner is infused with a welcoming ambiance.
                        <br /><br />
                        At Caffeina, we prioritize sustainability, striving to minimize our ecological footprint. Our commitment to a green environment extends from sourcing local, eco-friendly ingredients to employing energy-efficient practices. Feel the harmony of a space that not only delights your palate but also nurtures a connection with nature.
                        <br /><br />
                        Join us in creating memories within an environment that reflects our dedication to both your enjoyment and the planet.
                    </p>
                    <Link to={"/findATable"}><ButtonMain buttonText={"Reservation"} /></Link>
                </div>

                <div className="w-1/2">
                    <img src={iImg2} alt="" className="rounded-t-[250px]" />
                </div>
            </div>

        </div>

    );
};

export default AboutUs;