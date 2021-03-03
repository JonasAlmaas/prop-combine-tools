const paths = require('./../scripts/paths.js')

const path = require('path');
const fs = require('fs')


var generateFiles = (selectedProject) => {
    var data = fs.readFileSync(paths.projects)
    const projectsJsonData = JSON.parse(data)

    var data = fs.readFileSync(paths.games)
    const gamesJsonData = JSON.parse(data)

    const gamePath = gamesJsonData[projectsJsonData[selectedProject]['game']]['path']
    const spcombinerulesPath = path.resolve(gamePath, 'scripts/hammer/spcombinerules/spcombinerules.txt')

    console.log(gamePath)
    console.log(spcombinerulesPath)

    fs.writeFile(spcombinerulesPath, "test")

    // create a file I guess
}

exports.generateFiles = generateFiles;


// fs.appendFile()

// var clstname = null
// var clstLmt = null
// var dstLmt = null
// var mdl = null
// '"combine rules"'
// '{'
// '   "small_rocks_01"'
// '   {'
// '       "qc_template_path" scripts/hammer/spcombinerules/qc_templates/' + clstname + '.qc'
// '       "cluster_limit" ' + clstLmt
// '       "distance_limit" ' + dstLmt
// '       "peers"'
// '       {'
// '           "' + mdl + '" ""'
// '       }'
// '   }'
// '}'


// // scripts\hammer\spcombinerules
// // qc_templates