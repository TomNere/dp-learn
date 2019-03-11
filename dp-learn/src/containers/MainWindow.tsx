import * as React from 'react';

import { Route, Switch, withRouter } from "react-router-dom";

import Coins from 'src/pages/dp/coins/Coins';
import EditDistance from 'src/pages/dp/editDistance/EditDistance';
import Rod from 'src/pages/dp/rod/Rod';
import Substring from 'src/pages/dp/substring/Substring';

function MainWindow(props: any) {
    return (
        <Switch location={props.location}>
            <Route exact={true} path="/mainpage/coins" component={Coins} />
            <Route exact={true} path="/mainpage/substring" component={Substring} />
            <Route exact={true} path="/mainpage/rod" component={Rod} />
            <Route exact={true} path="/mainpage/editDistance" component={EditDistance} />
        </Switch>
    );
}

export default withRouter(MainWindow);
