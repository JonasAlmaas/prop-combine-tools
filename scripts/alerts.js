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
    for (i=0; i < body.getElementsByClassName('alert-wrapper').length; i++) {
        alertToRemove = body.getElementsByClassName('alert-wrapper')[i]
        body.removeChild(alertToRemove)
    }

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
            body.removeChild(body.getElementsByClassName('alert-wrapper')[0])
        }, 250);
    }, 4000);
}

exports.success = success;
exports.warning = warning;
exports.error = error;
