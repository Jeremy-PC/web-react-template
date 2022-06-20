import React, { useRef } from "react";
// antd
import { Layout } from "antd";
// components
import ReactConfigProvider from "@components/react-config-provider";
import ReactScrollbars from "@components/react-scrollbars";
import Router from "./router";
// const
const { Content } = Layout;

export default () => {
  // ------------------------ useRef ----------------------------
  const reactScrollbars = useRef();

  // ------------------------ return ----------------------------
  return (
    <ReactConfigProvider>
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
    </ReactConfigProvider>
  );
};
