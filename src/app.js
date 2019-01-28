import React, { Component, Fragment } from 'react';
import { getVSS, getGitClient } from './vssHelper';
import moment from 'moment';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = { repos: [], prs: [] };
    }

    async componentDidMount() {

        VSS = await getVSS();

        var webContext = VSS.getWebContext();
        var projectId = webContext.project.id;

        var gitClient = await getGitClient();

        var prs = await gitClient.getPullRequestsByProject(projectId, {
           status: 1,
           includeLinks: true
        });

        console.log(prs);

        this.setState({
            prs: prs
        });
    }

    render() {


        const listItems = this.state.prs.map(pr => (
            <li>
                <a href={pr._links.self.href.replace("_apis/git/repositories", "_git").replace("pullRequests", "pullRequest")} target="_blank">{pr.title}</a> Created {moment(pr.creationDate).fromNow()}
            </li>));

        return (
            <div>
                <h1>Pull Requests</h1>
                <ul>
                    {listItems}
                </ul>
            </div>
        );
    }
}

export default App;