let use_uppercase = document.getElementById('use-uppercase');
let use_lowercase = document.getElementById('use-lowercase');
let use_numbers = document.getElementById('use-numbers');
let use_symbols = document.getElementById('use-symbols');
let password_size_in = document.getElementById('password-size-in');
let password_in = document.getElementById('password-in');
let tgl_in_arr = Array.from(document.getElementsByClassName('tgl-in'))

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

function getRandomInt(min, max) {
    var randomNum = null;
    window.crypto = window.crypto || window.msCrypto;
    if (window.crypto.getRandomValues) {
        const randomBuffer = new Uint32Array(1);
        window.crypto.getRandomValues(randomBuffer);
        randomNum = randomBuffer[0] / (0xffffffff + 1);
    } else {
        randomNum = Math.random();
    }
    randomNum = Math.floor(randomNum * (max - min + 1)) + min;    // Get number in range
    return randomNum;
}
let generate_password = (rqr_pass = { length: 16, uppercase: true, lowercase: true, number: true, symbol: true }) => {
    let charArray = [];
    let uppercase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let lowercase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let number = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let symbol = ['@', '%', '+', '\\', '/', '\'', '!', '#', '$', '^', '?', ':', '.', '(', ')', '{', '}', '[', ']', '~', '\`', '_', ',']
    if (rqr_pass.uppercase) {
        charArray.push(...uppercase);
    }
    if (rqr_pass.lowercase) {
        charArray.push(...lowercase);
    }
    if (rqr_pass.number) {
        charArray.push(...number);
    }
    if (rqr_pass.symbol) {
        charArray.push(...symbol);
    }
    let password = { value: '', strength: Math.log(Math.pow(charArray.length, rqr_pass.length)) / Math.log(3) };

    for (let i = 0; i < rqr_pass.length; i++) {
        let index = getRandomInt(0, charArray.length - 1);
        char = charArray[index];
        if (char) {
            password.value += char;
        }
        else {
            console.error(`char: ${char}, index: ${index}`, "random Number generated out of range");
        }
    }
    // to ensure all the required charecters are included.
    if (rqr_pass.length >= 4) {

        if (rqr_pass.uppercase) {
            if (([...password.value].some(item => uppercase.includes(item))) === false) password = generate_password(rqr_pass);
        }
        if (rqr_pass.lowercase) {
            if ([...password.value].some(item => lowercase.includes(item)) === false) password = generate_password(rqr_pass);
        }
        if (rqr_pass.number) {
            if ([...password.value].some(item => number.includes(item)) === false) password = generate_password(rqr_pass);
        }
        if (rqr_pass.symbol) {
            if ([...password.value].some(item => symbol.includes(item)) === false) password = generate_password(rqr_pass);
        }
    }


    return password;
}


let getPassword = () => {
    rqr_pass = {
        length: password_size_in.value || 16,
        uppercase: use_uppercase.checked,
        lowercase: use_lowercase.checked,
        number: use_numbers.checked,
        symbol: use_symbols.checked
    }
    password_obj = generate_password(rqr_pass);
    return password_obj;
}

let previous_timeOuts = [];
let writePassword = (password) => {
    previous_timeOuts.forEach(timeout => {
        clearTimeout(timeout);
    });
    password_in.value = '';

    for (let i = 0; i < password.length; i++) {
        const char = password[i];
        previous_timeOuts.push(
            setTimeout(() => {
                password_in.value += char;
            }, Math.min(i * 20, i * 250 / password.length, i * 500 / password.length)) // maximum time for writing is 500ms.
        )
    }
}

