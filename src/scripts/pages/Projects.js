const body = document.getElementsByTagName('body')[0];

const { CreateStyleSheet, CreateDiv, CreateTitle, CreateLabel } = require('../utils/htmlGen.js');
const { DataAndTimeToString } = require('../utils/date.js');
const { SortingOption } = require('../utils/sorting.js');
const paths = require('../utils/paths.js');

const jsonData = {
    "516761bc-3fa1-4fba-a65e-f5a7ee5d3cd4": {
        "name": "Bavaria",
        "game": "C:\\SteamLibrary\\steamapps\\common\\Counter-Strike Global Offensive\\csgo",
        "dateModified": {
            "year": 2004,
            "month" : 11,
            "day": 21,
            "hour": 13,
            "minute": 55,
        },
        "dateCreated": {
            "year": 1995,
            "month" : 10,
            "day": 14,
            "hour": 21,
            "minute": 14,
        }
    },
    "08b420f3-5452-4c19-86b3-09470ba42150": {
        "name": "Marine",
        "game": "C:\\SteamLibrary\\steamapps\\common\\Counter-Strike Global Offensive\\csgo",
        "dateModified": {
            "year": 2007,
            "month" : 11,
            "day": 21,
            "hour": 13,
            "minute": 55,
        },
        "dateCreated": {
            "year": 2001,
            "month" : 10,
            "day": 14,
            "hour": 21,
            "minute": 14,
        }
    },
    "08b420f3-5452-4c19-86b3-090ba42150": {
        "name": "Mostar",
        "game": "C:\\SteamLibrary\\steamapps\\common\\Counter-Strike Global Offensive\\csgo",
        "dateModified": {
            "year": 2021,
            "month" : 11,
            "day": 21,
            "hour": 13,
            "minute": 55,
        },
        "dateCreated": {
            "year": 2004,
            "month" : 10,
            "day": 14,
            "hour": 21,
            "minute": 14,
        }
    }
}

var selectedProjectKey = null;
var sortingOption = null;

var LoadPage = () => {
    // Reset values
    selectedProjectKey = null;
    sortingOption = SortingOption.Name;

    {
        var styleSheetScrollbar = CreateStyleSheet('./styles/scrollbar.css')
        var styleSheetList = CreateStyleSheet('./styles/list.css')
        var styleSheet = CreateStyleSheet('./styles/pages/projects.css')
    
        body.append(styleSheetScrollbar);
        body.append(styleSheetList);
        body.append(styleSheet);
    }

    var pageContainer = CreateDiv("page-container");
    {
        var navbarContainer = CreateDiv("navbar-container");

        var projectsContainer = CreateDiv("projects-container container");
        {
            var title = CreateTitle("Projects");
            projectListSorting = CreateDiv("listSorting-container");
            {
                var name = CreateDiv("sorting-option noselect");
                name.innerHTML = "Name";
                name.addEventListener('click', (e) => { sortingOption = SortingOption.Name; });

                var dateModified = CreateDiv("sorting-option noselect");
                dateModified.innerHTML = "Date modified";
                dateModified.addEventListener('click', (e) => { sortingOption = SortingOption.DateModified; });

                var dateCreated = CreateDiv("sorting-option noselect");
                dateCreated.innerHTML = "Date Created";
                dateCreated.addEventListener('click', (e) => { sortingOption = SortingOption.DateCreated; });

                projectListSorting.appendChild(name);
                projectListSorting.appendChild(dateModified);
                projectListSorting.appendChild(dateCreated);
            }
            var projectList = CreateDiv("list-container");
            projectList.id = "ProjectList"
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
    var projectList = document.getElementById("ProjectList");
    projectList.innerHTML = '';

    // var keyList = null;
    // switch (sortingOption)
    // {
    //     case SortingOption.Name: { keyList = jsonData["sortedList"]["name"]; break; }
    //     case SortingOption.DateModified: { keyList = jsonData["sortedList"]["dateModified"]; break; }
    //     case SortingOption.DateCreated: { keyList = jsonData["sortedList"]["dateCreated"]; break; }
    //     default { console.log(`Invalid sorting option! [${sortingOption}]`) }
    // }

    for (var i = 0; i < 1; i++) {
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
                var dateLastModifiedLabel = CreateLabel("listItem-date", DataAndTimeToString(jsonData[key]['dateModified']));
                var dateCreatedLabel = CreateLabel("listItem-date", DataAndTimeToString(jsonData[key]['dateCreated']));

                listItemContainer.appendChild(listItemLabel);
                listItemContainer.appendChild(dateLastModifiedLabel);
                listItemContainer.appendChild(dateCreatedLabel);
            }
    
            projectList.appendChild(listItemContainer);
        }
    }
}

module.exports = {
    LoadPage
}