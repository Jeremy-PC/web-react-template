/**
 * @Author linpeicong
 * @description: 确定数据类型不为（null、undefined、''、[]、{}）这几种类型
 * @param {any}
 * @return {boolean}
 */
import { not, isEmpty, isNil } from "ramda";

export default (value) => {
  return not(isNil(value)) && not(isEmpty(value));
};
