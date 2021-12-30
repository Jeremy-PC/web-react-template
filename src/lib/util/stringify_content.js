/**
 * @Author linpeicong
 * @description: 把Object对象encode加密一下，并转换成encode字符串
 * @param {object}
 * @return {string}
 */
export default (queryContent, isEncode = true) => {
  const str = JSON.stringify(queryContent);
  return isEncode ? encodeURIComponent(str) : str;
};
