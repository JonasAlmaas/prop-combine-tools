const body = document.getElementsByTagName('body')[0];

export function LoadPage() {
    body.innerHTML = '<link rel="stylesheet" href="./styles/pages/Projects.css"></link>';

    const btn_01 = CreateButton("btn-01", "Hi");

    const divProjects = CreateDiv("container", btn_01.outerHTML);
    const divPreview = CreateDiv("container", "");

    body.appendChild(divPreview);
    body.appendChild(divProjects);

    /*
        Button Events
    */
    btn_01.addEventListener('click', (e) => {
        console.log("asdas");
    });
}

// To be moved later
function CreateDiv(classes, innerHTML) {
    var div = document.createElement('div')
    div.className = classes
    div.innerHTML = innerHTML
    return div
}

function CreateButton(classes, text) {
    var btn = document.createElement("button");
    btn.innerHTML = text;
    btn.className = classes;
    return btn;
}
