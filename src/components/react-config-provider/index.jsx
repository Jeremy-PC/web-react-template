import React from "react";
// antd
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
// moment
import moment from "moment";
import "moment/locale/zh-cn";
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
moment.locale("zh-cn");

export default ({ children, ...rest }) => {
  return (
    <ConfigProvider locale={zhCN} {...rest}>
      {children}
    </ConfigProvider>
  );
};