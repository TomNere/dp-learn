import * as React from 'react';

import MainPage from './MainPage';
import { strings } from 'src/strings/languages';

class App extends React.Component {
    public render() {
        return (
            // This app is single page app
            <MainPage onLanguageChange={this.languageSwitch} />
        );
    }

    // Handle language change
    private languageSwitch = () => {
        strings.getLanguage() === 'en' ? strings.setLanguage('sk') : strings.setLanguage('en');
        this.setState({});
    }
}

export default App;
