import * as React from 'react';

import { Route, Switch, withRouter } from "react-router-dom";

import Coins from './examples/coins/Coins';
import Substring from './examples/substring/Substring';
import SubstringDemo from './examples/substring/SubstringDemo';

// import styled from 'styled-components';

function WindowContainer(props: any) {
    return (
        <Switch location={props.location}>
            <Route path="/mainpage/coins" component={Coins} />
            <Route exact={true} path="/mainpage/substring" component={Substring} />
            <Route exact={true} path="/mainpage/substring/demo" component={SubstringDemo} />
        </Switch>
    );
}

export default withRouter(WindowContainer);