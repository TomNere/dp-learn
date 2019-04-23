import * as React from 'react';

import MathJax from 'react-mathjax2';
import { ReactNode } from 'react';

interface IFormulaProps {
    children: ReactNode
}

// Container with centered content
// Takes 1 child
class Formula extends React.Component<IFormulaProps> {
    public render() {
        return (
            <MathJax.Context input='ascii'>
                <MathJax.Node>
                    {this.props.children}
                </MathJax.Node>
            </MathJax.Context>
        );
    }
}

export default (Formula);
