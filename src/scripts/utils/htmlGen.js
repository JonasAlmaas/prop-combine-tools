var CreateStyleSheet = (path) => {
    var styleSheet = document.createElement('link');
    styleSheet.rel = 'stylesheet';
    styleSheet.href = path;
    return styleSheet;
}

var CreateDiv = (classes) => {
    var div = document.createElement('div');
    div.className = classes;
    return div;
}

var CreateTitle = (title) => {
    var div = CreateDiv("title-container");
    var title = CreateLabel("title noselect", title)
    div.appendChild(title);
    return div;
}

var CreateLabel = (classes, text) => {
    var div = document.createElement('div');
    div.className = classes;
    div.innerHTML = text;
    return div;
}

var CreateButton = (classes, text) => {
    var btn = document.createElement("button");
    btn.innerHTML = text;
    btn.className = classes;
    return btn;
}

module.exports = {
    CreateStyleSheet,
    CreateDiv,
    CreateTitle,
    CreateLabel,
    CreateButton,
}