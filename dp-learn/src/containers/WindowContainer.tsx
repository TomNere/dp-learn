import * as React from 'react';

import { Route, Switch, withRouter } from "react-router-dom";

import Coins from 'src/pages/dp/coins/Coins';
import Substring from 'src/pages/dp/substring/Substring';

// import RodDemo from 'src/pages/dp/rod/RodDemo';


function WindowContainer(props: any) {
    return (
        <Switch location={props.location}>
            <Route exact={true} path="/mainpage/coins" component={Coins} />
            <Route exact={true} path="/mainpage/substring" component={Substring} />
            {/* <Route exact={true} path="/mainpage/rod" component={RodDemo} /> */}
        </Switch>
    );
}

export default withRouter(WindowContainer);
