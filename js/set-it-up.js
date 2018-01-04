const applicationSelectionElement = document.getElementById("selected-apps");
const valText = document.getElementById("input-apps");
const runCommandBox = document.getElementById("run-command-box");
const modalText = document.getElementById("script-modal");
let selectedApps = [];
let fileName = "ins2all-default.sh";


function generateScript() {
    let script = "#!/bin/bash\n" +
        "\n# IMPORTANT"+
        "\n# Make sure you know exactly what every part of each command does before running it.\n";
    let postUpdateCommand = [];

    let i;
    for (i = 0; i < selectedApps.length; i++) {
        let splitCommands = selectedApps[i].commands.split(/sudo apt-get update/);
        if (splitCommands.length === 2) {
            postUpdateCommand.push({"name": selectedApps[i].name, "post_update": splitCommands[1]});
        }
        script = script
            .concat("\n\n# " + selectedApps[i].name + "\n")
            .concat(splitCommands[0]);
    }

    if (postUpdateCommand.length > 0) {
        script = script
            .concat("\n\n#Update system")
            .concat("\nsudo apt-get update\n")
    }

    for (i = 0; i < postUpdateCommand.length; i++) {
        script = script
            .concat("\n\n#Installing " + postUpdateCommand[i].name + "")
            .concat(postUpdateCommand[i].post_update);
    }
    return script;
}

function getFile() {
    let script = generateScript();
    fileName = `ins2all-${Number.parseInt(Math.random() * 10000)}.sh`;
    runCommandBox.textContent = "sh ~/Downloads/" + fileName;

    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(script));
    element.setAttribute('download', fileName);

    ga('send', 'event', 'file', 'download', 'Bash');

    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function showModal() {
    modalText.innerText = generateScript();
    $('#modal').modal('open')
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
    alert("Copied to clipboard: " + copyText.value);
}


