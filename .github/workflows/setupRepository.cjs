let github, context, org, repoName;

async function createIssue(title, body){
    await github.rest.issues.create({
        owner: org,
        repo: repoName,
        title: title,
        body: body
    });
}

function _isValidRepoInitEvent(){
    if(context.eventName !== 'create'){
        return false;
    }
    if(!context.ref.endsWith(`/${context.payload.master_branch}`)){
        return false;
    }
    return true;
}

async function initRepo(details){
    github = details.github;
    context = details.context;
    org = details.org;
    repoName = details.repoName;
    if(!_isValidRepoInitEvent()){
        console.log("Not a valid repo creation event. This task is only meant to be executed at repo creation. Exiting!");
        return;
    }
    await createIssue("hello", "world");
}

module.exports.initRepo = initRepo;