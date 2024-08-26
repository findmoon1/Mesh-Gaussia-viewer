/*
import { OBJLoader } from './file/three.js-dev/examples/jsm/loaders/OBJLoader.js'
{
    const objLoader = new OBJLoader()
    objLoader.load('models/iteration_12500-obj.obj', (root) => {
        scene.add(root)
    })
}
*/

/* import * as THREE from 'three';


function main() {

    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

    const fov = 40;
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 50, 0);
    camera.up.set(0, 0, 1);
    camera.lookAt(0, 0, 0);

    const scene = new THREE.Scene();

    {

        const color = 0xFFFFFF;
        const intensity = 500;
        const light = new THREE.PointLight(color, intensity);
        scene.add(light);

    }

    const objects = [];

    const solarSystem = new THREE.Object3D();
    scene.add(solarSystem);
    objects.push(solarSystem);

    const earthOrbit = new THREE.Object3D();
    earthOrbit.position.x = 10;
    solarSystem.add(earthOrbit);
    objects.push(earthOrbit);

    const radius = 1;
    const widthSegments = 6;
    const heightSegments = 6;
    const sphereGeometry = new THREE.SphereGeometry(
        radius, widthSegments, heightSegments);

    const loader = new THREE.TextureLoader();
    const texture = loader.load('https://threejs.org/manual/examples/resources/images/wall.jpg');
    texture.colorSpace = THREE.SRGBColorSpace;


    const sunMaterial = new THREE.MeshBasicMaterial({ emissive: 0xFFFF00, map: texture });
    const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
    sunMesh.scale.set(5, 5, 5);
    solarSystem.add(sunMesh);
    objects.push(sunMesh);

    const earthMaterial = new THREE.MeshPhongMaterial({ color: 0x2233FF, emissive: 0x112244 });
    const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
    //earthMesh.position.x = 10;
    earthOrbit.add(earthMesh);
    objects.push(earthMesh);

    const moonOrbit = new THREE.Object3D();
    moonOrbit.position.x = 2;
    earthOrbit.add(moonOrbit);

    const moonMaterial = new THREE.MeshPhongMaterial({ color: 0x888888, emissive: 0x222222 });
    const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
    moonMesh.scale.set(.5, .5, .5);
    moonOrbit.add(moonMesh);
    objects.push(moonMesh);

    objects.forEach((node) => {
        const axes = new THREE.AxesHelper();
        axes.material.depthTest = false;
        axes.renderOrder = 1;
        node.add(axes);

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

    function render(time) {

        time *= 0.001;

        if (resizeRendererToDisplaySize(renderer)) {

            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();

        }

        objects.forEach((obj) => {

            obj.rotation.y = time;

        });

        renderer.render(scene, camera);

        requestAnimationFrame(render);

    }

    requestAnimationFrame(render);

}

main();
 */

/* import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/addons/postprocessing/GlitchPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'; */

//let threeJSAnimationId; // 定义一个全局变量用于保存动画 ID

//const canvas = document.querySelector('#threeJSCanvas');
//const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

/* function updateProgressBar(progress) {
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
        progressBar.textContent = `${Math.round(progress)}%`;
    }
} */

/* ,
            (xhr) => {
                // 进度回调
                if (xhr.lengthComputable) {
                    const progress = (xhr.loaded / xhr.total) * 100;
                    updateCircularProgress(progress); // 更新进度条
                }
            },
            (error) => {
                console.error('An error happened during OBJ loading', error);
            } */

//scene.background = new THREE.Color('gray'); // 改成灰色背景以减少对比

/*  const ambientLight = new THREE.AmbientLight(0x404040, 1000);
 scene.add(ambientLight);
 
 const directionalLight = new THREE.DirectionalLight(0xffffff, 1000);
 directionalLight.position.set(5, 10, 2);
 scene.add(directionalLight); */

/* const gui = new GUI();
    gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
    gui.add(light, 'intensity', 0, 500, 0.01);
    gui.add(light.target.position, 'x', -10, 10);
    gui.add(light.target.position, 'z', -10, 10);
    gui.add(light.target.position, 'y', 0, 10); */

/* const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('models/texture.png');
const objLoader = new OBJLoader();
objLoader.load('models/iteration_12500.obj', (root) => {
root.traverse((child) => {
    if (child.isMesh) {
        child.material.map = texture; // 应用纹理贴图
    }
});
scene.add(root);
}); */

