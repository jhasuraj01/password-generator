// rotate the refresh button on click;

let refresh_password_btn = document.getElementById('refresh-password-btn');
let password_container = document.getElementsByClassName('password-container')[0];
let body_header = document.getElementById('body-header');

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

let media = window.matchMedia('(min-height: 37em)');

let handleMedia = (media) => {
    if (media.matches) {
        console.log(body_header);
        password_container.style.top = `${body_header.clientHeight}px`;
    } else {
        password_container.style.top = "0";
    }
}
handleMedia(media); // Call listener function at run time
media.addListener(handleMedia); // Attach listener function on state changes 