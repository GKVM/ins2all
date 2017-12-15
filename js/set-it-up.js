
const applicationSelectionElement = document.getElementById("selected-apps");
const valText = document.getElementById("input-apps");
const runCommandBox = document.getElementById("run-command-box");
let selectedApps = [];
let fileName = "setup-default.sh";

function getFile() {
    let script = "#!/bin/bash\n\n";
    let postUpdateCommand = [];

    let i;
    for (i = 0; i < selectedApps.length; i++) {
        let splitCommands = selectedApps[i].commands.split(/sudo \D+ update/);
        if (splitCommands.length === 2) {
            postUpdateCommand.push({"name": selectedApps[i].name, "post_update": splitCommands[1]});
        }
        script = script
            .concat("\n\n# " + selectedApps[i].name + "\n")
            .concat(splitCommands[0]);
    }

    if (postUpdateCommand.length > 1) {
        script = script
            .concat("\n\n#Update system")
            .concat("\nsudo apt-get update\n")
    }

    for (i = 0; i < postUpdateCommand.length; i++) {
        script = script
            .concat("\n\n#Installing " + postUpdateCommand[i].name + "")
            .concat(postUpdateCommand[i].post_update);
    }

    fileName = `setup-${Number.parseInt(Math.random() * 10000)}.sh`;
    runCommandBox.textContent = "sh ~/Downloads/" + fileName;

    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(script));
    element.setAttribute('download', fileName);

    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function deleteFromList(applicationName) {

    for (let i = 0; i < dataList.length; i++) {
        if (dataList[i].name === applicationName) {
            nameAndImageList[applicationName] = dataList[i].image;
            break;
        }
    }

    selectedApps = selectedApps.filter(function (el) {
        return el.name !== applicationName;
    });
}

function copyText() {
    let copyText = document.getElementById("run-command-box");
    copyText.select();
    document.execCommand("Copy");
    alert("Copied the text: " + copyText.value);
}


