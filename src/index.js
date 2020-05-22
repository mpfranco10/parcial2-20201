import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from './serviceWorker';
import localeEsMessages from "./locales/es";
import localeEnMessages from "./locales/en";
import {IntlProvider} from 'react-intl';

import Movies from "./Movies";

const messages = {
    'es': localeEsMessages,
    'en': localeEnMessages
};

const language = navigator.language.split(/[-_]/)[0];  // language without region code

ReactDOM.render(
	<IntlProvider locale={language} messages={messages[language]}>
		<Movies locale={language}/>
	</IntlProvider>, document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();