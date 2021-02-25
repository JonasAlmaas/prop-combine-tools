const date = new Date()
const body = document.getElementsByTagName('body')[0];

var create = (hrefPage) => {
    const sidebarWrapper = document.createElement('div')
    sidebarWrapper.className = 'sidebar-wrapper'

    const navbar = document.createElement('div')
    navbar.className = 'navbar'

    const home = createNavbarItem('Home',hrefPage)
    const games = createNavbarItem('Games', hrefPage)
    const projects = createNavbarItem('Projects', hrefPage)
    const guide = createNavbarItem('Guide', hrefPage)
    const resources = createNavbarItem('Resources', hrefPage)

    navbar.appendChild(home)
    navbar.appendChild(games)
    navbar.appendChild(projects)
    navbar.appendChild(guide)
    navbar.appendChild(resources)

    const footer = document.createElement('div')
    footer.className = 'footer'

    const footerText = document.createElement('div')
    footerText.className = 'footer-text noselect'

    footerText.innerHTML = 'Copyright © ' + date.getFullYear()
    footer.appendChild(footerText)

    sidebarWrapper.appendChild(navbar)
    sidebarWrapper.appendChild(footer)
    body.insertBefore(sidebarWrapper, body.firstChild)
}

var createNavbarItem = (name, hrefPage) => {
    const navbarItem = document.createElement('div')
    if (name.toLowerCase() == hrefPage) {
        navbarItem.className = 'navbar-item navbar-item-selected'
    } else {
        navbarItem.className = 'navbar-item'
    }
    const a = document.createElement('a')
    a.className = 'noselect'
    a.href = name.toLowerCase() + ".html"
    a.innerHTML = name
    navbarItem.appendChild(a)
    return navbarItem;
}

module.exports = {
    create
}
