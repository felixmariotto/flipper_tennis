
import * as THREE from 'three';

import Scene from '../core/Scene.js';

//

const balls = [];

const BALL_RADIUS = 0.1;

const BALL_MATERIAL = new THREE.MeshBasicMaterial({ color: 0x000000 });

const BALL_START_POS = new THREE.Vector3( 0, 1.1, -3 );
const BALL_START_VEL = new THREE.Vector3( 0, 0, 0 );
const BALL_SHOT_SPEED = 0.1;

//

function Ball() {

	const mesh = new THREE.Mesh(
		new THREE.SphereBufferGeometry( BALL_RADIUS, 16, 16 ),
		BALL_MATERIAL
	)

	const startPosition = BALL_START_POS;

	return {
		mesh,
		startPosition,
		radius: BALL_RADIUS,
		position: new THREE.Vector3().copy( startPosition ),
		velocity: new THREE.Vector3().copy( BALL_START_VEL ),
		id: (Math.random() * 1000000).toFixed(0),
		shotSpeed: BALL_SHOT_SPEED,
		remove
	}

}

//

function remove() {

	balls.splice( balls.indexOf( this ), 1 );

	Scene.threeScene.remove( this.mesh );

	this.mesh.geometry.dispose();

}

//

function popBall() {

	const newBall = Ball();

	balls.push( newBall );

	Scene.threeScene.add( newBall.mesh );

}

//

export default {
	popBall,
	balls
}