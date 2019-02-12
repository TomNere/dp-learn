import posed from 'react-pose';

// Animated div components
export const AnimatedDiv = posed.div({
    empty: {
        scale: 1,
        x: 0
    },
    match: {
        scale: 1.2,
        transition: {
          type: 'spring',
          stiffness: 700,
          damping: 0,
        }
    },
    noMatch: {
        x: -5,
        transition: {
            type: 'spring',
            stiffness: 1000,
            damping: 0,
        }
    }
});
