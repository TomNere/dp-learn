import './App.css';

import * as React from 'react';

import Container from './components/Container';
import Header from './components/Header';
import { BrowserRouter as Router } from 'react-router-dom'

class App extends React.Component {
  constructor(props: any) {
    super(props);
  }

  public render() {

    return (
      <Router>
        <div>
          <Header location={this.props} />
          <Container location={this.props} />
        </div>
      </Router>
    );
  }
}

export default App;
