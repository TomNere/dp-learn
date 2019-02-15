import posed from 'react-pose';

// Animated div components
export const AnimatedDiv = posed.div({
    empty: {
        scale: 1,
        x: 0
    },
    match: {
        scale: 1.1,
        transition: {
          type: 'spring',
          stiffness: 500,
          damping: 0,
        }
    },
    noMatch: {
        x: -3,
        transition: {
            type: 'spring',
            stiffness: 500,
            damping: 0,
        }
    }
});
