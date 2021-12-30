/**
 * @Author linpeicong
 * @description: 确定数组中所有数据的类型均不为（null、undefined、''、[]、{}）这几种类型
 * @param {array}
 * @return {boolean}
 */
import checkExist from "./check_exist";

export default (arr = []) => {
  return arr.every((val) => checkExist(val));
};
