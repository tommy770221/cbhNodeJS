/**
 * Created by Tommy on 2017/6/11.
 */
var crypto = require("crypto");
var eccrypto = require("eccrypto");

var privateKeyA = crypto.randomBytes(32);
var publicKeyA = eccrypto.getPublic(privateKeyA);
var privateKeyB = crypto.randomBytes(32);
var publicKeyB = eccrypto.getPublic(privateKeyB);

console.log(privateKeyA.toString("hex"));
console.log(publicKeyA.toString("hex"));
// Encrypting the message for B.
eccrypto.encrypt(publicKeyB, Buffer("感冒")).then(function(encrypted) {
    // B decrypting the message.
    console.log(encrypted.ciphertext);
    eccrypto.decrypt(privateKeyB, encrypted).then(function(plaintext) {
        console.log("Message to part B:", plaintext.toString());
    });
});

// Encrypting the message for A.
eccrypto.encrypt(publicKeyA, Buffer("msg to a")).then(function(encrypted) {
    // A decrypting the message.
    eccrypto.decrypt(privateKeyA, encrypted).then(function(plaintext) {
        console.log("Message to part A:", plaintext.toString());
    });
});