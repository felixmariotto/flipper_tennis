
import * as THREE from 'three';

import Scene from '../core/Scene.js';

//

const RACKET_RADIUS = 0.2;

const RACKET_THICKNESS = 0.02;

const RACKET_START_POS = new THREE.Vector3( 0, 0, 0 );
// const RACKET_START_POS = new THREE.Vector3( 0, 1.1, 0 );
const RACKET_START_ROT = new THREE.Euler( Math.PI / 2, 0, 0 );

const RACKET_MATERIAL = new THREE.MeshBasicMaterial({ color: 0x999999 });

const rackets = [];

//

function Racket() {

	const racketGeom = new THREE.CylinderBufferGeometry(
		RACKET_RADIUS,
		RACKET_RADIUS,
		RACKET_THICKNESS,
		16
	);

	const mesh = new THREE.Mesh( racketGeom, RACKET_MATERIAL );

	return {
		mesh,
		radius: RACKET_RADIUS,
		position: new THREE.Vector3().copy( RACKET_START_POS ),
		rotation: new THREE.Euler().copy( RACKET_START_ROT ),
		velocity: new THREE.Vector3(),
		id: ( Math.random() * 1000000 ).toFixed()
	}

}

//

function popRacket() {

	const newRacket = Racket();

	rackets.push( newRacket );

	Scene.threeScene.add( newRacket.mesh );

}

//

export default {
	popRacket,
	rackets
}