

const useRightAnimation = () => {

    const rightAnimation = (duration, delay) => {
        return {
            hidden: {
                opacity: 0,
                x: '-100px'
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

    return rightAnimation;
};

export default useRightAnimation;