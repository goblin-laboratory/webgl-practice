import React from "react";
import { Typography, Card } from "antd";
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
  const ref = React.useRef({});
  const canvasRef = React.useRef(null);

  const initVertexBuffer = React.useCallback((gl, location, data, size) => {
    const buffer = gl.createBuffer();
    const vertices = new Float32Array(data);
    if (!buffer) {
      return false;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(location);
    return true;
  }, []);

  const render = React.useCallback((e) => {
    if (!ref.current.gl || ref.current.a_Position < 0) {
      return;
    }
    ref.current.gl.clear(ref.current.gl.COLOR_BUFFER_BIT);
    const n = 3;
    initVertexBuffer(ref.current.gl, ref.current.a_Position, [0.0, 0.5, -0.5, -0.5, 0.5, -0.5], 2);
    if (initVertexBuffer(ref.current.gl, ref.current.a_Position)) {
      ref.current.gl.drawArrays(ref.current.gl.TRIANGLES, 0, n);
    }
  }, [initVertexBuffer]);

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
    ref.current.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    ref.current.gl.clear(ref.current.gl.COLOR_BUFFER_BIT);
    render();
  }, [render]);

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
        <div className={styles.canvas}>
          <canvas ref={canvasRef} width="1920" height="1080">
            你的浏览器似乎不支持或者禁用了HTML5 <code>&lt;canvas&gt;</code>{" "}
            元素.
          </canvas>
        </div>
      </div>
    </Card>
  );
}

export default React.memo(DrawTriangle, () => true);
