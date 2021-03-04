const body = document.getElementsByTagName('body')[0];

var success = (msg) => {
    createAlert('alert-success', msg)
}

var warning = (msg) => {
    createAlert('alert-warning', msg)
}

var error = (msg) => {
    createAlert('alert-error', msg)
}

function createAlert(wrapperClasse, msg) {
    const alertWrapper = document.createElement('div')
    alertWrapper.className = 'alert-wrapper show noselect ' + wrapperClasse

    const msgSpan = document.createElement('span')
    msgSpan.className = 'alert-msg'
    msgSpan.innerHTML = msg
    alertWrapper.appendChild(msgSpan)

    body.insertBefore(alertWrapper, body.firstChild)

    setTimeout(() => {
        alertWrapper.className = 'alert-wrapper hide noselect ' + wrapperClasse

        setTimeout(() => {
            body.removeChild(alertWrapper)
        }, 250);
    }, 4000);
}

exports.success = success;
exports.warning = warning;
exports.error = error;
