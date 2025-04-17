import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/postprocessing/UnrealBloomPass.js';

const scene = new THREE.Scene()

let holocar = document.querySelector(".holocar");
let holocar2 = document.querySelector(".holocar2");
const el = document.getElementsByClassName('skr');
let slovc = document.querySelector(".slovc");
let slovc2 = document.querySelector(".slovc2");
let slo = document.querySelector(".slo");
let slo2 = document.querySelector(".slo2");

let model;
let modep;

const loader = new GLTFLoader();
loader.load('model/aaa/2323.gltf', 
  (gltf) => {
    model = gltf.scene;
    model.scale.set(1.5,1.5,1.5);
    model.position.set(0,0,0);
    model.visible = false; 
    scene.add(model);
  },
  undefined,
  (error) => {
    console.error('Error: ' + error);
  }
);
const loader2 = new GLTFLoader();
loader2.load('model/ooo/2121.gltf', 
  (gltf) => {
    modep = gltf.scene;
    modep.scale.set(0.9,0.9,0.9);
    modep.position.set(0,-0.5,0);
    modep.visible = false; 
    scene.add(modep);
  },
  undefined,
  (error) => {
    console.error('Error: ' + error);
  }
);

holocar.onclick = function() {
  for (let i = 0; i < el.length; i++) {
    el[i].style.display = "none";
    holocar.style.display = "none";
    holocar2.style.display = "none";
  }
  if (model) {
    model.visible = true;
    slovc.style.display = "block";
    slovc2.style.display = "block";
  }
}

holocar2.onclick = function() {
    for (let i = 0; i < el.length; i++) {
      el[i].style.display = "none";
      holocar2.style.display = "none";
      holocar.style.display = "none";
    }
    if (modep) {
      modep.visible = true;
      slo.style.display = "block";
      slo2.style.display = "block";
    }
  }

//Свет
const ambientLight = new THREE.AmbientLight('orange', 0.5)
scene.add(ambientLight)

const dirLight = new THREE.DirectionalLight('white', 5.5)
dirLight.position.set(2,8,3)
scene.add(dirLight)

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 100)
camera.position.z = 6

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 3;
controls.maxDistance = 7;

//PosP
const renderPass = new RenderPass(scene, camera)
const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5,
    0.4,
    0.85
)
const composer = new EffectComposer(renderer)
composer.addPass(renderPass)
composer.addPass(bloomPass)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshStandardMaterial({color: 'blue'})

//const cube = new THREE.Mesh(geometry, material)
//cube.position.set(0,0,0)
//scene.add(cube)


//const raycaster = new THREE.Raycaster()
//const mouse = new THREE.Vector2()

//function onMouseClick(event){
    //mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
   // mouse.y = - (event.clientY / window.innerWidth) * 2 + 1;

    //raycaster.setFromCamera(mouse, camera)

    //const intersects = raycaster.intersectObjects(scene.children)

    //if(intersects.length > 0)
        //intersects[0].object.material.color.set('red')
//}

//window.addEventListener('click', onMouseClick)

function animate(){
    requestAnimationFrame(animate)

    model.rotation.y += 0.001
    modep.rotation.y += 0.001

    controls.update()
    composer.render()
}

animate()