import { useEffect } from "react";
import InstagramPost from "../../Components/InstagramPost/InstagramPost";
import useScrollToTop from "../../Hooks/useScrollToTop/useScrollToTop";
import About from "./About";
import HomePageMenus from "./HomePageMenus";
import HomeStories from "./HomeStories";
import Slider from "./Slider";
import WhyUs from "./WhyUs";
import WorkingHours from "./WorkingHours";


const Home = () => {

    // hooks
    const scrollToTop = useScrollToTop();

    useEffect(() => {
        scrollToTop();
    }, [scrollToTop])


    return (
        <div>
            <Slider />
            <About />
            <WhyUs />
            <HomePageMenus />
            <InstagramPost />
            <HomeStories />
            <WorkingHours />
        </div>
    );
};

export default Home;