const paths = require('./../scripts/paths.js')
const fs = require('fs')

var project = (project) => {
    var jsonData = JSON.parse(fs.readFileSync(paths.projects));

    const containter = document.createElement('div')

    containter.appendChild(createLabel('title', '"combine rules"'))
    containter.appendChild(createLabel('', '{'))
    for (var cluster in jsonData[project]['clusters']) {
        containter.appendChild(createLabel('tab-1 title', '"' + jsonData[project]['clusters'][cluster]['name'] + '"'))
        containter.appendChild(createLabel('tab-1', '{'))
        containter.appendChild(createDiv('', createLabel('tab-2 title', '"qc_template_path"').outerHTML + createLabel('tab-1 string', 'scripts/hammer/spcombinerules/qc_templates/' + jsonData[project]['clusters'][cluster]['name'] + '_cluster.qc').outerHTML))
        containter.appendChild(createDiv('', createLabel('tab-2 title', '"cluster_limit"').outerHTML + createLabel('tab-1 number',  jsonData[project]['clusters'][cluster]['clusterLimit']).outerHTML))
        containter.appendChild(createDiv('', createLabel('tab-2 title', '"distance_limit"').outerHTML + createLabel('tab-1 number',  jsonData[project]['clusters'][cluster]['distanceLimit']).outerHTML))
        containter.appendChild(createLabel('tab-2 title', '"peers"'))
        containter.appendChild(createLabel('tab-2', '{'))
        for (var peer in jsonData[project]['clusters'][cluster]['peers']) {
            containter.appendChild(createLabel('tab-3 string', '"' + jsonData[project]['clusters'][cluster]['peers'][peer] + '" ""'))
        }
        containter.appendChild(createLabel('tab-2', '}'))
        containter.appendChild(createLabel('tab-1', '}'))
    }
    containter.appendChild(createLabel('', '}'))
    return containter.innerHTML;
}

var cluster = (project, cluster) => {
    var jsonData = JSON.parse(fs.readFileSync(paths.projects));

    const containter = document.createElement('div')

    containter.appendChild(createLabel('title', '"' + jsonData[project]['clusters'][cluster]['name'] + '"'))
    containter.appendChild(createLabel('', '{'))
    containter.appendChild(createDiv('', createLabel('tab-1 title', '"qc_template_path"').outerHTML + createLabel('tab-1 string', 'scripts/hammer/spcombinerules/qc_templates/' + jsonData[project]['clusters'][cluster]['name'] + '_cluster.qc').outerHTML))
    containter.appendChild(createDiv('', createLabel('tab-1 title', '"cluster_limit"').outerHTML + createLabel('tab-1 number',  jsonData[project]['clusters'][cluster]['clusterLimit']).outerHTML))
    containter.appendChild(createDiv('', createLabel('tab-1 title', '"distance_limit"').outerHTML + createLabel('tab-1 number',  jsonData[project]['clusters'][cluster]['distanceLimit']).outerHTML))
    containter.appendChild(createLabel('tab-1 title', '"peers"'))
    containter.appendChild(createLabel('tab-1', '{'))
    for (var peer in jsonData[project]['clusters'][cluster]['peers']) {
        containter.appendChild(createLabel('tab-2 string', '"' + jsonData[project]['clusters'][cluster]['peers'][peer] + '" ""'))
    }
    containter.appendChild(createLabel('tab-1', '}'))
    containter.appendChild(createLabel('', '}'))

    return containter.innerHTML;
}

function createDiv(classes, innerHTML) {
    var div = document.createElement('div')
    div.className = classes
    div.innerHTML = innerHTML
    return div
}

function createLabel(classes, text) {
    var label = document.createElement('label')
    label.className = classes
    label.innerHTML = text
    return label
}

exports.project = project;
exports.cluster = cluster;
