import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import registerServiceWorker from './registerServiceWorker';
import css from './style/style.css'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();