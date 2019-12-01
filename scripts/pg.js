let use_uppercase = document.getElementById('use-uppercase');
let use_lowercase = document.getElementById('use-lowercase');
let use_numbers = document.getElementById('use-numbers');
let use_symbols = document.getElementById('use-symbols');
let password_size_in = document.getElementById('password-size-in');
let password_in = document.getElementById('password-in');
let tgl_in_arr = document.getElementsByClassName('tgl-in');

let copyPassword = (event) => {
    navigator.clipboard.writeText(password_in.value)
        .then(() => console.log('Async: Password Copied to ClipBoard'))
        .catch((err) => {
            // For Old Browsers
            password_in.select();
            document.execCommand("copy");
            password_in.blur();
            password_in.focus();
        });
    return null;
};

let generate_password = (atr = { length: 16, uppercase: true, lowercase: true, number: true, symbol: true }) => {
    let password = '';
    let charArray = [];
    if (atr.uppercase) {
        charArray.push(...['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']);
    }
    if (atr.lowercase) {
        charArray.push(...['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']);
    }
    if (atr.number) {
        charArray.push(...['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
    }
    if (atr.symbol) {
        charArray.push(...['@', '%', '+', '\\', '/', '\'', '!', '#', '$', '^', '?', ':', '.', '(', ')', '{', '}', '[', ']', '~', '\`', '_', ',']);
    }
    for (let i = 0; i < atr.length; i++) {
        let rand = Math.random();
        let index = Math.floor(rand * charArray.length);
        char = charArray[index];
        if (char) {
            password += char;
        }
        else {
            console.log(`char: ${char}, index: ${index}, rand: ${rand}`);
        }
    }
    return password;
}


let getPassword = () => {
    atr = {
        length: password_size_in.value || 16,
        uppercase: use_uppercase.checked,
        lowercase: use_lowercase.checked,
        number: use_numbers.checked,
        symbol: use_symbols.checked
    }
    return generate_password(atr);
}

let refresh = () => {
    let password = getPassword();
    if (typeof writePassword === 'function') {
        if (writePassword(password) === false) password_in.value = password;
    }
    else password_in.value = password;
}

refresh();

let preventAllToggleOff = () => {
    let number_of_tgl_in_checked = 0;
    // check how many toggles are on
    [...tgl_in_arr].forEach(tgl_in => {
        if (tgl_in.checked) number_of_tgl_in_checked++;
    });

    /*
    if one one toggle is on disable it from being off
    else enable all the toggle from being off.
    */
    if (number_of_tgl_in_checked === 1) {
        [...tgl_in_arr].forEach(tgl_in => {
            if (tgl_in.checked) tgl_in.disabled = true;
        });
    } else {
        [...tgl_in_arr].forEach(tgl_in => {
            if (tgl_in.checked) tgl_in.disabled = false;
        });
    }
}

document.getElementById('copy-password-btn').addEventListener('click', copyPassword);
document.getElementById('refresh-password-btn').addEventListener('click', refresh);
use_uppercase.addEventListener('change', () => { refresh(); preventAllToggleOff(); });
use_lowercase.addEventListener('change', () => { refresh(); preventAllToggleOff(); });
use_numbers.addEventListener('change', () => { refresh(); preventAllToggleOff(); });
use_symbols.addEventListener('change', () => { refresh(); preventAllToggleOff(); });
password_size_in.addEventListener('input', refresh);

document.getElementById('quick-inputs-8').addEventListener('click', () => { password_size_in.value = 8; refresh(); });
document.getElementById('quick-inputs-16').addEventListener('click', () => { password_size_in.value = 16; refresh(); });
document.getElementById('quick-inputs-24').addEventListener('click', () => { password_size_in.value = 24; refresh(); });
document.getElementById('quick-inputs-32').addEventListener('click', () => { password_size_in.value = 32; refresh(); });
document.getElementById('quick-inputs-48').addEventListener('click', () => { password_size_in.value = 48; refresh(); });
document.getElementById('quick-inputs-56').addEventListener('click', () => { password_size_in.value = 56; refresh(); });
document.getElementById('quick-inputs-64').addEventListener('click', () => { password_size_in.value = 64; refresh(); });
document.getElementById('quick-inputs-72').addEventListener('click', () => { password_size_in.value = 72; refresh(); });