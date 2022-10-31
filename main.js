import './style.css'
import * as THREE from './node_modules/three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { LoadingManager } from 'three';

const progressBar = document.getElementById('progress-bar');

LoadingManager.onProgress = function(url, loaded, total){
  progressBar.value = (loaded / total) * 100;
}

const progressBarContainer = document.querySelector('.progress-bar-container');
const mainElem = document.querySelector('.main');

LoadingManager.onLoad = function () {
  progressBarContainer.style.visibility = 'hidden';
}

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    .1,
    1000
    );

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(25);

const torusTexture = new THREE.TextureLoader().load("ship-texture.jpg");
const normalTexture = new THREE.TextureLoader().load("normal.jpg");
const torusGeo = new THREE.TorusGeometry(10, 3, 16, 100);
const torusGeoTwo = new THREE.TorusGeometry(20, 3, 16, 200);
const torusMat = new THREE.MeshStandardMaterial({map: torusTexture, normalMap: normalTexture});
const torus = new THREE.Mesh(torusGeo, torusMat);
const torusTwo = new THREE.Mesh(torusGeoTwo, torusMat);

const sphereGeo = new THREE.SphereGeometry(10, 10, 10);
const sphereOne = new THREE.Mesh(sphereGeo, torusMat);
const sphereTwo = new THREE.Mesh(sphereGeo, torusMat);

const cubeTexture = new THREE.TextureLoader().load('Jake.jpg');
const boxGeo = new THREE.BoxGeometry(50, 50, 50);
const boxMat = new THREE.MeshBasicMaterial({map: cubeTexture, transparent: true, opacity: 0});
const cube = new THREE.Mesh(boxGeo, boxMat);

const ambientLight = new THREE.AmbientLight(0xffffff);
const pointLight = new THREE.PointLight(0xffffff);

torus.position.setZ(-150);
torusTwo.position.setZ(-150);
cube.position.setZ(-400);
cube.position.setX(70);
sphereOne.position.setZ(-250);
sphereOne.position.setX(50);
sphereOne.position.setY(25);
sphereTwo.position.setZ(-325);
sphereTwo.position.setX(-50);
sphereTwo.position.setY(-25);
pointLight.position.z = -150;
pointLight.position.y = 50
scene.add(torus, torusTwo, cube, sphereOne, sphereTwo, ambientLight, pointLight);
Array(10000).fill().forEach(addStars);

const background = new THREE.TextureLoader().load('space.jpg');
scene.background = background;

renderer.render(scene, camera);


//place and animate geometry into the scene
function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);

    torus.rotation.x += .014;
    torusTwo.rotation.y += .014;

    sphereOne.rotation.y += .02;
    sphereTwo.rotation.y += .02;

    if( camera.position.z > -300){
      camera.position.z -= .14;
    } else {
      camera.position.z -= .14;
      boxMat.opacity += .005;
      cube.position.z -= .14;
    }
}

//keep perspective on objects in the scene when window is resized
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function addStars(){
  const geometry = new THREE.SphereGeometry(.5, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xe0e0ff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(1200));

  star.position.set(x, y, z);
  scene.add(star);
}

function rotateCube(){
  cube.rotation.y += .01
}

window.addEventListener('resize', onWindowResize, false);
window.addEventListener('scroll', rotateCube, false);

window.scrollTo({ top: 0, behavior: 'smooth' });
animate();

