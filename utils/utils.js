const password_generator = (len) => {
    var length = (len) && (len > 10) ? (len) : (10);
    var string = "abcdefghijklmnopqrstuvwxyz"; //to upper 
    var numeric = '0123456789';
    var punctuation = '!@#$%^&*()_+~`}{?><,.-=';
    var password = "";
    var character = "";
    var crunch = true;
    while (password.length < length) {
        entity1 = Math.ceil(string.length * Math.random() * Math.random());
        entity2 = Math.ceil(numeric.length * Math.random() * Math.random());
        entity3 = Math.ceil(punctuation.length * Math.random() * Math.random());
        hold = string.charAt(entity1);
        hold = (password.length % 2 == 0) ? (hold.toUpperCase()) : (hold);
        character += hold;
        character += numeric.charAt(entity2);
        character += punctuation.charAt(entity3);
        password = character;
    }
    password = password.split('').sort(function () { return 0.5 - Math.random() }).join('');
    return password.substr(0, length);
}

exports.password_generator = password_generator;

const validatePassword = (password) => {
    if ((!password) || (password.split('').length < 10)) {
        return {
            isValid: false,
            msg: "Password must have at least 10 characters"
        }
    }
    var re = /[0-9]/;
    if (!re.test(password)) {
        return {
            isValid: false,
            msg: "Error: password must contain at least one number (0-9)!"
        }
    }
    re = /[a-z]/;
    if (!re.test(password)) {
        return {
            isValid: false,
            msg: "Error: password must contain at least one lowercase letter (a-z)!"
        }
    }
    re = /[A-Z]/;
    if (!re.test(password)) {
        return {
            isValid: false,
            msg: "Error: password must contain at least one uppercase letter (A-Z)!"
        }
    }
    re = /[!@#$%^&*()_+~`}{?><,.-=]/;
    if (!re.test(password)) {
        return {
            isValid: false,
            msg: "Error: password must contain at least one special character!"
        }
    }
    return {
        isValid: true,
        msg: "Valid password!"
    }
}
exports.validatePassword = validatePassword;