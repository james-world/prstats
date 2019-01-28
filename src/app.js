import "@babel/polyfill";
import { getVSS, getGitClient } from './vssHelper';
import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

async function start() {
    VSS = await getVSS();

    var webContext = VSS.getWebContext();
    var projectId = webContext.project.id;

    ReactDOM.render(
        <h1>Hello { projectId }!!</h1>,
        document.getElementById('app')
    );

    var gitClient = await getGitClient();
    var repos = await gitClient.getRepositories(projectId, true);

    ReactDOM.render(
        <h1>Hello { repos[0].name }!!</h1>,
        document.getElementById('app')
    );
}

start();
