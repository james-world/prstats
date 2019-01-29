import React, { Component, Fragment } from 'react';
import { getVSS, getGitClient } from './vssHelper';
import moment from 'moment';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

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

        const data = this.state.prs.map(pr => ({
            link:  pr._links.self.href.replace("_apis/git/repositories", "_git").replace("pullRequests", "pullRequest"),
            title: pr.title,
            creationDate: pr.creationDate,
            createdBy: pr.createdBy.displayName,
            repo: pr.repository.name
        }));

        const columns = [{
            Header: 'Title',
            id: 'link',
            accessor: d => ({ link: d.link, title: d.title }),
            Cell: props => <a href={props.value.link} target="_blank">{props.value.title}</a>
        }, {
            Header: 'Age',
            accessor: 'creationDate',
            Cell: props => <span>{moment(props.value).fromNow()}</span>
        }, {
            Header: 'Created By',
            accessor: 'createdBy'
        }, {
            Header: 'Repo',
            accessor: 'repo'
        }];

        return (
            <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                <h3>Active Pull Requests</h3>
                <ReactTable data={data} columns={columns} />
            </div>
        );
    }
}

export default App;