import React from 'react';

import { WebGLRenderer, PerspectiveCamera, Scene, DirectionalLight, BoxGeometry, MeshPhongMaterial, Mesh } from 'three';

function initRenderer(canvas: any) {
  const renderer = new WebGLRenderer({ antialias: true, canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);
  return renderer;
}

function initCamera() {
  const fov = 75;
  const aspect = window.innerWidth / window.innerHeight; // the canvas default
  const near = 0.1;
  const far = 1000;
  const camera = new PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 5;
  return camera;
}

let initialState = false;
function init(canvas?: any) {
  if (!canvas || initialState) {
    return;
  }
  initialState = true;
  const renderer = initRenderer(canvas);
  const camera = initCamera();

  const scene = new Scene();

  const color = 0xffffff;
  const intensity = 1;
  const light = new DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new BoxGeometry(boxWidth, boxHeight, boxDepth);

  const material = new MeshPhongMaterial({ color: 0x44aa88 }); // greenish blue

  const cube = new Mesh(geometry, material);
  scene.add(cube);

  function render(time: any) {
    const seconds = time * 0.001; // convert time to seconds

    cube.rotation.x = seconds;
    cube.rotation.y = seconds;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

function HelloWorld() {
  const ref = React.useRef<any>();
  React.useEffect(() => {
    init(ref.current);
  }, []);
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} />;
}

export default HelloWorld;
