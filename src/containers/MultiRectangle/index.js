import React from 'react';
import { Typography, Card } from 'antd';
import webGLUtils from '../../utils/webGLUtils';
import styles from './index.module.less';

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

function MultiRectangle() {
  const ref = React.useRef({});
  const canvasRef = React.useRef(null);

  const render = React.useCallback((e) => {
    if (!ref.current.gl || ref.current.a_Position < 0) {
      return;
    }
    ref.current.gl.clear(ref.current.gl.COLOR_BUFFER_BIT);
    const buffer = ref.current.gl.createBuffer();
    if (!buffer) {
      return false;
    }
    ref.current.gl.bindBuffer(ref.current.gl.ARRAY_BUFFER, buffer);
    ref.current.gl.vertexAttribPointer(ref.current.a_Position, 2, ref.current.gl.FLOAT, false, 0, 0);
    ref.current.gl.enableVertexAttribArray(ref.current.a_Position);
    const n = 4;
    [
      [-0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, -0.5],
      [-0.75, 0.25, -0.75, -0.75, 0.25, 0.25, 0.25, -0.75],
    ].forEach((it) => {
      ref.current.gl.bufferData(ref.current.gl.ARRAY_BUFFER, new Float32Array(it), ref.current.gl.STATIC_DRAW);
      ref.current.gl.drawArrays(ref.current.gl.TRIANGLE_STRIP, 0, n);
    });
  }, []);

  React.useEffect(() => {
    ref.current.gl = canvasRef.current.getContext('webgl');
    if (!ref.current.gl) {
      console.log('Failed to get the rendering context for WebGL');
      return;
    }
    if (!webGLUtils.initShaders(ref.current.gl, vertexSource, fragmentSource)) {
      console.log('Failed to intialize shaders.');
      return;
    }
    ref.current.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    ref.current.gl.clear(ref.current.gl.COLOR_BUFFER_BIT);
    render();
  }, [render]);

  return (
    <Card>
      <Typography>
        <Typography.Title>绘制多个矩形</Typography.Title>
        <Typography.Paragraph>
          <Typography.Link
            href="https://webglfundamentals.org/webgl/lessons/zh_cn/webgl-fundamentals.html"
            target="_blank"
          >
            WebGL 理论基础：WebGL 基础概念
          </Typography.Link>
        </Typography.Paragraph>
      </Typography>
      <div className={styles.content}>
        <div className={styles.canvas}>
          <canvas ref={canvasRef} width="1920" height="1080">
            你的浏览器似乎不支持或者禁用了HTML5 <code>&lt;canvas&gt;</code> 元素.
          </canvas>
        </div>
      </div>
    </Card>
  );
}

export default React.memo(MultiRectangle, () => true);
