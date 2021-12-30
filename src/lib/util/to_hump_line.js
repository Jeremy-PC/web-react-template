/**
 * @Author linpeicong
 * @description: 字符串驼峰和下划线互相转换
 * @param {string, ?:boolen}
 * @return {string}
 */

// 下划线转换驼峰
const toHump = (str) => {
  return str.replace(/\_(\w)/g, (_, letter) => {
    return letter.toUpperCase();
  });
};
// 驼峰转换下划线
const toLine = (str, isUpper = false) => {
  const data = str.replace(/([A-Z])/g, "_$1");
  return isUpper ? data.toUpperCase() : data.toLowerCase();
};

export { toHump, toLine };
