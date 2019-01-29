import posed from 'react-pose';

// Animated div components
export const AnimatedDiv = posed.div({
    hidden: {
        opacity: 0.5,
        scale: 1
    },
    visible: { 
        opacity: 1,
        scale: 2,
        transition: {
            scale: {
            type: 'spring',
                stiffness: 100,
                delay: 200
            }
      }
    }
});
