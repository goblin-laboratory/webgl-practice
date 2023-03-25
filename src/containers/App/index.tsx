import React from 'react';

import * as THREE from 'three';

function initRenderer(canvas: any) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);
  return renderer;
}

function initCamera() {
  const fov = 45;
  const aspect = window.innerWidth / window.innerHeight; // the canvas default
  const near = 0.1;
  const far = 40;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  // camera.position.z = 10;
  camera.position.set(0, 0, 10);
  camera.lookAt(0, 0, 0);
  return camera;
}

class Warehouse {
  private width = 800;
  private height = 600;
  private depth = 10;
  private positionSize = 1;
  private boxRate = 0.8;

  constructor(x: number, y: number, z: number) {
    this.width = x;
    this.height = y;
    this.depth = z;
  }

  get boxSize() {
    return this.positionSize * this.boxRate;
  }
  get gap() {
    return (this.positionSize - this.boxSize) / 2;
  }
  get xAxisMin() {
    return -1 * (this.width / 2);
  }
  get yAxisMin() {
    return -1 * (this.height / 2);
  }
  get zAxisMin() {
    return 0;
  }

  getXAxixValue(x: number) {
    return this.xAxisMin + x * this.positionSize + this.gap;
  }

  getYAxixValue(y: number) {
    return this.yAxisMin + y * this.positionSize + this.gap;
  }

  getZAxixValue(z: number) {
    return this.zAxisMin + z * this.positionSize + this.gap;
  }

  forEach(render: any) {
    const positions = [];
    for (let x = 0; x < this.width; x += 1) {
      const xAxisValue = this.getXAxixValue(x);
      for (let y = 0; y < this.height; y += 1) {
        const yAxisValue = this.getYAxixValue(y);
        for (let z = 0; z < this.depth; z += 1) {
          const zAxisValue = this.getZAxixValue(z);
          positions.push({ xAxisValue, yAxisValue, zAxisValue });
          render(x * this.width + y * this.height + z * this.depth, xAxisValue, yAxisValue, zAxisValue);
        }
      }
    }
    console.table(positions, ['xAxisValue', 'yAxisValue', 'zAxisValue']);
  }

  get count() {
    return this.width * this.height * this.depth;
  }
}

const warehouse = new Warehouse(1, 1, 1);

let initialState = false;
function init(canvas?: any) {
  if (!canvas || initialState) {
    return;
  }
  initialState = true;
  const renderer = initRenderer(canvas);
  const camera = initCamera();

  const scene = new THREE.Scene();

  // const color = 0xffffff;
  // const intensity = 1;
  // const light = new DirectionalLight(color, intensity);
  // light.position.set(-1, 2, 4);
  // scene.add(light);

  const boxWidth = 0.8;
  const boxHeight = 0.8;
  const boxDepth = 0.8;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });

  // const cubes = new THREE.InstancedMesh(geometry, material, warehouse.count);
  // warehouse.forEach((idx: number, xAxis: number, yAxis: number, zAxis: number) => {
  //   // greenish blue
  //   const matrix = new THREE.Matrix4();
  //   matrix.setPosition(xAxis, yAxis, zAxis);
  //   debugger;
  //   cubes.setMatrixAt(idx, matrix);
  //   // cube.position.set(x, y, z);
  // });
  // scene.add(cubes);

  // const lod = new THREE.LOD();
  // lod.addLevel(cubes, 0);
  // scene.add(lod);

  // const mesh = new THREE.InstancedMesh(geometry, material, 1);
  // const matrix = new THREE.Matrix4();
  // matrix.setPosition(0.5, 0.5, 0.5);
  // mesh.setMatrixAt(0, matrix);

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(-0.5, -0.5, 0.5);


  // 将 InstancedMesh 添加到场景中
  scene.add(mesh);

  const axesHelper = new THREE.AxesHelper(10);
  scene.add(axesHelper);

  // const cubes = [{ color: 0x39b20a }, { color: 0x44aa88 }, { color: 0xc50d0d }].map((it, idx: number) => {
  //   const material = new MeshPhongMaterial({ color: it.color }); // greenish blue
  //   const cube = new Mesh(geometry, material);
  //   cube.position.x = idx;
  //   scene.add(cube);
  //   return cube;
  // });

  // const cube = new Mesh(geometry, material);
  // scene.add(cube);

  function render(time: any) {
    time *= 0.001; // convert time to seconds

    // cube.rotation.x = time;
    // cube.rotation.y = time;

    renderer.render(scene, camera);

    // requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

function App() {
  const ref = React.useRef<any>();
  React.useEffect(() => {
    init(ref.current);
  }, []);
  return <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} />;
}

export default App;
