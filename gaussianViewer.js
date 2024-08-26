import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


/**
 * @param {THREE.Renderer} renderer
 * @param {THREE.PerspectiveCamera} camera 
 * @param {OrbitControls} controls 
 */
export function initGaussian(
    renderer, camera, controls
) {

    const canvas = renderer.domElement;

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

    function render() {
        if (resizeRendererToDisplaySize(renderer)) {
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
        controls.update();
        viewer.update();
        viewer.render();
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
        })
        .catch(error => {
            console.error('Error adding scene:', error);
        });

    return render;

}





