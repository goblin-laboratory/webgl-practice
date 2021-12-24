import React from "react";
import { Link } from "react-router-dom";
import {
  createProgramInfo,
  createBufferInfoFromArrays,
  setBuffersAndAttributes,
  setUniforms,
  createTextures,
  createTexture,
  drawBufferInfo,
} from "twgl.js";
// import { mat4 } from "gl-matrix";
import "./index.css";

const vs = `#version 300 es
in vec4 a_position;
void main() {
  gl_Position = a_position;
}
`;

var fs = `#version 300 es
precision highp float;
out vec4 outColor;
void main() {
  // Just set the output to a constant reddish-purple
  outColor = vec4(1, 0, 1, 1);
}
`;

function ThreejsGettingStarted() {
  const ref = React.useRef({});
  const canvasRef = React.useRef(null);
  const videoRef = React.useRef(null);

  // React.useEffect(() => {
  //   const gl = ref.current.getContext("webgl");
  // }, []);

  React.useEffect(() => {
    // ref.current.gl = canvasRef.current.getContext("webgl2");
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1920, height: 1080 },
      })
      .then((stream) => {
        ref.current.stream = stream;
        if (videoRef && videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      });
    return () => {
      // const { stream } = ref.current;
      // if (stream) {
      //   // 销毁 stream
      // }
    };
  }, []);

  React.useEffect(() => {
    const gl = canvasRef.current.getContext("webgl2");
    const programInfo = createProgramInfo(gl, [vs, fs]);
    const arrays = {
      position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
    };
    const bufferInfo = createBufferInfoFromArrays(gl, arrays);
    gl.useProgram(programInfo.program);
    setBuffersAndAttributes(gl, programInfo, bufferInfo);
    gl.clearColor(1.0, 0.0, 0.0, 1.0);

    function render(time) {
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      const texture = createTexture(gl, {
        src: videoRef.current,
        width: gl.canvas.width,
        height: gl.canvas.height,
      });
      // const uniforms = {
      //   time: time * 0.001,
      //   resolution: [gl.canvas.width, gl.canvas.height],
      // };
      // setUniforms(programInfo, uniforms);
      drawBufferInfo(gl, bufferInfo);
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    return () => {};
  }, []);

  return (
    <div className="content">
      <h1>
        <a target="_blank" rel="noreferrer" href="https://twgljs.org/docs/">
          TWGL: A Tiny WebGL helper Library
        </a>
      </h1>
      <h2>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://zhuanlan.zhihu.com/p/45483345"
        >
          WebGL 理论基础 - 基础概念 中
        </a>
      </h2>
      <div className="main">
        <div className="item">
          <div>视频源</div>
          <video ref={videoRef}></video>
        </div>
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
        <Link to="/mdn-animating">下一步：渲染视频</Link>
      </div>
    </div>
  );
}

export default React.memo(ThreejsGettingStarted, () => true);
