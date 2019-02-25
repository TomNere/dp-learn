import * as React from 'react';

import Container from 'src/containers/Container';
import Header from 'src/containers/Header';
import { BrowserRouter as Router } from 'react-router-dom'
import { strings } from 'src/strings/languages';

class App extends React.Component {
    public render() {
        return (
            <Router>
                <div>
                    <Header location={this.props} onLanguageChange={this.languageSwitch} />
                    <Container location={this.props} />
                </div>
            </Router>
        );
    }

    // Handle language change
    private languageSwitch = () => {
        strings.getLanguage() === 'en' ? strings.setLanguage('sk') : strings.setLanguage('en');
        this.setState({});
    }
}

export default App;
