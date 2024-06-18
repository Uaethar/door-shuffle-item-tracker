import React from 'react';
import { createRoot } from 'react-dom/client'
import Root from './containers/Root';
import './index.css';
import * as serviceWorker from './serviceWorker';

const root = createRoot(document.getElementById('root') as HTMLDivElement)
root.render(<Root />)


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
