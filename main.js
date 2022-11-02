import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

///Camera & Scene
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.2, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(85);



renderer.render(scene,camera);

/// Shape ///




const moonTexture = new THREE.TextureLoader().load('moon_surface.jpg');
const depthTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(2,26,26),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: depthTexture,
    wireframe:false,
  })
)

scene.add(moon);



moon.position.z = -15;
moon.position.setX(-6);


const earthTexture = new THREE.TextureLoader().load('earth.jpg');

const Terra = new THREE.Mesh(
  new THREE.SphereGeometry(4,32,32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
  wireframe: false,
  })
  
)
 
scene.add(Terra);

const TerraObj = new THREE.Object3D();
TerraObj.add(Terra);
scene.add(TerraObj);

const moonObj = new THREE.Object3D();
moonObj.add(TerraObj);
scene.add(moonObj);


Terra.position.x = -45;

const sunTexture = new THREE.TextureLoader().load('sun.jpg');

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(16,60, 60),
  new THREE.MeshStandardMaterial({
    map:sunTexture,
    wireframe:false,
  })

)

scene.add(sun);

sun.add(Terra);
Terra.add(moon);





///lightning///

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);


scene.add(pointLight,ambientLight);

///Mouse Interaction///

const controls = new OrbitControls(camera, renderer.domElement);

///random objects generation///

function addStar(){
  const texture = new THREE.TextureLoader().load("asteroid.jpg")
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const materialS = new THREE.MeshStandardMaterial({
    map:texture,
    wireframe:false,
  });
  const star = new THREE.Mesh(geometry,materialS);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));

  star.position.set(x,y,z);
  scene.add(star);

}

Array(250).fill().forEach(addStar);



///background image
const backgroundTexture = new THREE.TextureLoader().load('greenspace.jpg');
scene.background=backgroundTexture;

///Move Camera Function Due to Scroll

function updateCamera(ev) {
  let div1 = document.getElementById("div1");
  camera.position.x = 65 - window.scrollY / 500.0;
  camera.position.z = 65 - window.scrollY / 500.0;
}

window.addEventListener("scroll", updateCamera);

 /// document.body.onscroll = moveCameraAway;

/*
function moveCameraCloser(){
  const t= document.body.getBoundingClientRect().top;

  camera.position.z+=t*0.001;
  camera.position.x+=t*0.00005;
  camera.position.y+=t*0.000015;


}

function checkScrollDirection(){
  
  if(document.body.scrollTop <=0){
    moveCameraAway();
    return
  }
  else{
   moveCameraCloser();
    return;
  }
}
*/





/// Constant Loop To render objects in real time
function animate(){
  requestAnimationFrame(animate);

  moon.rotation.y +=0.006;
  moonObj.rotateY(0.0015);
  TerraObj.rotateY(0.0022);
  sun.rotateY(0.0003);

  Terra.rotation.y +=0.004;
  
  
  controls.update();

  renderer.render(scene,camera);
}

animate();



