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

var CreateInput = (classes, id) => {
    var input = document.createElement('input');
    input.className = classes;
    input.type = "text";
    input.id = id;
    input.spellcheck = false;
    return input;
}

module.exports = {
    CreateStyleSheet,
    CreateDiv,
    CreateTitle,
    CreateLabel,
    CreateInput,
}