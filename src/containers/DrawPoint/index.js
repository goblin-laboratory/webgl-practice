import React from "react";
import { Link } from "react-router-dom";
import { Dropdown, Menu, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import webGLUtils from "../../utils/webGLUtils";
import styles from "./index.module.less";

const vertexSource = `
attribute vec4 a_Position;
attribute float a_PointSize;
void main() {
  gl_Position = a_Position;
  gl_PointSize = a_PointSize;
}
`;

const fragmentSource = `
precision mediump float;

uniform vec4 u_FragColor;
void main() {
  gl_FragColor = u_FragColor;
}
`;

const sizeList = [
  { value: 10.0, label: "小" },
  { value: 20.0, label: "中" },
  { value: 30.0, label: "大" },
];

const colorList = [
  { value: [1.0, 0.0, 0.0, 1.0], label: "红色" },
  { value: [0.0, 1.0, 0.0, 1.0], label: "绿色" },
  { value: [0.0, 0.0, 1.0, 1.0], label: "蓝色" },
  { value: [1.0, 1.0, 1.0, 1.0], label: "白色" },
];

function DrawPoint() {
  const ref = React.useRef({ pointList: [] });
  const canvasRef = React.useRef(null);
  // const videoRef = React.useRef(null);
  const [size, setSize] = React.useState(sizeList[0]);
  const [color, setColor] = React.useState(colorList[0]);

  const onSizeChange = React.useCallback(({ key }) => {
    setSize(sizeList.find((it) => it.label === key));
  }, []);

  const onColorChange = React.useCallback(({ key }) => {
    setColor(colorList.find((it) => it.label === key));
  }, []);

  const render = React.useCallback((e) => {
    if (
      !ref.current.gl ||
      ref.current.a_Position < 0 ||
      ref.current.a_PointSize < 0 ||
      !ref.current.u_FragColor ||
      !ref.current.pointList ||
      0 === ref.current.pointList.length
    ) {
      return;
    }
    ref.current.gl.clear(ref.current.gl.COLOR_BUFFER_BIT);
    ref.current.pointList.forEach((it) => {
      ref.current.gl.vertexAttrib3f(ref.current.a_Position, ...it.position);
      ref.current.gl.vertexAttrib1f(ref.current.a_PointSize, it.size);
      ref.current.gl.uniform4f(ref.current.u_FragColor, ...it.color);
      ref.current.gl.drawArrays(ref.current.gl.POINTS, 0, 1);
    });
  }, []);

  const onCanvasClick = React.useCallback(
    (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const rect = e.target.getBoundingClientRect();
      ref.current.pointList.push({
        size: ref.current.size.value,
        color: [...ref.current.color.value],
        position: [
          (x - rect.left - rect.width / 2) / (rect.width / 2),
          (rect.height / 2 - (y - rect.top)) / (rect.height / 2),
          0.0,
        ],
      });
      render();
    },
    [render]
  );

  React.useEffect(() => {
    ref.current.size = size;
    ref.current.color = color;
  }, [size, color]);

  React.useEffect(() => {
    ref.current.gl = canvasRef.current.getContext("webgl");
    if (!ref.current.gl) {
      console.log("Failed to get the rendering context for WebGL");
      return;
    }
    if (!webGLUtils.initShaders(ref.current.gl, vertexSource, fragmentSource)) {
      console.log("Failed to intialize shaders.");
      return;
    }
    ref.current.a_Position = ref.current.gl.getAttribLocation(
      ref.current.gl.program,
      "a_Position"
    );
    ref.current.a_PointSize = ref.current.gl.getAttribLocation(
      ref.current.gl.program,
      "a_PointSize"
    );
    if (ref.current.a_Position < 0 || ref.current.a_PointSize < 0) {
      console.log(
        "Failed to get the storage location of a_Position or a_PointSize"
      );
      return;
    }
    ref.current.u_FragColor = ref.current.gl.getUniformLocation(
      ref.current.gl.program,
      "u_FragColor"
    );
    if (!ref.current.u_FragColor) {
      console.log("Failed to get the storage location of u_FragColor");
      return;
    }
    ref.current.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    ref.current.gl.clear(ref.current.gl.COLOR_BUFFER_BIT);
  }, []);

  return (
    <div className={styles.content}>
      <h1>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://sites.google.com/site/webglbook/home/chapter-2"
        >
          绘制点
        </a>
      </h1>
      <div className={styles.form}>
        <span>大小：</span>
        <Dropdown
          overlay={
            <Menu onClick={onSizeChange}>
              {sizeList.map((it) => (
                <Menu.Item key={it.label}>{it.label}</Menu.Item>
              ))}
            </Menu>
          }
        >
          <Button>
            {size.label}&nbsp;&nbsp;
            <DownOutlined />
          </Button>
        </Dropdown>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span>颜色：</span>
        <Dropdown
          overlay={
            <Menu onClick={onColorChange}>
              {colorList.map((it) => (
                <Menu.Item key={it.label}>{it.label}</Menu.Item>
              ))}
            </Menu>
          }
        >
          <Button>
            {color.label}&nbsp;&nbsp;
            <DownOutlined />
          </Button>
        </Dropdown>
      </div>
      <div className={styles.main}>
        <div className={styles.item}>
          <div>绘制结果</div>
          <div className={styles.canvas}>
            <canvas
              ref={canvasRef}
              width="1920"
              height="1080"
              onClick={onCanvasClick}
            >
              你的浏览器似乎不支持或者禁用了HTML5 <code>&lt;canvas&gt;</code>{" "}
              元素.
            </canvas>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <Link to="/app">回到首页</Link>
      </div>
    </div>
  );
}

export default React.memo(DrawPoint, () => true);
