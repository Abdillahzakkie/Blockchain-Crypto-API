const SHA512 = require('crypto-js/sha512');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const { v1 : uuid } = require('uuid');

class ChainUtil {
    static genKeyPair() {
        return ec.genKeyPair();
    }
    static id() {
        return uuid()
    }
    static hash(data) {
        return SHA512(JSON.stringify(data)).toString();
    }
    static verifySignature(publicKey, signature, dataHash) {
        return ec.keyFromPublic(publicKey, 'hex').verify(dataHash, signature);
    }
}
module.exports = ChainUtil