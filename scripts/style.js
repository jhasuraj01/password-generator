// rotate the refresh button on click;

let refresh_password_btn = document.getElementById('refresh-password-btn');
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