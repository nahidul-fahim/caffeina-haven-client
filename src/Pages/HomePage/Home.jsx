import InstagramPost from "../../Components/InstagramPost/InstagramPost";
import About from "./About";
import HomePageMenus from "./HomePageMenus";
import Slider from "./Slider";
import WhyUs from "./WhyUs";
import WorkingHours from "./WorkingHours";


const Home = () => {
    return (
        <div>
            <Slider />
            <About />
            <WhyUs />
            <HomePageMenus />
            <InstagramPost />
            <WorkingHours />
        </div>
    );
};

export default Home;