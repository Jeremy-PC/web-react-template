/**
 * @Author linpeicong
 * @description: 先base64解密，然后gzip解压，然后编码成utf-8字符串
 * @param {void}
 * @return {void}
 */
import checkExist from "./check_exist";
import parseContent from "./parse_content";
import pako from "pako";

function Utf8ArrayToStr(array) {
  let out, i, c, char2, char3;
  out = "";
  const len = array.length;
  i = 0;
  while (i < len) {
    c = array[i++];
    switch (c >> 4) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        out += String.fromCharCode(c); // 0xxxxxxx
        break;
      case 12:
      case 13:
        char2 = array[i++];
        out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f)); // 110x xxxx 10xx xxxx
        break;
      case 14:
        char2 = array[i++];
        char3 = array[i++];
        out += String.fromCharCode(
          ((c & 0x0f) << 12) | ((char2 & 0x3f) << 6) | ((char3 & 0x3f) << 0)
        );
        break;
      default:
        break;
    }
  }
  return out;
}

export default (b64Data) => {
  if (checkExist(b64Data)) {
    let strData = window.atob(b64Data);
    const charData = strData.split("").map((x) => x.charCodeAt(0));
    const binData = new Uint8Array(charData);
    const array = pako.inflate(binData);
    strData = "";
    strData += Utf8ArrayToStr(array);
    return parseContent(strData);
  }
  return "";
};
