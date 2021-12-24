import React from "react";
import { Link } from "react-router-dom";
// import { mat4 } from "gl-matrix";
import webGLUtils from "../../utils/webGLUtils";
import "./index.css";

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

function DrawPoint() {
  // const ref = React.useRef({});
  const canvasRef = React.useRef(null);
  // const videoRef = React.useRef(null);

  React.useEffect(() => {
    const gl = canvasRef.current.getContext("webgl");
    if (!gl) {
      console.log("Failed to get the rendering context for WebGL");
      return;
    }
    if (!webGLUtils.initShaders(gl, vertexSource, fragmentSource)) {
      console.log("Failed to intialize shaders.");
      return;
    }
    const a_Position = gl.getAttribLocation(gl.program, "a_Position");
    const a_PointSize = gl.getAttribLocation(gl.program, "a_PointSize");
    if (a_Position < 0 || a_PointSize < 0) {
      console.log(
        "Failed to get the storage location of a_Position or a_PointSize"
      );
      return;
    }
    const u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
    if (!u_FragColor) {
      console.log("Failed to get the storage location of u_FragColor");
      return;
    }

    gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);
    gl.vertexAttrib1f(a_PointSize, 10.0);
    gl.uniform4f(u_FragColor, 1.0, 0.0, 0.0, 0.0);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, 1);
  }, []);

  return (
    <div className="content">
      <h1>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://sites.google.com/site/webglbook/home/chapter-2"
        >
          绘制点
        </a>
      </h1>
      <div className="main">
        <div className="item">
          <div>绘制结果</div>
          <div className="canvas">
            <canvas ref={canvasRef} width="1920" height="1080">
              你的浏览器似乎不支持或者禁用了HTML5 <code>&lt;canvas&gt;</code>{" "}
              元素.
            </canvas>
          </div>
        </div>
      </div>
      <div className="footer">
        <Link to="/twgl-getting-started">
          下一步：TWGL: A Tiny WebGL helper Library
        </Link>
      </div>
    </div>
  );
}

export default React.memo(DrawPoint, () => true);
