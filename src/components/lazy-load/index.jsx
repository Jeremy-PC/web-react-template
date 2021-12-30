import React from "react";
// styles
import styles from "./index.less";
// loadable
import loadable from "@loadable/component";
// antd
import { Spin } from "antd";

export default (call) => {
  return loadable(call, {
    fallback: (
      <div className={styles.container}>
        <Spin size="large" />
      </div>
    ),
  });
};
