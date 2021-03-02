/**
 * 工具类
 */
import CryptoJS from 'crypto-js';

export default {

  // aes加密
  encrypt(word, keyStr) {
    // const key = CryptoJS.enc.Utf8.parse(keyStr);
    // const srcs = CryptoJS.enc.Utf8.parse(word);
    // const encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    // return encrypted.toString();
    const realKey = this.getKey(keyStr);
    const encrypt = CryptoJS.AES.encrypt(word, CryptoJS.enc.Hex.parse(realKey), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypt.ciphertext.toString(CryptoJS.enc.Base64);
  },

  getKey(key) {
    const realKey = CryptoJS.SHA1(key);
    const realNewKey = CryptoJS.SHA1(realKey).toString().substring(0, 32); // 真正的key
    return realNewKey;
  },

  // aes解密
  decrypt(word, keyStr) {
    const key = CryptoJS.enc.Utf8.parse(keyStr);
    const decrypt = CryptoJS.AES.decrypt(word, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  },

  // hmacsha1加密后转base64
  hmacsha1(word, keyStr) {
    const HmacSha1 = require('crypto-js/hmac-sha1');
    // const Base64 = require('crypto-js/enc-base64');
    // const Authorization = Base64.stringify((HmacSha1(word, keyStr)));
    const Base64 = require('js-base64').Base64;
    const Authorization = Base64.encode((HmacSha1(word, keyStr)));
    return Authorization;
  },
};
