import * as React from 'react';

import MathJax from 'react-mathjax2';
import { ReactNode } from 'react';

interface IFormulaProps {
    children: ReactNode
}

// Container showing asciimath formula
class Formula extends React.Component<IFormulaProps> {
    public render() {
        return (
            <MathJax.Context input='ascii'
            options={ {
                asciimath2jax: {
                     useMathMLspacing: true,
                }
            } }>
                <MathJax.Node>
                    {this.props.children}
                </MathJax.Node>
            </MathJax.Context>
        );
    }
}

export default (Formula);
