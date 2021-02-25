const fs = require('fs')
const path = require('path')

const dataFolderPath = path.resolve(__dirname, '../data')
const projectDataPath = path.resolve(dataFolderPath, 'projectData.json')

var project = (project) => {
    var jsonData = JSON.parse(fs.readFileSync(projectDataPath));

    const containter = document.createElement('div')

    var text = document.createElement('label')
    text.className = 'title'
    text.innerHTML = '"combine rules"'
    containter.appendChild(text)
    var text = document.createElement('label')
    text.innerHTML = '{'
    containter.appendChild(text)

    for (var cluster in jsonData[project]['clusters']) {
        var text = document.createElement('label')
        text.className = 'tab-1 title'
        text.innerHTML = '"' + jsonData[project]['clusters'][cluster]['name'] + '"'
        containter.appendChild(text)

        var text = document.createElement('label')
        text.className = 'tab-1'
        text.innerHTML = '{'
        containter.appendChild(text)

        // Qc template Path
        var div = document.createElement('div')
        var text = document.createElement('label')
        text.className = 'tab-2 title'
        text.innerHTML = '"qc_template_path"'
        div.appendChild(text)
        var text = document.createElement('label')
        text.className = 'tab-1 string'
        text.innerHTML = 'scripts/hammer/spcombinerules/qc_templates/' + jsonData[project]['clusters'][cluster]['name'] + '_cluster.qc'
        div.appendChild(text)
        containter.appendChild(div)

        // Cluster Limit
        var div = document.createElement('div')
        var text = document.createElement('label')
        text.className = 'tab-2 title'
        text.innerHTML = '"cluster_limit"'
        div.appendChild(text)
        var text = document.createElement('label')
        text.className = 'tab-1 number'
        text.innerHTML = jsonData[project]['clusters'][cluster]['clusterLimit']
        div.appendChild(text)
        containter.appendChild(div)

        // Distance Limit
        var div = document.createElement('div')
        var text = document.createElement('label')
        text.className = 'tab-2 title'
        text.innerHTML = '"distance_limit"'
        div.appendChild(text)
        var text = document.createElement('label')
        text.className = 'tab-1 number'
        text.innerHTML = jsonData[project]['clusters'][cluster]['distanceLimit']
        div.appendChild(text)
        containter.appendChild(div)

        var text = document.createElement('label')
        text.className = 'tab-2 title'
        text.innerHTML = '"peers"'
        containter.appendChild(text)

        var text = document.createElement('label')
        text.className = 'tab-2'
        text.innerHTML = '{'
        containter.appendChild(text)

        for (var peer in jsonData[project]['clusters'][cluster]['peers']) {
            var text = document.createElement('label')
            text.className = 'string tab-3'
            text.innerHTML = '"' + jsonData[project]['clusters'][cluster]['peers'][peer] + '" ""'
            containter.appendChild(text)
        }

        var text = document.createElement('label')
        text.className = 'tab-2'
        text.innerHTML = '{'
        containter.appendChild(text)

        var text = document.createElement('label')
        text.className = 'tab-1'
        text.innerHTML = '}'
        containter.appendChild(text)
    }

    var text = document.createElement('label')
    text.innerHTML = '}'
    containter.appendChild(text)

    return containter.innerHTML;
}

exports.project = project;
