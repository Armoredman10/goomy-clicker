import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';

import GoomyClickerGame from 'src/react/GoomyClickerGame';
import registerServiceWorker from 'src/registerServiceWorker';

import messages from 'src/intl';
import locale from 'src/lib/locale';

import 'src/jquery/flip_clock';

import './index.css';

if (messages[locale]) {
	document.title = messages[locale].title;
}

ReactDOM.render(
	<IntlProvider locale={locale} messages={messages[locale]}>
		<GoomyClickerGame />
	</IntlProvider>,
	document.getElementById('root') as HTMLElement
);
registerServiceWorker();



// WEBPACK FOOTER //
// ./src/index.tsx