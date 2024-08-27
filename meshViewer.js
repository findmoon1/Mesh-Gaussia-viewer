import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

/**
 * @param {THREE.PerspectiveCamera} camera
 * @param {THREE.Renderer} renderer
 * @param {OrbitControls} controls
 */
export function initMesh(
    renderer, camera, controls
) {
    const scene = new THREE.Scene();


    // Ambient Light
    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.AmbientLight(color, intensity);
        scene.add(light);

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



    // 创建加载器
    const mtlLoader = new MTLLoader();
    const objLoader = new OBJLoader();

    // 加载 MTL 文件
    mtlLoader.load(
        'models/new-model-mesh/new-model.mtl',
        function (mtl) {
            // 预加载材质
            mtl.preload();

            // 设置材质的双面属性
            for (const material of Object.values(mtl.materials)) {
                material.side = THREE.DoubleSide;
            }

            // 设置 OBJLoader 使用这些材质
            objLoader.setMaterials(mtl);

            // 加载 OBJ 文件
            objLoader.load(
                'models/new-model-mesh/new-model.obj',
                function (obj) {
                    // 成功加载后的回调
                    console.log('Model loaded successfully');
                    scene.add(obj); // 将加载的对象添加到场景中
                },
                function (xhr) {
                    // 显示加载进度
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },
                function (err) {
                    // 加载失败时的回调
                    console.error('Failed to load OBJ file:', err);
                }
            );
        },
        function (xhr) {
            // 显示 MTL 文件加载进度
            console.log((xhr.loaded / xhr.total * 100) + '% MTL loaded');
        },
        function (err) {
            // MTL 文件加载失败时的回调
            console.error('Failed to load MTL file:', err);
        }
    );



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

    function render() {
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
        controls.update();
        renderer.render(scene, camera);
    }
    return render;
}



