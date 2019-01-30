import "@babel/polyfill";
import { getVSS, getGitClient } from './vssHelper';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';

async function start() {

    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
}

start();
