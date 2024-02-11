

const useFadeAnimation = () => {


    const fadeAnimation = (duration, delay) => {
        return {
            hidden: {
                opacity: 0,
            },
            visible: {
                opacity: 1,
                transition: {
                    type: 'spring',
                    duration: duration,
                    bounce: 0.1,
                    delay: delay,
                }
            }
        }
    }


    return fadeAnimation;
};

export default useFadeAnimation;