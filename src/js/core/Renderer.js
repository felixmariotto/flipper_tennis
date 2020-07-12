
import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

import Scene from './Scene.js';
import Camera from './Camera.js';

//

const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize( window.innerWidth, window.innerHeight );

renderer.outputEncoding = THREE.sRGBEncoding;

renderer.xr.enabled = true;

document.body.appendChild( VRButton.createButton(renderer) );
document.body.appendChild( renderer.domElement );

//

function render() {

	renderer.render(
		Scene.threeScene,
		Camera.threeCamera
	);

}

//

function updateSize() {

	renderer.setSize(
		window.innerWidth,
		window.innerHeight
	);

}

//

export default {
	threeRenderer: renderer,
	render,
	updateSize
}
