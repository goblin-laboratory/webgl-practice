import React from 'react';
import { Typography, Card } from 'antd';
import * as THREE from 'three';
import styles from './index.module.less';

function HelloThreeJS() {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5);
    const scene = new THREE.Scene();
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
    const cube = new THREE.Mesh(geometry, material);
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(-1, 2, 4);
    scene.add(cube);
    scene.add(light);

    camera.position.z = 2;
    renderer.render(scene, camera);

    const render = (timestamp) => {
      const step = timestamp / 1000;
      cube.rotation.x = step;
      cube.rotation.y = step;
      renderer.render(scene, camera);
      window.requestAnimationFrame(render);
    };
    window.requestAnimationFrame(render);
  }, []);

  return (
    <Card>
      <Typography>
        <Typography.Title>Hello Three.js</Typography.Title>
        <Typography.Paragraph>
          <Typography.Link
            href="https://threejs.org/docs/index.html#manual/zh/introduction/Creating-a-scene"
            target="_blank"
          >
            Hello Three.js
          </Typography.Link>
        </Typography.Paragraph>
      </Typography>
      <canvas ref={canvasRef}>
        你的浏览器似乎不支持或者禁用了HTML5 <code>&lt;canvas&gt;</code> 元素.
      </canvas>
      {/* <div className={styles.content}>
        <div className={styles.canvas}>
          <canvas ref={canvasRef}>
            你的浏览器似乎不支持或者禁用了HTML5 <code>&lt;canvas&gt;</code> 元素.
          </canvas>
        </div>
      </div> */}
    </Card>
  );
}

export default React.memo(HelloThreeJS, () => true);
