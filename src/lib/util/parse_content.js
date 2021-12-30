/**
 * @Author linpeicong
 * @description: 把url的encode字符串decode出来，并转换成Object对象
 * @param {string}
 * @return {object}
 */
import checkExist from "./check_exist";

export default (queryContent, isEncode = true) => {
  const content = isEncode ? decodeURIComponent(queryContent) : queryContent;
  return checkExist(content) ? JSON.parse(content) : {};
};
