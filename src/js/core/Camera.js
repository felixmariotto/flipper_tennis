
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Renderer from './Renderer.js';
import defaults from '../../data/defaults.js';
import config from '../../data/config.js';

//

const camera = new THREE.PerspectiveCamera(
	defaults.cameraFOV,
	window.innerWidth/window.innerHeight,
	defaults.cameraMinPlane,
	defaults.cameraFarPlane
);

camera.position.copy( defaults.cameraInitPos );

camera.lookAt( defaults.cameraInitTarget );

//

let controls;

if ( config.useControls ) {

	controls = new OrbitControls(
		camera,
		Renderer.threeRenderer.domElement
	);

	camera.position.copy( defaults.cameraInitPos );

	controls.target.copy( defaults.cameraInitTarget );

	controls.update();

}

//

function updateAspect() {

	camera.aspect = window.innerWidth / window.innerHeight;
	
	camera.updateProjectionMatrix();

}

//

function update() {

	if ( config.useControls ) {

		controls.update();

	}

}

//

export default {
	threeCamera: camera,
	updateAspect,
	update
}
