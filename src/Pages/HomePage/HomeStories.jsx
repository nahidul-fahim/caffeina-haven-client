import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation } from 'swiper/modules';
import CenteredSectionTitle from '../../Components/CenteredSectionTitle/CenteredSectionTitle';
import { Link } from 'react-router-dom';
import ButtonMain from '../../Components/ButtonMain/ButtonMain';
import useAxiosPublic from '../../Hooks/useAxiosPublic/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const HomeStories = () => {


    // hooks
    const axiosPublic = useAxiosPublic();

    // data fetch
    const { isPending: storiesPending, data: stories } = useQuery({
        queryKey: ["home-stories"],
        queryFn: async () => {
            const res = await axiosPublic.get("/latestStoriesForHomeApi");
            return res.data;
        }
    })


    // conditional loading
    if (storiesPending) {
        return <p className="font-heading text-lightWhite text-center">Loading....</p>
    }


    return (
        <div className="mt-[30px] md:mt-[50px] lg:mt-[70px] container mx-auto flex flex-col justify-center items-center gap-10 px-5 py-10">

            <CenteredSectionTitle smallText={"Memories"} bigText={"What People are sharing"} />

            {/* story slider */}
            <Swiper className='w-full'
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={1}
                height={'350px'}
                navigation
                breakpoints={{
                    480: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 30
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 40
                    },
                }}
            >
                {
                    stories?.map((story, index) => <SwiperSlide key={index}
                        style={{
                            height: '350px',
                            background: `linear-gradient(to top, #000000cc, #000000d9), url(${story?.postImage})`,
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        className='bg-second border-[1px] border-lightBlack p-5 border-dotted font-body'>
                        <span className='font-heading text-second text-xl font-semibold mb-3 uppercase'>{story?.userName}</span>
                        {story?.userPost}
                        <span className='mt-3 text-lightWhite text-[16px]'>{story?.postDate}</span>
                    </SwiperSlide>)
                }
            </Swiper>


            <Link to={"/storyHub"}><ButtonMain buttonText={"Story Hub"} /></Link>
        </div >
    );
};

export default HomeStories;