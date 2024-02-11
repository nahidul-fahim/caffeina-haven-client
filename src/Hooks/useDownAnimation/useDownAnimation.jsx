

const useDownAnimation = () => {


    const downAnimation = (duration, delay) => {
        return {
            hidden: {
                opacity: 0.4,
                y: '-100vh'
            },
            visible: {
                opacity: 1,
                y: 0,
                transition: {
                    type: 'spring',
                    duration: duration,
                    bounce: 0.1,
                    delay: delay,
                }
            }
        }
    }

    return downAnimation;
};

export default useDownAnimation;