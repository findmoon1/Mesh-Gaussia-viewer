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

    // const mtlLoader = new MTLLoader();
    // mtlLoader.load('models/model-obj.mtl', (mtl) => {
    //     mtl.preload();
    //     const objLoader = new OBJLoader();

    //     for (const material of Object.values(mtl.materials)) {
    //         material.side = THREE.DoubleSide;
    //     }

    //     objLoader.setMaterials(mtl);
    //     objLoader.load(
    //         'models/model.obj',
    //         (root) => {
    //             console.log("Added model to scene");
    //             scene.add(root);
    //         },
    //         (err) => {
    //             console.error('Failed to load OBJ:', err);
    //         }
    //     );
    // });

    const loader = new OBJLoader();

    loader.load(
        "models/model.obj",
        // onLoad callback
        function ( obj ) {
            // Add the loaded object to the scene
            scene.add( obj );
        },
        function ( xhr ) {
            console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        },
        function ( err ) {
            console.error( 'An error happened' );
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



