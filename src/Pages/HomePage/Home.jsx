import About from "./About";
import Slider from "./Slider";
import WhyUs from "./WhyUs";
import WorkingHours from "./WorkingHours";


const Home = () => {
    return (
        <div>
            <Slider />
            <About />
            <WhyUs />
            <WorkingHours />
        </div>
    );
};

export default Home;