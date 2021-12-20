import React from "react";
import { Modal } from "antd";
import { Link } from "react-router-dom";
// import './App.css';

function MDNGettingStarted() {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const gl = ref.current.getContext("webgl");
    // 确认WebGL支持性
    if (!gl) {
      Modal.error({
        title: "无法初始化WebGL",
        content: "你的浏览器、操作系统或硬件等可能不支持WebGL。",
      });
      return;
    }
    // 使用完全不透明的黑色清除所有图像
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // 用上面指定的颜色清除缓冲区
    gl.clear(gl.COLOR_BUFFER_BIT);
  }, []);

  return (
    <div>
      <h1>
        <a
          target="_blank" rel="noreferrer"
          href="https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API/Tutorial/Getting_started_with_WebGL"
        >
          MDN Getting started with WebGL
        </a>
      </h1>
      <canvas ref={ref} id="glcanvas" width="640" height="480">
        你的浏览器似乎不支持或者禁用了HTML5 <code>&lt;canvas&gt;</code> 元素.
      </canvas>
      <div>
        <Link to="/mdn-adding-2D-content">下一步：使用 WebGL 创建 2D 内容</Link>
      </div>
    </div>
  );
}

export default React.memo(MDNGettingStarted, () => true);
