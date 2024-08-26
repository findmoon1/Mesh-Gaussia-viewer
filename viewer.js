/* import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d';

console.log('Adding splat scene...');
const viewer = new GaussianSplats3D.Viewer({
    'cameraUp': [0, -1, -0.6],
    'initialCameraPosition': [-1, -4, 6],
    'initialCameraLookAt': [0, 4, 0]
});
viewer.addSplatScene('models/iteration_7000.splat', {
    'splatAlphaRemovalThreshold': 5,
    'showLoadingUI': true,
    'position': [0, 1, 0],
    'rotation': [0, 0, 0, 1],
    'scale': [1.5, 1.5, 1.5]
})
    .then(() => {
        console.log('Scene added successfully');
        viewer.start();
    })
    .catch(error => {
        console.error('Error adding scene:', error);
    });
 */

/* import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d';

console.log('Adding splat scene...');
const viewer = new GaussianSplats3D.Viewer({
    'cameraUp': [0, -1, -0.6],
    'initialCameraPosition': [-1, -4, 6],
    'initialCameraLookAt': [0, 4, 0]
});

viewer.addSplatScene('models/iteration_7000.splat', {
    'splatAlphaRemovalThreshold': 5,
    'showLoadingUI': true,
    'position': [0, 1, 0],
    'rotation': [0, 0, 0, 1],
    'scale': [1.5, 1.5, 1.5]
})
    .then(() => {
        console.log('Scene added successfully');
        viewer.start();

        // 在场景加载完成后添加键盘事件监听器
        setupCustomKeyboardControls();
    })
    .catch(error => {
        console.error('Error adding scene:', error);
    });

// 自定义按键设置功能
function setupCustomKeyboardControls() {
    window.addEventListener('keydown', (event) => {
        switch (event.code) {
            case 'KeyT':
                // 自定义 P 键功能：切换点云模式
                togglePointCloudMode();
                break;
            // 你可以在这里添加更多自定义按键功能
            // case 'KeyX':
            //     customFunctionX();
            //     break;
            default:
                console.log(`Key ${event.code} pressed but not handled.`);
        }
    });
}

// 切换点云模式功能
function togglePointCloudMode() {
    if (!viewer.usingExternalCamera) {
        const pointCloudModeEnabled = viewer.splatMesh.getPointCloudModeEnabled();
        viewer.splatMesh.setPointCloudModeEnabled(!pointCloudModeEnabled);
        console.log(`Point Cloud Mode: ${!pointCloudModeEnabled ? 'Enabled' : 'Disabled'}`);
    }
} */

/* import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

let isThreeJSActive = false; // 标志位用于切换渲染器
let threeJSSceneReady = false;

const gaussianCanvas = document.querySelector('#gaussianCanvas');
const threeJSCanvas = document.querySelector('#threeJSCanvas');

// Gaussian Splat Viewer 初始化
const viewer = new GaussianSplats3D.Viewer({
    'cameraUp': [0, -1, -0.6],
    'initialCameraPosition': [-1, -4, 6],
    'initialCameraLookAt': [0, 4, 0],
    canvas: gaussianCanvas // 将 Gaussian Viewer 的 canvas 设为 gaussianCanvas
});

viewer.addSplatScene('models/iteration_7000.splat', {
    'splatAlphaRemovalThreshold': 5,
    'showLoadingUI': true,
    'position': [0, 1, 0],
    'rotation': [0, 0, 0, 1],
    'scale': [1.5, 1.5, 1.5]
}).then(() => {
    viewer.start();
}).catch(error => {
    console.error("Failed to load splat scene:", error);
});

// Three.js 初始化
const renderer = new THREE.WebGLRenderer({
    canvas: threeJSCanvas,
    alpha: true,
    premultipliedAlpha: false,
    antialias: true,
});
renderer.shadowMap.enabled = true;

const fov = 60;
const aspect = 2;
const near = 0.1;
const far = 50;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.up.set(0, -1, 0);
camera.position.set(0.8, 0, -7);

const controls = new OrbitControls(camera, threeJSCanvas);
controls.target.set(0, 0, 0);
controls.update();

const scene = new THREE.Scene();

const mtlLoader = new MTLLoader();
mtlLoader.load('models/model-obj.mtl', (mtl) => {
    mtl.preload();
    const objLoader = new OBJLoader();
    for (const material of Object.values(mtl.materials)) {
        material.side = THREE.DoubleSide;
    }
    objLoader.setMaterials(mtl);
    objLoader.load('models/model.obj', (root) => {
        scene.add(root);
        threeJSSceneReady = true; // 标志Three.js场景加载完成
        console.log("Three.js scene is ready");
    });
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

function clearGaussianScene() {
    if (viewer) {
        viewer.stop(); // 停止 GaussianSplats3D 渲染
        const context = gaussianCanvas.getContext('2d');
        if (context) {
            context.clearRect(0, 0, gaussianCanvas.width, gaussianCanvas.height);
        }
    }
}

function clearThreeJSScene() {
    if (scene) {
        scene.clear(); // 清除 Three.js 场景中的对象
    }
    if (renderer) {
        renderer.clear(); // 清除渲染器缓存
    }
}

function render() {
    if (isThreeJSActive && threeJSSceneReady) {
        // 隐藏 Gaussian Splat Canvas，显示 Three.js Canvas
        gaussianCanvas.style.display = 'none';
        threeJSCanvas.style.display = 'block';

        // 清除 Gaussian Splat 内容
        clearGaussianScene();

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        controls.update(); // 更新控制
        renderer.render(scene, camera);
    } else {
        // 隐藏 Three.js Canvas，显示 Gaussian Splat Canvas
        threeJSCanvas.style.display = 'none';
        gaussianCanvas.style.display = 'block';

        // 清除 Three.js 内容
        clearThreeJSScene();

        viewer.render();
    }
    requestAnimationFrame(render);
}

requestAnimationFrame(render);

// 添加键盘监听事件
window.addEventListener('keydown', (event) => {
    if (event.code === 'KeyT') {
        isThreeJSActive = !isThreeJSActive;
        console.log(`Toggled to ${isThreeJSActive ? 'Three.js' : 'Gaussian Splat'} rendering`);
    }
}); */


/* import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d';

function initGaussian() {
    console.log('Adding splat scene...');
    const viewer = new GaussianSplats3D.Viewer({
        'cameraUp': [0, -1, -0.6],
        'initialCameraPosition': [-1, -4, 6],
        'initialCameraLookAt': [0, 4, 0]
    });
    viewer.addSplatScene('models/iteration_7000.splat', {
        'splatAlphaRemovalThreshold': 5,
        'showLoadingUI': true,
        'position': [0, 1, 0],
        'rotation': [0, 0, 0, 1],
        'scale': [1.5, 1.5, 1.5]
    })
        .then(() => {
            console.log('Scene added successfully');
            viewer.start();
        })
        .catch(error => {
            console.error('Error adding scene:', error);
        });
}


 */

// viewer.js



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





