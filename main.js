import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { initGaussian } from './gaussianViewer'
import { initMesh } from './meshViewer'

const canvas = document.querySelector('#c');

const camera = new THREE.PerspectiveCamera(65, 800 / 600, 0.1, 500);
camera.position.copy(new THREE.Vector3().fromArray([-0.5, -1, -7]));
camera.up = new THREE.Vector3().fromArray([0, -0.8, -0.5]).normalize();
camera.lookAt(new THREE.Vector3().fromArray([0, 0, 0]));

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
controls.enablePan = true;
controls.target.set(0, 0, 0);
controls.update();

const renderWidth = canvas.clientWidth;
const renderHeight = canvas.clientHeight;
const rootElement = document.createElement('div');
rootElement.style.width = renderWidth + 'px';
rootElement.style.height = renderHeight + 'px';
document.body.appendChild(rootElement);
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    premultipliedAlpha: false,
    antialias: true,
});
rootElement.appendChild(renderer.domElement);

const renderGS = initGaussian(renderer, camera, controls);
const renderMesh = initMesh(renderer, camera, controls);

/** @type {'gs' | 'mesh'} */
let renderMode = 'gs';

function render() {
    if (renderMode === 'gs') {
        renderGS();
    }
    else if (renderMode === 'mesh') {
        renderMesh();
    }
    requestAnimationFrame(render);
}

requestAnimationFrame(render);

window.addEventListener('keydown', (e) => {
    if (e.key === '1') {
        renderMode = 'gs';
    } else if (e.key === '2') {
        renderMode = 'mesh';
    }
});

