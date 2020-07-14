
import * as THREE from 'three';
import Scene from '../core/Scene.js';

const planes = [
	new THREE.Plane( new THREE.Vector3( -1, 0, 0 ), 1.25 ),
	new THREE.Plane( new THREE.Vector3( 1, 0, 0 ), 1.25 ),
	new THREE.Plane( new THREE.Vector3( 0, -1, 0 ), 2.5 ),
	new THREE.Plane( new THREE.Vector3( 0, 1, 0 ), 0 )
];

planes.forEach( (plane) => {

	var helper = new THREE.PlaneHelper( plane, 1, 0xffff00 );
	Scene.threeScene.add( helper );

});

function bounceBall( ball ) {

	planes.forEach( (plane) => {

		if ( plane.distanceToPoint( ball.position ) < 0 ) {

			ball.velocity.reflect( plane.normal )

		}

	})

}

export default {
	bounceBall
}