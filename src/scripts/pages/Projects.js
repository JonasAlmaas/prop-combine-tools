const { CreateStyleSheet, CreateDiv, CreateTitle, CreateLabel, CreateInput } = require('../utils/htmlGen.js');
const { DataAndTimeToString } = require('../utils/date.js');
const { SortingOption } = require('../utils/sorting.js');
const { readJSONFile } = require('../utils/jsonReadWrite.js');
const paths = require('../utils/paths.js');

const body = document.getElementsByTagName('body')[0];

// Variables
var selectedProjectKey = null;
var sortingOption = null;

function UnselectProject() {
    selectedProjectKey = null;
}

var LoadPage = () => {
    // Reset values
    UnselectProject();
    sortingOption = SortingOption.Name;

    // Load Stylesheets
    {
        var styleSheetScrollbar = CreateStyleSheet('./styles/scrollbar.css')
        var styleSheetList = CreateStyleSheet('./styles/list.css')
        var styleSheetButton = CreateStyleSheet('./styles/button.css')
        var styleSheetInputField = CreateStyleSheet('./styles/inputField.css')        
        var styleSheet = CreateStyleSheet('./styles/pages/projects.css')
    
        body.append(styleSheetScrollbar);
        body.append(styleSheetList);
        body.append(styleSheetButton);
        body.append(styleSheetInputField);
        body.append(styleSheet);
    }

    // Page Container
    var pageContainer = CreateDiv("page-container");
    {
        // Navbar
        var navbarContainer = CreateDiv("navbar-container");

        // ------------------
        // ---- PROJECTS ----
        // ------------------
        var projectsContainer = CreateDiv("projects-container container");
        {
            // Title
            var title = CreateTitle("Projects");

            // List
            var projectList = CreateDiv("list-container");
            projectList.id = "ProjectList"

            // Project Settings
            var projectSettings = CreateDiv("project-settings-wrapper");
            projectSettings.id = "ProjectSettings"

            // Util UI
            var util = CreateDiv("util-container");
            {
                // Button New
                var btnNew = CreateDiv("btn btn-new");
                {
                    var label = CreateLabel("noselect btn-label", "New");
                    btnNew.appendChild(label);
                }
                btnNew.addEventListener('click', (e) => {
                    // TODO!
                    console.log("New");
                });

                // Button Edit
                var btnEdit = CreateDiv("btn btn-edit");
                {
                    var label = CreateLabel("noselect btn-label", "Edit");
                    btnEdit.appendChild(label);
                }
                btnEdit.addEventListener('click', (e) => {
                    // TODO!
                    console.log("Edit");
                });

                // Button Remove
                var btnRemove = CreateDiv("btn btn-remove");
                {
                    var label = CreateLabel("noselect btn-label", "Remove");
                    btnRemove.appendChild(label);
                }
                btnRemove.addEventListener('click', (e) => {
                    // TODO!
                    console.log("Remove");
                });

                util.appendChild(btnNew);
                util.appendChild(btnEdit);
                util.appendChild(btnRemove);
            }
            
            projectsContainer.appendChild(title);
            projectsContainer.appendChild(projectList);
            projectsContainer.appendChild(projectSettings);
            projectsContainer.appendChild(util);
        }

        // -----------------
        // ---- PREVIEW ----
        // -----------------
        var previewContainer = CreateDiv("preview-container container");
        {
            // Title
            var title = CreateTitle("Preview");

            // Preview Window
            var previewWrapper = CreateDiv("preview-wrapper");

            // Util UI
            var util = CreateDiv("util-container");
            {
                // Button Generate Files
                var btnGenerateFiles = CreateDiv("btn btn-generateFiles");
                {
                    var label = CreateLabel("noselect btn-label", "Generate Files");
                    btnGenerateFiles.appendChild(label);
                }
                btnGenerateFiles.addEventListener('click', (e) => {
                    if (selectedProjectKey != null) {
                        console.log("Generateing Files");
                    } else {
                        console.log("No project selected");
                    }
                });

                util.appendChild(btnGenerateFiles);
            }

            previewContainer.appendChild(title);
            previewContainer.appendChild(previewWrapper);
            previewContainer.appendChild(util);
        }

        pageContainer.appendChild(navbarContainer);
        pageContainer.appendChild(projectsContainer);
        pageContainer.appendChild(previewContainer);
    }
    body.appendChild(pageContainer);

    ReloadProjectList();
}

