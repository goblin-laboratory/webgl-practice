import React from "react";
import { Typography, Card, Dropdown, Menu, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import webGLUtils from "../../utils/webGLUtils";
import styles from "./index.module.less";

const vertexSource = `
attribute vec4 a_Position;
void main() {
  gl_Position = a_Position;
}
`;

const fragmentSource = `
precision mediump float;

void main() {
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`;

function DrawTriangle() {
  const ref = React.useRef({ pointList: [] });
  const canvasRef = React.useRef(null);

  const render = React.useCallback((e) => {
    if (!ref.current.gl || ref.current.a_Position < 0) {
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
    <Card>
      <Typography>
        <Typography.Title>绘制三角形</Typography.Title>
        <Typography.Paragraph>
          <Typography.Link href="https://sites.google.com/site/webglbook/home/chapter-3">
            WebGL 权威指南第三章：绘制三角形
          </Typography.Link>
        </Typography.Paragraph>
      </Typography>
      <div className={styles.content}>
        {/* <div className={styles.form}>
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
        </div> */}
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
    </Card>
  );
}

export default React.memo(DrawTriangle, () => true);
