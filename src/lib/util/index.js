/**
 * @Author linpeicong
 * @Date 2021-12-14 11:59:00
 * @LastEditTime 2021-12-14 15:02:06
 * @Description 此文件为项目中公共的方法类集合，创建规则如下：
 * （1）以创建的方法名作为文件名称，多个名称用下划线（_）分割开来
 * （2）所有编写的方法文件都需要在index文件中进行注册导出
 * （3）导出的方法名需要把文件名的下划线（_）转换成驼峰名称
 * （4）为了让其他开发人员知道该方法的作用（也是避免重复造轮子的困境），需要方法创建者把创建的基础信息在具体的函数里面以注释的方式进行注解
 *    （包括信息：@Author-函数创建者，@description-方法的描述，@param-接收的参数，@return-返回的参数（没有返回参数，则使用void））
 * （5）严格意义上来说，不建议把多个函数写在同个文件中，除非多个函数之间有依赖关系。但是主要要写好注释信息
 */
import container from "./container";
import { toHump, toLine } from "./to_hump_line";
import checkExist from "./check_exist";
import checkSomeExist from "./check_some_exist";
import checkEveryExist from "./check_every_exist";
import parseContent from "./parse_content";
import stringifyContent from "./stringify_content";
import unzip from "./unzip";

export {
  container,
  toHump,
  toLine,
  checkExist,
  checkSomeExist,
  checkEveryExist,
  parseContent,
  stringifyContent,
  unzip,
};
