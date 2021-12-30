import React, { useState, useRef, useImperativeHandle } from "react";
// react-custom-scrollbars
import { Scrollbars } from "react-custom-scrollbars";
// const
const DEFAULT_STYLE = {
  cursor: "pointer",
  borderRadius: "inherit",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
};

/**
 * @description: 由于官网的react-custom-scrollbars插件存在当滚动为0时，滚动条不自动消失，所以我们需要自己手动计算并隐藏滚动条
 * @param {children, ...props}
 * @return {components}
 */
export default React.forwardRef(
  (
    {
      children,
      autoHide = true,
      autoVerticalHide = true,
      autoHorizontalHide = true,
      ...props
    },
    ref
  ) => {
    // ------------------- useState ----------------------------
    // 竖向滚动条
    const [verticalHeight, setVerticalHeight] = useState(0);
    const [verticalShow, setVerticalShow] = useState(false);
    // 横向滚动条
    const [horizontalWdith, setHorizontalHeight] = useState(0);
    const [horizontalShow, setHorizontalShow] = useState(false);
    // ------------- useRef && useImperativeHandle --------------
    const scrollbars = useRef();
    useImperativeHandle(ref, () => scrollbars.current);
    // ----------------------- methods ---------------------------
    const checkArrIsStandard = (standard = void 0, ...arr) => {
      return arr.some((item) => {
        return item === standard;
      });
    };
    const getScrollData = (check, client, scroll) => {
      return check ? 0 : Math.floor((client / scroll) * client);
    };
    const onUpdate = (value) => {
      const event = new CustomEvent("onScrollbarsUpdate", { detail: value });
      window.dispatchEvent(event);
      const {
        clientHeight,
        scrollHeight,
        scrollTop,
        top,
        clientWidth,
        scrollWidth,
        scrollLeft,
        left,
      } = value;
      const width = getScrollData(
        checkArrIsStandard(0, scrollLeft, left),
        clientWidth,
        scrollWidth
      );
      const horizontal = !checkArrIsStandard(0, scrollLeft, left);
      const height = getScrollData(
        checkArrIsStandard(0, scrollTop, top),
        clientHeight,
        scrollHeight
      );
      const vertical = !checkArrIsStandard(0, scrollTop, top);
      setVerticalHeight(height);
      setVerticalShow(vertical);
      setHorizontalHeight(width);
      setHorizontalShow(horizontal);
    };
    const renderThumb = ({ style, ...rest }, type = "height") => {
      const defaultStyle = {
        [type]: type === "height" ? verticalHeight : horizontalWdith,
        display: (type === "height" ? verticalShow : horizontalShow)
          ? "block"
          : "none",
      };
      return (
        <div
          style={{ ...style, ...DEFAULT_STYLE, ...defaultStyle }}
          {...rest}
        />
      );
    };
    // ----------------------- render ---------------------------
    return (
      <Scrollbars
        style={{ width: "100%", height: "100%" }}
        autoHide={autoHide}
        onUpdate={onUpdate}
        renderThumbVertical={(value) => {
          return autoHide && autoVerticalHide ? (
            renderThumb(value, "height")
          ) : (
            <div style={{ ...value, width: "100%", ...DEFAULT_STYLE }} />
          );
        }}
        renderThumbHorizontal={(value) => {
          return autoHide && autoHorizontalHide ? (
            renderThumb(value, "width")
          ) : (
            <div style={{ ...value, height: "100%", ...DEFAULT_STYLE }} />
          );
        }}
        ref={scrollbars}
        {...props}
      >
        {children}
      </Scrollbars>
    );
  }
);
