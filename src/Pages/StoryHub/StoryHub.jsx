

const bgImg = "https://i.ibb.co/fdNsdhd/coffee-bg-1.jpg";

const StoryHub = () => {
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
                {/* <h1 className="text-5xl uppercase md:text-7xl font-heading text-center mt-[100px]">Share Memories</h1> */}
                {/* post box for user to post something */}
                <div className="mt-[100px] h-[150px] bg-[#0e0e0e77] rounded-[10px] w-[95%] md:w-[950px]">

                </div>

            </div>

            {/* page content section */}
            <div className="container mx-auto p-5 flex flex-col justify-center items-center gap-10">


            </div>

        </div>
    );
};

export default StoryHub;