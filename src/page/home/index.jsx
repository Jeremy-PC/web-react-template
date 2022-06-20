import React, { useState, useEffect } from "react";
// styles
import styles from "./index.less";
// store
import { observer } from "mobx-react";
import useStores from "@store";
// antd
import { Result, Button, Typography, Select, Space, Input } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
// util && constants
import { PLATFORM_OPTIONS } from "@lib/constants/page_home";
// const
const { Paragraph, Text } = Typography;
const common = {
  allowClear: true,
  optionFilterProp: "label",
  showSearch: true,
  filterOption: (input, option) =>
    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0,
  style: { width: 200 },
};

export default observer(() => {
  // --------------- useState && useStores ---------------------------
  const { pageHomeStore } = useStores().rootStore;
  const [platform, setPlatform] = useState();

  // ------------------ useEffect ---------------------------
  useEffect(() => {
    return () => {
      pageHomeStore.clearData();
    };
  }, []);

  // ------------------------ methods ----------------------------
  const onAdd = () => pageHomeStore.add();
  const onDel = () => pageHomeStore.del();

  // ------------------------ return ----------------------------
  return (
    <div className={styles.container}>
      <Result
        status={"404"}
        extra={
          <div>
            <div style={{ marginBottom: 8 }}>
              <Select
                {...common}
                placeholder={"请选择所属平台"}
                value={platform}
                onChange={setPlatform}
                options={PLATFORM_OPTIONS}
              />
            </div>
            <div>
              <Button type={"primary"} onClick={onAdd}>
                <PlusOutlined />
              </Button>
              <Input
                style={{ width: 88, margin: "0px 10px" }}
                value={pageHomeStore.count}
                disabled={true}
              />
              <Button disabled={pageHomeStore.count === 0} type={"primary"} onClick={onDel}>
                <MinusOutlined />
              </Button>
            </div>
          </div>
        }
      >
        <div>
          <Paragraph>
            <Text strong style={{ fontSize: 16 }}>
              温馨提醒:
            </Text>
          </Paragraph>
          <Paragraph>· 这是一个多页应用</Paragraph>
        </div>
      </Result>
    </div>
  );
});
