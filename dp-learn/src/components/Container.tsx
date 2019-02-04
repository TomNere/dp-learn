import * as React from 'react';

import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Route, Switch, withRouter } from "react-router-dom";

import MainPage from './MainPage';
import Welcome from './Welcome';
import styled from 'styled-components';

// import Welcome from './Welcome';


function Container(props: any) {
    return (
        <Wrapper>
            <TransitionGroup>
                <CSSTransition
                    timeout={{ enter: 300, exit: 300 }}
                    classNames="fade"
                    key={props.location.key}
                >
                    <section className="route-section">
                        <Switch location={props.location}>
                            <Route exact={true} path="/" component={Welcome} history={props.history} />
                            <Route path="/mainpage" component={MainPage} />
                        </Switch>
                    </section>
                </CSSTransition>
            </TransitionGroup>
        </Wrapper >
    );
}


const Wrapper = styled.div`
    .fade-enter {
        opacity: 0.01;
    }
    .fade-enter.fade-enter-active {
        opacity: 1;
        transition: opacity 300ms ease-in;
    }
    .fade-exit {
        opacity: 1;
    }
      
    .fade-exit.fade-exit-active {
        opacity: 0.01;
        transition: opacity 300ms ease-in;
    }

    div.transition-group {
        position: relative;
   }
   section.route-section {
     position: absolute;
     top: 0;
     left: 0;
     width: 100%;
   }
   .body {
     font-family: 'Roboto', sans-serif;
   }
`;

export default withRouter(Container);