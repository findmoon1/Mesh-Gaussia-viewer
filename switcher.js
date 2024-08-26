let currentScene = 'three'; // 默认显示 Three.js 场景
import { initThreeJS } from './main.js';
import { initGaussian } from './viewer.js';

export function initSceneSwitcher() {
    const threeCanvas = document.querySelector('#threeJSCanvas');
    const gaussianCanvas = document.querySelector('#gaussianCanvas');

    if (!threeCanvas || !gaussianCanvas) {
        console.error('Canvas elements not found');
        return;
    }

    function clearPage1() {
        document.body.innerHTML = '';
        // 重新添加画布
        const canvasIds = ['gaussianCanvas', 'threeJSCanvas'];

        canvasIds.forEach(id => {
            const canvas = document.createElement('canvas');
            canvas.id = id;
            document.body.appendChild(canvas);
        });

        // 这里可以调用初始化函数来设置画布
        // 例如: initThreeJS(); 或 initGaussian();
    }

    function loadNewContent(url) {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                document.body.innerHTML = html;
            })
            .catch(err => {
                console.error('Failed to load new content:', err);
            });
    }




    function clearPage2() {
        // 获取要保留的元素
        const loadingScreen = document.getElementById('progressCircleContainer');

        // 清空 body 的内容
        document.body.innerHTML = '';

        // 重新添加要保留的 div 元素
        if (loadingScreen) {
            document.body.appendChild(loadingScreen);
        }

        // 重新添加 canvas 元素
        const canvasIds = ['gaussianCanvas', 'threeJSCanvas'];
        canvasIds.forEach(id => {
            const canvas = document.createElement('canvas');
            canvas.id = id;
            document.body.appendChild(canvas);
        });

        // 这里可以调用初始化函数来设置画布
        // 例如: initThreeJS(); 或 initGaussian();
    }





    function showThreeJS() {

        console.log('pre clean');
        //loadNewContent('index.html');
        //clearPage2();
        console.log('reload');
        threeCanvas.classList.add('visible');
        gaussianCanvas.classList.remove('visible');
        currentScene = 'three';
        initThreeJS();
    }

    function showGaussian() {

        //clearPage1();
        console.log('reload');
        threeCanvas.classList.remove('visible');
        gaussianCanvas.classList.add('visible');
        currentScene = 'gaussian';
        initGaussian();
    }


    window.addEventListener('keydown', (event) => {
        if (event.key === 'n') {
            // 更新画布的透明度
            const canvas_three = document.querySelector('#threeJSCanvas');
            const canvas_gausssian = document.querySelector('#gaussianCanvas');
            if (canvas_three.style.display == 'none') {
                canvas_gausssian.style.display = 'none';
                canvas_three.style.display = 'block';
                console.log('suspend gausssian');
                //StopRender();
                console.log('pre load three');
            } else {
                canvas_three.style.display = 'none';
                canvas_gausssian.style.display = 'block';
                console.log('pre loader gaussian');
            }
        }


    });

    function toggleScene(event) {
        if (event.key === 'T' || event.key === 't') {
            if (currentScene === 'three') {
                showGaussian();
            } else {
                showThreeJS();
            }
        }
    }

    // 初始化时显示 Three.js 场景


    showGaussian();
    const canvas_three = document.querySelector('#threeJSCanvas');
    canvas_three.style.display = 'none';
    showThreeJS();

}

