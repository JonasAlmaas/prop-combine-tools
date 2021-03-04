const path = require('path');
const fs = require('fs');

const paths = require('./../scripts/paths.js')

var projectsJsonData = null
var gamesJsonData = null

var generateFiles = (selectedProject) => {
    readJsonData()

    let write = new Writer(selectedProject)

    write.line('"combine rules"')
    write.line('{')

    for (var cluster in projectsJsonData[selectedProject]['clusters']) {
        cluster = projectsJsonData[selectedProject]['clusters'][cluster]

        write.line('   "' + cluster['name'] + '"')
        write.line('   {')
        write.line('       "qc_template_path" scripts/hammer/spcombinerules/qc_templates/' + cluster['name'] + '_cluster.qc')
        write.line('')

        write.line('       "cluster_limit" ' + cluster['clusterLimit'])
        write.line('')

        write.line('       "distance_limit" ' + cluster['distanceLimit'])
        write.line('')

        write.line('       "peers"')
        write.line('       {')
        for (var mdl in cluster['peers']) {
            write.line('           "' + cluster['peers'][mdl].replace(/\\/g, '/') + '" ""')
        }
        write.line('       }')

        write.line('   }')

        // Generate qc file
        write.setQcFile(cluster['name'])
        write.qcLine('$staticprop')
        write.qcLine('$surfaceprop "' + cluster['surfaceProp'] + '"')
        write.qcLine('')
        write.qcLine('$cdmaterials "' + cluster['materialPath'] + '"')
    }
    write.line('}')
}

class Writer {
    constructor(selectedProject) {
        this.gamePath = gamesJsonData[projectsJsonData[selectedProject]['game']]['path']
        var spcombinerulesPath = path.resolve(this.gamePath, 'scripts/hammer/spcombinerules')
        this.spcombinerulesFile = path.resolve(spcombinerulesPath, 'spcombinerules.txt')
        this.qcPath = path.resolve(this.gamePath, 'scripts/hammer/spcombinerules/qc_templates')

        if (!fs.existsSync(spcombinerulesPath)) {
            fs.mkdirSync(spcombinerulesPath, { recursive: true })
        }

        if (fs.existsSync(this.qcPath)) {
            fs.rmdirSync(this.qcPath, { recursive: true })
        }
        fs.mkdirSync(this.qcPath, { recursive: true })

        fs.writeFileSync(this.spcombinerulesFile, "")
    }
    setQcFile (clusterName) {
        this.qcFile = path.resolve(this.qcPath, clusterName + '_cluster.qc')
        fs.writeFileSync(this.qcFile, "")
    }
    line(text) {
        fs.appendFileSync(this.spcombinerulesFile, text + '\n')
    }
    qcLine(text) {
        fs.appendFileSync(this.qcFile, text + '\n')
    }
}

function readJsonData() {
    var data = fs.readFileSync(paths.projects)
    projectsJsonData = JSON.parse(data)

    var data = fs.readFileSync(paths.games)
    gamesJsonData = JSON.parse(data)
}

exports.generateFiles = generateFiles;
