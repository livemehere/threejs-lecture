import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {LightProbeHelper} from "three/examples/jsm/helpers/LightProbeHelper";
import {MathUtils} from "three";

// INIT
const width = innerWidth;
const height = innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,width/height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// 카메라 세팅
camera.position.set(5,5,5);
camera.lookAt(0,0,0)



// 헬퍼
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper)

const gridHelper = new THREE.GridHelper(10,10);
scene.add(gridHelper);

// 컨트롤
const controls = new OrbitControls(camera, renderer.domElement);



// 햇빛
const light = new THREE.DirectionalLight('#fff',1);
scene.add(light);
light.position.set(5,5,5);

// 빛 헬퍼
const lightHelper = new THREE.DirectionalLightHelper(light,1);
scene.add(lightHelper)

// 전체적 빛
const light2 = new THREE.AmbientLight('#fff');
scene.add(light2);




// 물체 추가
const cube = createCube(1);
scene.add(cube);
cube.position.y = 1;

const line = createLine();
scene.add(line);

const plane = createPlan();
scene.add(plane);
plane.rotation.x = MathUtils.degToRad(-90);

const sphere = createSphere();
scene.add(sphere);
sphere.position.set(2,1,0)




animate();

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
    cube.rotation.y += 0.01;
}

function createCube(size){
    const geometry = new THREE.BoxGeometry(size,size,size);
    const material = new THREE.MeshStandardMaterial({color:'blue'});
    return new THREE.Mesh(geometry,material);
}

function createLine(){
    const material = new THREE.LineBasicMaterial({color:'#fff'});
    const points = [];
    points.push(new THREE.Vector3(-3,0,0))
    points.push(new THREE.Vector3(0,3,0))
    points.push(new THREE.Vector3(3,0,0))
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return new THREE.Line(geometry, material);
}

function createPlan(){
    const geometry = new THREE.PlaneGeometry(10,10);
    const material = new THREE.MeshStandardMaterial({color:'#fff', side:THREE.DoubleSide})
    return new THREE.Mesh(geometry, material);
}

function createSphere(){
    const geometry = new THREE.SphereGeometry(1, 16,16);
    const material = new THREE.MeshPhongMaterial({color:'red'});
    material.shininess = 100;
    // material.wireframe = true;
    // material.flatShading = true;
    return new THREE.Mesh(geometry,material);
}