let password_strength_container = document.getElementById('password-strength-container');
let password_strength = document.getElementById('password-strength');
let showStrength = (strength) => {

    strength = strength > 100 ? 100 : Math.round(strength);
    let strengthJump = Math.abs(strength - password_strength.dataset.value);
    password_strength.dataset.value = strength;
    password_strength.innerText = `${strength}%`;

    password_strength.style.transition = `all ${25*strengthJump}ms ease-in-out`;
    password_strength_container.style.transition = `all ${25*strengthJump}ms ease`;
    password_strength.style.transform = strength > 100 ? 'translateX(0)' : `translateX(${strength - 100}%)`;

    if (strength < 25) {
        password_strength.style.color = '#fff';
        password_strength.style.backgroundColor = '#ff0000';
        password_strength_container.style.backgroundColor = '#ff9999';
    } else if (strength < 50) {
        password_strength.style.color = '#000';
        password_strength.style.backgroundColor = '#ff6600';
        password_strength_container.style.backgroundColor = '#ffc299';
    } else if (strength < 75) {
        password_strength.style.color = '#000';
        password_strength.style.backgroundColor = '#e8ff1a';
        password_strength_container.style.backgroundColor = '#f7ffb3';
    } else if (strength < 90) {
        password_strength.style.color = '#fff';
        password_strength.style.backgroundColor = '#2bd200';
        password_strength_container.style.backgroundColor = '#99ff80';
    } else {
        password_strength.style.color = '#fff';
        password_strength.style.backgroundColor = '#009e73';
        password_strength_container.style.backgroundColor = '#1affc2';
    }
}
let refresh = () => {
    let password_obj = getPassword();
    writePassword(password_obj.value);
    showStrength(password_obj.strength);
}

refresh();

let on_tgl_in_arr = [];
let preventAllToggleOff = () => {
    // filter toggles which are on
    on_tgl_in_arr = tgl_in_arr.filter(tgl_in => tgl_in.checked);

    /*
    if only one toggle is on disable it from being off
    else enable all the toggle from being off.
    */
    if (on_tgl_in_arr.length === 1) {
        on_tgl_in_arr.map(tgl_in => tgl_in.disabled = true);
    } else {
        on_tgl_in_arr.map(tgl_in => tgl_in.disabled = false);
    }
}

document.getElementById('copy-password-btn').addEventListener('click', copyPassword);
document.getElementById('refresh-password-btn').addEventListener('click', refresh);
use_uppercase.addEventListener('change', () => { refresh(); preventAllToggleOff(); });
use_lowercase.addEventListener('change', () => { refresh(); preventAllToggleOff(); });
use_numbers.addEventListener('change', () => { refresh(); preventAllToggleOff(); });
use_symbols.addEventListener('change', () => { refresh(); preventAllToggleOff(); });

password_size_in.addEventListener('input', () => {
    let validate_password_size_in = () => {
        if (password_size_in.value >= 4) {
            // All is well, generate password
            return true;
        } else if (password_size_in === document.activeElement) {
            // user is entering value wait before generating password
            return false;
        } else {
            // user is entered incorrect value reset and generate password
            password_size_in.value = 4;
            return true;
        }
    }
    if (validate_password_size_in()) refresh();
});
password_size_in.addEventListener('blur', () => {
    if (password_size_in.value < 4) {
        // user is entered incorrect value reset and generate password
        password_size_in.value = 4;
        refresh();
    };
});

document.getElementById('quick-inputs-8').addEventListener('click', () => { password_size_in.value = 8; refresh(); });
document.getElementById('quick-inputs-16').addEventListener('click', () => { password_size_in.value = 16; refresh(); });
document.getElementById('quick-inputs-24').addEventListener('click', () => { password_size_in.value = 24; refresh(); });
document.getElementById('quick-inputs-32').addEventListener('click', () => { password_size_in.value = 32; refresh(); });
document.getElementById('quick-inputs-48').addEventListener('click', () => { password_size_in.value = 48; refresh(); });
document.getElementById('quick-inputs-56').addEventListener('click', () => { password_size_in.value = 56; refresh(); });
document.getElementById('quick-inputs-64').addEventListener('click', () => { password_size_in.value = 64; refresh(); });
document.getElementById('quick-inputs-72').addEventListener('click', () => { password_size_in.value = 72; refresh(); });