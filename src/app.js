import React, { Component, Fragment } from 'react';
import { getVSS, getGitClient } from './vssHelper';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = { repos: [] };
    }

    async componentDidMount() {

        VSS = await getVSS();

        var webContext = VSS.getWebContext();
        var projectId = webContext.project.id;

        var gitClient = await getGitClient();
        var repos = await gitClient.getRepositories(projectId, true);

        this.setState({
            repos: repos
        });
    }

    render() {
        const listItems = this.state.repos.map(repo => <li>{repo.name}</li>);

        return (
            <div>
                <h1>Repositories</h1>
                <ul>
                    {listItems}
                </ul>
            </div>
        );
    }
}

export default App;