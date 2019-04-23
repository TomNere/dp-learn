import LocalizedStrings from 'react-localization';
import { english } from './english';
import { slovak } from './slovak';

// Definition of languages
export const strings = new LocalizedStrings({
    // Slovak strings
    sk: slovak,
    // English strings
    en: english
});
