export function CreateStyleSheet(path) {
    var styleSheet = document.createElement('link');
    styleSheet.rel = 'stylesheet';
    styleSheet.href = path;
    return styleSheet;
}

export function CreateDiv(classes) {
    var div = document.createElement('div');
    div.className = classes;
    return div;
}

export function CreateTitle(title) {
    var div = CreateDiv("title-container");
    var title = CreateLabel("title noselect", title)
    div.appendChild(title);
    return div;
}

export function CreateLabel(classes, text) {
    var div = document.createElement('div');
    div.className = classes;
    div.innerHTML = text;
    return div;
}

export function CreateButton(classes, text) {
    var btn = document.createElement("button");
    btn.innerHTML = text;
    btn.className = classes;
    return btn;
}