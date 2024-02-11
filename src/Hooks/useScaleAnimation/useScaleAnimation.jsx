

const useScaleAnimation = () => {

    const scaleAnimation = (duration, delay) => {
        return {
            hidden: {
                opacity: 0,
                scale: 0,
            },
            visible: {
                opacity: 1,
                scale: 1,
                transition: {
                    type: 'spring',
                    duration: duration,
                    bounce: 0.1,
                    delay: delay,
                }
            }
        }
    }

    return scaleAnimation;
};

export default useScaleAnimation;