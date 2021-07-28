const body = document.getElementsByTagName('body')[0];

const { CreateStyleSheet, CreateDiv, CreateTitle, CreateLabel, CreateButton } = require('../utils/htmlGen.js');
const paths = require('../utils/paths.js');

const jsonData = {
    "516761bc-3fa1-4fba-a65e-f5a7ee5d3cd4": {
        "name": "Bavaria",
        "game": "C:\\SteamLibrary\\steamapps\\common\\Counter-Strike Global Offensive\\csgo",
        "dateLastModified": "14/10/2003",
        "dateCreated": "23/06/2003",

    },
    "08b420f3-5452-4c19-86b3-09470ba42150": {
        "name": "Marine",
        "game": "C:\\SteamLibrary\\steamapps\\common\\Counter-Strike Global Offensive\\csgo",
        "dateLastModified": "14/10/2003",
        "dateCreated": "23/06/2003",

    },
    "51676bc-3fa1-4fba-a65e-f5a7ee5d3cd4": {
        "name": "Bavaria",
        "game": "C:\\SteamLibrary\\steamapps\\common\\Counter-Strike Global Offensive\\csgo",
        "dateLastModified": "14/10/2003",
        "dateCreated": "23/06/2003",

    },
    "08b42f3-5452-4c19-86b3-09470ba42150": {
        "name": "Marine",
        "game": "C:\\SteamLibrary\\steamapps\\common\\Counter-Strike Global Offensive\\csgo",
        "dateLastModified": "14/10/2003",
        "dateCreated": "23/06/2003",

    },
    "516761bc-3fa1-4f-a65e-f5a7ee5d3cd4": {
        "name": "Bavaria",
        "game": "C:\\SteamLibrary\\steamapps\\common\\Counter-Strike Global Offensive\\csgo",
        "dateLastModified": "14/10/2003",
        "dateCreated": "23/06/2003",

    },
    "08b420f3-5452-419-86b3-09470ba42150": {
        "name": "Marine",
        "game": "C:\\SteamLibrary\\steamapps\\common\\Counter-Strike Global Offensive\\csgo",
        "dateLastModified": "14/10/2003",
        "dateCreated": "23/06/2003",

    },
    "516761bc-3fa1-4fba-a65ee5d3cd4": {
        "name": "Bavaria",
        "game": "C:\\SteamLibrary\\steamapps\\common\\Counter-Strike Global Offensive\\csgo",
        "dateLastModified": "14/10/2003",
        "dateCreated": "23/06/2003",

    },
    "08b420f3-5452-4c19-86ba42150": {
        "name": "Marine",
        "game": "C:\\SteamLibrary\\steamapps\\common\\Counter-Strike Global Offensive\\csgo",
        "dateLastModified": "14/10/2003",
        "dateCreated": "23/06/2003",

    },
    "51676bc-3fa1-4fba-a65e-f5a5d3cd4": {
        "name": "Bavaria",
        "game": "C:\\SteamLibrary\\steamapps\\common\\Counter-Strike Global Offensive\\csgo",
        "dateLastModified": "14/10/2003",
        "dateCreated": "23/06/2003",

    },
    "08b42f3-5452-4c19-86b3-09470150": {
        "name": "Marine",
        "game": "C:\\SteamLibrary\\steamapps\\common\\Counter-Strike Global Offensive\\csgo",
        "dateLastModified": "14/10/2003",
        "dateCreated": "23/06/2003",

    },
    "516761bca1-4f-a65e-f5a7ee5d3cd4": {
        "name": "Bavaria",
        "game": "C:\\SteamLibrary\\steamapps\\common\\Counter-Strike Global Offensive\\csgo",
        "dateLastModified": "14/10/2003",
        "dateCreated": "23/06/2003",

    },
    "08b423-5452-419-86b3-09470ba42150": {
        "name": "Marine",
        "game": "C:\\SteamLibrary\\steamapps\\common\\Counter-Strike Global Offensive\\csgo",
        "dateLastModified": "14/10/2003",
        "dateCreated": "23/06/2003",

    }
}

var selectedProjectKey = null;
var projectList = null;

var LoadPage = () => {
    {
        var styleSheet = CreateStyleSheet('./styles/pages/Projects.css')
        var styleSheetScrollbar = CreateStyleSheet('./styles/Scrollbar.css')
        var styleSheetList = CreateStyleSheet('./styles/List.css')
    
        body.append(styleSheet);
        body.append(styleSheetScrollbar);
        body.append(styleSheetList);
    }

    var pageContainer = CreateDiv("page-container");
    {
        var navbarContainer = CreateDiv("navbar-container");

        var projectsContainer = CreateDiv("projects-container container");
        {
            var title = CreateTitle("Projects");
            projectListSorting = CreateDiv("listSorting-container");
            projectList = CreateDiv("list-container");
            var projectSettings = CreateDiv("projectSettings-container");
            {

            }
            var utilContainer = CreateDiv("util-container");
            
            projectsContainer.appendChild(title);
            projectsContainer.appendChild(projectListSorting);
            projectsContainer.appendChild(projectList);
            projectsContainer.appendChild(projectSettings);
            projectsContainer.appendChild(utilContainer);
        }

        var previewContainer = CreateDiv("preview-container container");
        {
            var title = CreateTitle("Preview");
            var previewWrapper = CreateDiv("preview-wrapper");
            var utilContainer = CreateDiv("util-container");

            previewContainer.appendChild(title);
            previewContainer.appendChild(previewWrapper);
            previewContainer.appendChild(utilContainer);
        }

        pageContainer.appendChild(navbarContainer);
        pageContainer.appendChild(projectsContainer);
        pageContainer.appendChild(previewContainer);
    }
    body.appendChild(pageContainer);

    ReloadProjectList();
}

function ReloadProjectList() {
    projectList.innerHTML = '';

    for (var key in jsonData) {
        var listItemContainer = null;
        {
            if (key == selectedProjectKey) {
                listItemContainer = CreateDiv("listItem-container listItem-container-selected noselect");
            } else {
                listItemContainer = CreateDiv("listItem-container noselect");
            }
            listItemContainer.id = key;
            
            listItemContainer.addEventListener('click', (e) => {
                selectedProjectKey = e.target.id;
                ReloadProjectList();
            });

            var listItemLabel = CreateLabel("", jsonData[key]['name']);
            var dateLastModifiedLabel = CreateLabel("listItem-date", jsonData[key]['dateLastModified']);
            var dateCreatedLabel = CreateLabel("listItem-date", jsonData[key]['dateCreated']);

            listItemContainer.appendChild(listItemLabel);
            listItemContainer.appendChild(dateLastModifiedLabel);
            listItemContainer.appendChild(dateCreatedLabel);
        }

        projectList.appendChild(listItemContainer);
    }
}

module.exports = {
    LoadPage
}