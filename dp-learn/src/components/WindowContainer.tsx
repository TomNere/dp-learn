import * as React from 'react';

import { Route, Switch, withRouter } from "react-router-dom";

import Coins from './examples/Coins';
import Substring from './examples/Substring';

// import styled from 'styled-components';

function WindowContainer(props: any) {
    return (
        <Switch location={props.location}>
            <Route exact={true} path="/mainpage/coins" component={Coins} />
            <Route path="/mainpage/substring" component={Substring} />
        </Switch>
    );
}

export default withRouter(WindowContainer);