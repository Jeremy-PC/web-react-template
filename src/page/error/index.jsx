import React from "react";
import { useNavigate } from "react-router-dom";
// styles
import styles from "./index.less";
// antd
import { Result, Button } from "antd";

export default () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Result
        status={"404"}
        title={"404"}
        subTitle={"抱歉，你浏览的路由暂不存在!"}
        extra={
          <Button type={"primary"} onClick={() => navigate("/")}>
            返回首页
          </Button>
        }
      />
    </div>
  );
};
