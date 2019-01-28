import "@babel/polyfill";
import { getVSS, getGitClient } from './vssHelper';

async function start() {
    VSS = await getVSS();

    var webContext = VSS.getWebContext();
    var projectId = webContext.project.id;

    document.getElementById("name").innerText = projectId;
    
    var gitClient = await getGitClient();
    var repos = await gitClient.getRepositories(projectId, true);

    document.getElementById("name").innerText = repos[0].name;
}

start();
