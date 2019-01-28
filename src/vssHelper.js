import VSS from 'vss-web-extension-sdk';

let initialised = false;
let notifyLoaded = false;
let GitClient;

export function getVSS() {
    return new Promise((resolve) => {
        if(!initialised) {
            VSS.init({
                explicitNotifyLoaded: true,
                usePlatformScripts: true,
                usePlatformStyles: false,
                configureModuleLoader: true
            });
            initialised = true;
        }

        VSS.ready(function () {
            resolve(VSS);
            if(!notifyLoaded)
            {
                VSS.notifyLoadSucceeded();
                notifyLoaded = true;
            }
        });
    });
}

export async function getGitClient() {

    await getVSS();

    return new Promise(function (resolve) {
        if(!GitClient) {
            VSS.require("TFS/VersionControl/GitRestClient", function(RestClient) {
                GitClient = RestClient;
                resolve(GitClient.getClient());
            });
        } else {
            resolve(GitClient.getClient());
        }
    });
}