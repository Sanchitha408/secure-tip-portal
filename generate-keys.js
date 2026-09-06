const nacl = require('tweetnacl');
const naclUtil = require('tweetnacl-util');

const keyPair = nacl.box.keyPair();

console.log('PUBLIC KEY (goes in frontend):');
console.log(naclUtil.encodeBase64(keyPair.publicKey));
console.log('');
console.log('PRIVATE KEY (keep this secret, save it somewhere safe offline):');
console.log(naclUtil.encodeBase64(keyPair.secretKey));
