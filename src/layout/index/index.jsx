import React, { useRef } from "react";
// antd
import { ConfigProvider, Layout } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
// moment
import moment from "moment";
import "moment/locale/zh-cn";
// components
import ReactScrollbars from "@components/react-scrollbars";
import Router from "./router";
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
moment.locale("zh-cn");
// const
const { Content } = Layout;

export default () => {
  // ------------------------ useRef ----------------------------
  const reactScrollbars = useRef();

  // ------------------------ return ----------------------------
  return (
    <ConfigProvider locale={zhCN}>
      <Layout>
        <Content style={{ height: "100vh", overflow: "hidden" }}>
          <ReactScrollbars
            autoHorizontalHide={false}
            ref={reactScrollbars}
            id={"Boost"}
          >
            <Router scrollbarsRef={() => reactScrollbars.current} />
          </ReactScrollbars>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};
