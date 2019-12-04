// rotate the refresh button on click;

let refresh_password_btn = document.getElementById('refresh-password-btn');
let password_container = document.getElementsByClassName('password-container')[0];
let body_header = document.getElementById('body-header');
let main = document.getElementById('main');
let body_footer = document.getElementById('body-footer');
let sideNavBar = document.getElementById('side-navBar');
let sidebar_btn_checkBox = document.getElementById('sidebar-btn-checkBox');

refresh_password_btn.addEventListener('click', () => {
    if (refresh_password_btn.classList.contains('rotate')) {
        refresh_password_btn.classList.remove('rotate');
    }
    refresh_password_btn.classList.add('rotate');
    setTimeout(() => {
        if (refresh_password_btn.classList.contains('rotate')) {
            refresh_password_btn.classList.remove('rotate');
        }
    }, 500);
});


let media_forHeader = window.matchMedia('(min-height: 37em)');

let repositionSideNavBar = () => {
    if (sidebar_btn_checkBox.checked === true) {
        sideNavBar.style.transform = "translateX(0)";
        if (!media_forHeader.matches) {
            document.getElementById('secondary-menu-close-btn').style.display = "initial";
        } else {
            document.getElementById('secondary-menu-close-btn').style.display = "none";
        }
    } else {
        sideNavBar.style.transform = "translateX(calc(-100% - 6px))";
    }
}

let handle_Media_forHeader = (media_forHeader) => {
    if (media_forHeader.matches) {
        password_container.style.top = `${body_header.clientHeight}px`;
        sideNavBar.style.setProperty('--top', `${body_header.clientHeight-5}px`);
        sideNavBar.style.zIndex = '2';
    } else {
        password_container.style.top = "0";
        sideNavBar.style.setProperty('--top', "0px");
        sideNavBar.style.zIndex = '4';
    }
    repositionSideNavBar();
}

handle_Media_forHeader(media_forHeader); // Call listener function at run time
media_forHeader.addListener(handle_Media_forHeader); // Attach listener function on state changes 


body_header.style.transition = "transform 300ms cubic-bezier(0.4, 0.0, 0.2, 1)";
body_footer.style.transition = "transform 300ms cubic-bezier(0.4, 0.0, 0.2, 1)";
main.style.transition = "transform 300ms cubic-bezier(0.4, 0.0, 0.2, 1)";
sideNavBar.style.transition = "transform 300ms cubic-bezier(0.4, 0.0, 0.2, 1)";


sidebar_btn_checkBox.addEventListener('change', repositionSideNavBar);
window.addEventListener('resize', () => {
    repositionSideNavBar();
});
window.addEventListener('orientationchange', () => {
    repositionSideNavBar();
});
repositionSideNavBar();