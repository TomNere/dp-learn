import * as React from 'react';

import Page from './Page';
import { strings } from 'src/strings/languages';

// Root class of the app
class App extends React.Component {
    public render() {
        return (
            // This app is single page app
            <Page onLanguageChange={this.handleLanguageSwitch} />
        );
    }

    // Handle language change
    private handleLanguageSwitch = () => {
        strings.getLanguage() === 'en' ? strings.setLanguage('sk') : strings.setLanguage('en');
        this.setState({});
    }
}

export default App;
