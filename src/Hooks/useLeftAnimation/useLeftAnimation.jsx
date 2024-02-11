

const useLeftAnimation = () => {


    const leftAnimation = (duration, delay) => {
        return {
            hidden: {
                opacity: 0.4,
                x: '100vw'
            },
            visible: {
                opacity: 1,
                x: 0,
                transition: {
                    type: 'spring',
                    duration: duration,
                    bounce: 0.1,
                    delay: delay,
                }
            }
        }
    }


    return leftAnimation;
};

export default useLeftAnimation;