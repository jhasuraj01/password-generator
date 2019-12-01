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

// @return boolean
let writePassword = (password) => {
    if (password_in) {
        password_in.focus();
        password_in.value = '';
        for (let i = 0; i < password.length; i++) {
            const char = password[i];
            setTimeout(() => {
                password_in.value += char;
            }, Math.min(i*20, i*250/password.length, i*500/password.length)); // maximum time for writing is 500ms.
        }
        setTimeout(() => {
        password_in.blur();
        }, Math.min(password.length*20, password.length*250/password.length, password.length*500/password.length));
        return true;
    }
    else return false;
}