VSS.init();
VSS.ready(function() {

    var webContext = VSS.getWebContext();
    var projectId = webContext.project.id;

    document.getElementById("name").innerText = projectId;
    VSS.require("TFS/VersionControl/GitRestClient", function(RestClient) {
        var gitClient = RestClient.getClient();
        gitClient.getRepositories(projectId, true).then(function (repos) {
            var firstRepoName = repos[0].name;
            document.getElementById("name").innerText = firstRepoName;
        });
    });

});