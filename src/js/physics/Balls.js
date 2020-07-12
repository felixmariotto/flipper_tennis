
import * as THREE from 'three';

import Scene from '../core/Scene.js';

//

const balls = [];

const BALL_RADIUS = 0.1;

const BALL_MATERIAL = new THREE.MeshBasicMaterial();

const BALL_START_POS = new THREE.Vector3( 0, 1.1, -2 );
const BALL_START_VEL = new THREE.Vector3( 0, 0, 0 );

//

function Ball() {

	const mesh = new THREE.Mesh(
		new THREE.SphereBufferGeometry( BALL_RADIUS, 16, 16 ),
		BALL_MATERIAL
	)

	return {
		mesh,
		radius: BALL_RADIUS,
		position: new THREE.Vector3().copy( BALL_START_POS ),
		velocity: new THREE.Vector3().copy( BALL_START_VEL )
	}

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