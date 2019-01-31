import posed from 'react-pose';

// Animated div components
export const AnimatedDiv = posed.div({
    empty: {
        scale: 1
    },
    // nonEmpty: { 
    //     opacity: 1,
    //     scale: 1.3  ,
    //     transition: {
    //         scale: {
    //         type: 'spring',
    //             stiffness: 200,
    //             delay: 0
    //         }
    //   }
    // }
    nonEmpty: {
        opacity: 1,
        scale: 1.2,
        transition: {
          type: 'spring',
          stiffness: 200,
          damping: 0
        }
    }
});
