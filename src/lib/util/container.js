/**
 * @Author linpeicong
 * @description: 把对象转换keys,label,options,ex_options等四种数据类型,用于不同场景的使用 (注意接收参数的第一个参数为前缀标识符,每种类型都会带上这个前缀)
 * keys ==> { [value]: value }
 * label ==> { [value]: label }
 * options ==> [{ label, value }]
 * ex_options ==> [[label, value]]
 * @param {string, object}
 * @return {object, object, array, array}
 */

export default (prefix, obj = {}) => {
  const keys = Object.keys(obj);
  const keysObj = {};
  const options = [];
  const ex_options = [];
  keys.forEach((key) => {
    keysObj[key] = key;
    options.push({ label: obj[key], value: key });
    ex_options.push({ label: obj[key], value: key });
  });
  return {
    [`${prefix}_KEYS`]: keysObj,
    [`${prefix}_LABEL`]: obj,
    [`${prefix}_OPTIONS`]: options,
    [`${prefix}_EX_OPTIONS`]: ex_options,
  };
};
