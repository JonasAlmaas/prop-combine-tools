const body = document.getElementsByTagName('body')[0];

export function LoadPage() {
    body.innerHTML = '<link rel="stylesheet" href="./styles/pages/Projects.css"></link>';

    var pageContainer = CreateDiv("page-container");
    {
        var navbarContainer = CreateDiv("navbar-container");

        var divProjects = CreateDiv("container projects");
        {
            var title = CreateTitle("Preview");

            divProjects.appendChild(title);
        }
        var divPreview = CreateDiv("container preview");

        pageContainer.appendChild(navbarContainer);
        pageContainer.appendChild(divProjects);
        pageContainer.appendChild(divPreview);
    }
    body.appendChild(pageContainer);
    
    // const btn_01 = CreateButton("btn-01", "Hi");

    /*
        Button Events
    */
    // btn_01.addEventListener('click', (e) => {
    //     console.log("asdas");
    // });
}

// To be moved later
function CreateDiv(classes) {
    var div = document.createElement('div');
    div.className = classes;
    return div;
}

function CreateTitle(title) {
    var div = CreateDiv("title-container");
    var title = CreateLabel("title noselect", title)
    div.appendChild(title);
    return div;
}

function CreateLabel(classes, text) {
    var div = document.createElement('div');
    div.className = classes;
    div.innerHTML = text;
    return div;
}

function CreateButton(classes, text) {
    var btn = document.createElement("button");
    btn.innerHTML = text;
    btn.className = classes;
    return btn;
}
