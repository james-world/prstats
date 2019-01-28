import "@babel/polyfill";
import { getVSS, getGitClient } from './vssHelper';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';

async function start() {
    VSS = await getVSS();

    var webContext = VSS.getWebContext();
    var projectId = webContext.project.id;

    ReactDOM.render(
        <h1>Hello { projectId }!!</h1>,
        document.getElementById('app')
    );

    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
}

start();
