const expect = require("chai").expect;
const password_generator = require('../utils/utils').password_generator;
const validatePassword = require('../utils/utils').validatePassword;

describe('Password Generator', () => {
    test('should contain a numeric', () => {
        var password = password_generator();
        expect(password.split('')).to.contain.oneOf('0123456789'.split(''));
    });
    test('should contain a lowercase', () => {
        var password = password_generator();
        expect(password.split('')).to.contain.oneOf("abcdefghijklmnopqrstuvwxyz".split(''));
    });
    test('should contain a uppercase', () => {
        var password = password_generator();
        expect(password.split('')).to.contain.oneOf("abcdefghijklmnopqrstuvwxyz".split('').map(ch => ch.toUpperCase()));
    });
    test('should contain a special character', () => {
        var password = password_generator(15);
        expect(password.split('')).to.contain.oneOf('!@#$%^&*()_+~`}{?><,.-='.split(''));
    });
    test('should contain at least 10 characters', () => {
        var password = password_generator(5);
        expect(password).to.have.lengthOf.at.least(10);
    });
});

describe('Password Validator', () => {
    test('should contain a numeric', () => {
        var password = password_generator(20);
        expect(password.split('')).to.contain.oneOf('0123456789'.split(''));
        var newPassword = password.split('').filter((ch) => '0123456789'.split('').indexOf(ch) === -1).join('');
        const { isValid, msg } = validatePassword(newPassword);
    });
    test('should contain a lowercase', () => {
        var password = password_generator();
        expect(password.split('')).to.contain.oneOf("abcdefghijklmnopqrstuvwxyz".split(''));
    });
    test('should contain a uppercase', () => {
        var password = password_generator();
        expect(password.split('')).to.contain.oneOf("abcdefghijklmnopqrstuvwxyz".split('').map(ch => ch.toUpperCase()));
    });
    test('should contain a special character', () => {
        var password = password_generator(15);
        expect(password.split('')).to.contain.oneOf('!@#$%^&*()_+~`}{?><,.-='.split(''));
    });
    test('should contain at least 10 characters', () => {
        var password = password_generator(5);
        expect(password).to.have.lengthOf.at.least(10);
    });
});