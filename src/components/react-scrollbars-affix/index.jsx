import React, { useRef, useEffect } from "react";
// antd
import { Affix } from "antd";

/**
 * @description: 结合react-scrollbars组件自定义antd的Affix功能
 * @param {children, ...props }
 * @return {components}
 */
export default ({ children, ...props }) => {
  // ------------------- useRef ----------------------------
  const affixRef = useRef();
  // ------------------- useEffect -------------------------
  useEffect(() => {
    window.addEventListener(
      "scroll",
      () => {
        affixRef.current?.updatePosition();
      },
      true
    );
    return window.removeEventListener(
      "scroll",
      () => {
        affixRef.current?.updatePosition();
      },
      true
    );
  }, []);
  // ------------------- children -------------------------
  return (
    <Affix
      ref={affixRef}
      target={() => document.getElementById("Boost")}
      {...props}
    >
      {children}
    </Affix>
  );
};
