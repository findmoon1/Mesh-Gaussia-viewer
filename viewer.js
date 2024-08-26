import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


export function initGaussian() {

    console.log('Initializing Gaussian.js...');
    const canvas = document.querySelector('#gaussianCanvas');
    if (!canvas) {
        console.error('Canvas element with ID "gaussianCanvas" not found');
        return;
    }

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

    const viewer = new GaussianSplats3D.Viewer({
        'camera': camera,
        'renderer': renderer,
        'cameraUp': [0, -0.8, -0.5],
        'initialCameraPosition': [-0.5, -1, -7],
        'initialCameraLookAt': [0, 0, 0],
    });


    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    let freeze_frame = false;
    let renderRequested = false;
    function render() {
        renderRequested = false;
        if (resizeRendererToDisplaySize(renderer)) {
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
        /* if (freeze_frame) {
            return;
        } */
        controls.update();
        //console.log('Rendering on canvas:', renderer.domElement);
        viewer.update();
        viewer.render();
        // 请求下一帧渲染
        //requestAnimationFrame(render);
    }

    function requestRenderIfNotRequested() {
        if (!renderRequested) {
            renderRequested = true;
            console.log('render gaussian');
            requestAnimationFrame(render);
        }
    }

    controls.addEventListener('change', requestRenderIfNotRequested);
    window.addEventListener('resize', requestRenderIfNotRequested);


    /* window.addEventListener('keydown', (ev) => {
        if (ev.key == 'b') {
            console.log('activate b');
            freeze_frame = !freeze_frame;
            requestAnimationFrame(render);
        }
    }) */

    function StopRender() {
        freeze_frame = !freeze_frame;
        console.log('end');
        requestAnimationFrame(render);
    }

    viewer.addSplatScene('models/iteration_7000.splat', {
        'splatAlphaRemovalThreshold': 5,
        'showLoadingUI': true,
        'position': [0, 0, 0],
        'rotation': [0, 0, 0, 1],
        'scale': [1.5, 1.5, 1.5]
    })
        .then(() => {
            console.log('Scene added successfully');
            //viewer.start();
            console.log('Custom canvas:', canvas);
            requestAnimationFrame(render);
        })
        .catch(error => {
            console.error('Error adding scene:', error);
        });



}