/* 
    function updateCircularProgress(progress) {
        const circle = document.getElementById('progressCircleBar');
        const percentageText = document.getElementById('progressCirclePercent');
 
        const circumference = 2 * Math.PI * 45; // 圆的周长
        const offset = circumference - (progress / 100) * circumference; // 根据进度计算偏移量
 
        circle.style.strokeDashoffset = offset;
        percentageText.textContent = `${Math.round(progress)}%`; // 更新中间的百分比文本
    } */

// 初始化时将进度条隐藏
//document.getElementById('progressCircleContainer').style.display = 'none';

// 在开始加载 OBJ 文件时显示进度条
//document.getElementById('progressCircleContainer').style.display = 'block';

// 加载完成后隐藏进度条
//document.getElementById('progressCircleContainer').style.display = 'none';

/* function animate() {
 
       if (resizeRendererToDisplaySize(renderer)) {
           const canvas = renderer.domElement;
           camera.aspect = canvas.clientWidth / canvas.clientHeight;
           camera.updateProjectionMatrix();
       }
 
       requestAnimationFrame(animate);
 
       composer.render();
 
   } */
/* const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);
 
const glitchPass = new GlitchPass();
composer.addPass(glitchPass);
 
const outputPass = new OutputPass();
composer.addPass(outputPass); */

//requestAnimationFrame(render);

//animate();



/* export function stopThreeJS() {
    if (threeJSAnimationId) {
        cancelAnimationFrame(threeJSAnimationId); // 停止动画
        console.log('Three animation stopped');
    }
} */


import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

export function initThreeJS() {
    console.log('Initializing Three.js...');
    const canvas = document.querySelector('#threeJSCanvas');
    if (!canvas) {
        console.error('Canvas element with ID "threeJSCanvas" not found');
        return;
    }

    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        premultipliedAlpha: false,
        antialias: true,
    });

    renderer.shadowMap.enabled = true; // 启用阴影

    const camera = new THREE.PerspectiveCamera(65, canvas.clientWidth / canvas.clientHeight, 0.1, 500);
    camera.up.set(0, -1, -0.6);
    camera.lookAt(0, 0, 0);
    camera.position.set(-1, -4, -6);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = false;
    controls.dampingFactor = 0.1;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.target.set(0, 0, 0);
    controls.update();

    const scene = new THREE.Scene();

    class ColorGUIHelper {
        constructor(object, prop) {
            this.object = object;
            this.prop = prop;
        }

        get value() {
            return `#${this.object[this.prop].getHexString()}`;
        }

        set value(hexString) {
            this.object[this.prop].set(hexString);
        }
    }

    // Ambient Light
    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.AmbientLight(color, intensity);
        scene.add(light);

        const gui = new GUI();
        gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color');
        gui.add(light, 'intensity', 0, 2, 0.01);
    }

    // Hemisphere Light
    {
        const skyColor = 0xB1E1FF; // light blue
        const groundColor = 0xB97A20; // brownish orange
        const intensity = 3;
        const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
        scene.add(light);
    }

    // Directional Light
    {
        const color = 0xFFFFFF;
        const intensity = 3;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(0.8, 10, -7);
        scene.add(light);
        scene.add(light.target);

        light.castShadow = true; // 允许光源投射阴影

        light.shadow.mapSize.width = 2048; // 增加阴影的清晰度
        light.shadow.mapSize.height = 2048;
        light.shadow.camera.near = 1; // 调整阴影相机参数
        light.shadow.camera.far = 50;
        light.shadow.bias = -0.001; // 避免阴影的接缝
    }

    const mtlLoader = new MTLLoader();
    mtlLoader.load('models/model-obj.mtl', (mtl) => {
        mtl.preload();
        const objLoader = new OBJLoader();

        for (const material of Object.values(mtl.materials)) {
            material.side = THREE.DoubleSide;
        }

        objLoader.setMaterials(mtl);

        objLoader.load(
            'models/model.obj',
            (root) => {
                scene.add(root);
                requestRenderIfNotRequested(); // 在模型加载后触发渲染
            }
        );
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

    let renderRequested = false;
    function render() {
        renderRequested = false;
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
        controls.update();
        renderer.render(scene, camera);
        //requestAnimationFrame(render);
    }

    function requestRenderIfNotRequested() {
        if (!renderRequested) {
            renderRequested = true;
            console.log('render three');
            requestAnimationFrame(render);
        }
    }

    controls.addEventListener('change', requestRenderIfNotRequested);
    window.addEventListener('resize', requestRenderIfNotRequested);



    // 初始渲染
    requestRenderIfNotRequested();
}