function ReloadProjectList() {
    var jsonData = readJSONFile(paths.projectData);

    var projectList = document.getElementById("ProjectList");
    projectList.innerHTML = '';

    // Get sorting option
    // var keyList = null;
    // switch (sortingOption)
    // {
    //     case SortingOption.Name: { keyList = jsonData["sortedList"]["name"]; break; }
    //     case SortingOption.DateModified: { keyList = jsonData["sortedList"]["dateModified"]; break; }
    //     case SortingOption.DateCreated: { keyList = jsonData["sortedList"]["dateCreated"]; break; }
    //     default { console.log(`Invalid sorting option! [${sortingOption}]`) }
    // }

    // Sorting Options
    projectListSorting = CreateDiv("listSorting-container");
    {
        // Name
        var name = CreateDiv("sorting-option");
        {
            var label = CreateLabel("sorting-option-label noselect", "Name");
            name.appendChild(label);
        }
        name.addEventListener('click', (e) => { sortingOption = SortingOption.Name; });

        // Date Modified
        var dateModified = CreateDiv("sorting-option");
        {
            var label = CreateLabel("sorting-option-label noselect", "Date modified");
            dateModified.appendChild(label);
        }
        dateModified.addEventListener('click', (e) => { sortingOption = SortingOption.DateModified; });

        // Date Created
        var dateCreated = CreateDiv("sorting-option");
        {
            var label = CreateLabel("sorting-option-label noselect", "Date Created");
            dateCreated.appendChild(label);
        }
        dateCreated.addEventListener('click', (e) => { sortingOption = SortingOption.DateCreated; });

        projectListSorting.appendChild(name);
        projectListSorting.appendChild(dateModified);
        projectListSorting.appendChild(dateCreated);
    }

    projectList.appendChild(projectListSorting);

    // This is here simply to test with longer lists, deal with it!
    for (var i = 0; i < 10; i++) {
        // This will not work later, I'll fix that though, trust me...
        for (var key in jsonData) {
            var listItemContainer = null;
            {
                if (key == selectedProjectKey) {
                    listItemContainer = CreateDiv("listItem-container listItem-container-selected");
                } else {
                    listItemContainer = CreateDiv("listItem-container");
                }
                listItemContainer.id = key;
                
                listItemContainer.addEventListener('click', (e) => {
                    selectedProjectKey = e.target.id;
                    ReloadProjectList();
                    ReloadProjectSettings();
                });

                var listItemLabel = CreateLabel("noselect listItem-name", jsonData[key]['name']);
                var dateLastModifiedLabel = CreateLabel("listItem-date noselect", DataAndTimeToString(jsonData[key]['dateModified']));
                var dateCreatedLabel = CreateLabel("listItem-date noselect", DataAndTimeToString(jsonData[key]['dateCreated']));

                listItemContainer.appendChild(listItemLabel);
                listItemContainer.appendChild(dateLastModifiedLabel);
                listItemContainer.appendChild(dateCreatedLabel);
            }
    
            projectList.appendChild(listItemContainer);
        }
    }
}

function ReloadProjectSettings() {
    // Do some checking that there is somethng selected and that it is valid
    // Get info from the json file
    // Then display the info
    // If it gets changed update it and write to the json file :D

    var jsonData = readJSONFile(paths.projectData);
    
    var projectSettings = document.getElementById("ProjectSettings");
    projectSettings.innerHTML = '';

    // Title
    var titleProjectSettings = CreateTitle("Project Settings");

    // Name
    var nameContainer = CreateDiv("project-settings-container");
    {
        var labelContainer = CreateDiv("label-container");
        {
            var label = CreateLabel("noselect label", "Name:");
            labelContainer.appendChild(label);
        }
        var inputField = CreateInput("input-field", "input-project-setting-name");
        inputField.placeholder = "Unnamed";

        nameContainer.appendChild(labelContainer);
        nameContainer.appendChild(inputField);
    }

    // Game Directory
    var gameDirContainer = CreateDiv("project-settings-container");
    {
        var labelContainer = CreateDiv("label-container");
        {
            var label = CreateLabel("noselect label", "Game Directory:");
            labelContainer.appendChild(label);
        }
        var inputField = CreateInput("input-field", "input-project-setting-name");
        inputField.placeholder = "Undefined";

        var btn = CreateDiv("btn btn-browse");
        {
            var label = CreateLabel("noselect btn-label", "Browse...");
            btn.appendChild(label);
        }

        gameDirContainer.appendChild(labelContainer);
        gameDirContainer.appendChild(inputField);
        gameDirContainer.appendChild(btn);
    }

    // Optional Save path
    var savePathContainer = CreateDiv("project-settings-container");
    {
        var labelContainer = CreateDiv("label-container");
        {
            var label = CreateLabel("noselect label", "Optional Save Path:");
            labelContainer.appendChild(label);
        }
        var inputField = CreateInput("input-field", "input-project-setting-name");
        inputField.placeholder = "Undefined";

        var btn = CreateDiv("btn btn-browse");
        {
            var label = CreateLabel("noselect btn-label", "Browse...");
            btn.appendChild(label);
        }

        savePathContainer.appendChild(labelContainer);
        savePathContainer.appendChild(inputField);
        savePathContainer.appendChild(btn);
    }
    
    projectSettings.appendChild(titleProjectSettings);
    projectSettings.appendChild(nameContainer);
    projectSettings.appendChild(gameDirContainer);
    projectSettings.appendChild(savePathContainer);
}

module.exports = {
    LoadPage
}