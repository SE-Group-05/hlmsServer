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
        var password = validatePassword("AsssgdhjA@jhshjsj");
        expect(password.msg).to.eql("Error: password must contain at least one number (0-9)!");
    });
    test('should contain a lowercase', () => {
        var password = validatePassword("1ASSDFXSDDSDFFDSFD@");
        expect(password.msg).to.eql("Error: password must contain at least one lowercase letter (a-z)!");
    });
    test('should contain a uppercase', () => {
        var password = validatePassword("1ssdfsdfsfsfsgdgsdd@");
        expect(password.msg).to.eql("Error: password must contain at least one uppercase letter (A-Z)!");
    });
    test('should contain a special character', () => {
        var password = validatePassword("AdadadasaASDadadd1");
        expect(password.msg).to.eql("Error: password must contain at least one special character!");
    });
    test('should contain at least 10 characters', () => {
        var password = validatePassword("Asd1@");
        expect(password.msg).to.eql("Password must have at least 10 characters");
    });

    test('Valid Password', () => {
        var password = validatePassword("Asd1@dddgsgseegg");
        expect(password.msg).to.eql("Valid password!");
    });
});