
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import Scene from '../core/Scene.js';

// ROOM MODEL

// Instantiate a loader
const loader = new GLTFLoader();

let navGeometry;

const plane = new THREE.Plane();

const ray = new THREE.Ray();

/*
// Optional: Provide a DRACOLoader instance to decode compressed mesh data
var dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/examples/js/libs/draco/' );
loader.setDRACOLoader( dracoLoader );
*/

// Load a glTF resource
loader.load( 'https://vr-games-host.s3.eu-west-3.amazonaws.com/projects/flipper_tennis/game_assets/01.glb', ( gltf ) => {

	Scene.threeScene.add( gltf.scene );

	// parse nav geometry used for ball collision

	gltf.scene.traverse( (child) => {

		if ( child.name === 'navmesh' ) {

			navGeometry = new THREE.Geometry().fromBufferGeometry( child.geometry );

			navGeometry.rotateX( child.rotation.x );
			navGeometry.rotateY( child.rotation.y );
			navGeometry.rotateZ( child.rotation.z );

		}

	})

});

// ROOM

const planes = [
	new THREE.Plane( new THREE.Vector3( -1, 0, 0 ), 0.75 ),
	new THREE.Plane( new THREE.Vector3( 1, 0, 0 ), 0.75 ),
	new THREE.Plane( new THREE.Vector3( 0, -1, 0 ), 2.0 ),
	new THREE.Plane( new THREE.Vector3( 0, 1, 0 ), -0.5 )
];

const roomMesh = new THREE.Mesh(
	new THREE.BoxBufferGeometry( 1.5, 1.5, 300 ),
	new THREE.MeshNormalMaterial({ side: THREE.BackSide })
);
roomMesh.position.set( 0, 1.25, 0 )

// Scene.threeScene.add( roomMesh );

// GOAL

const GOAL_POS = new THREE.Vector3( 0, 1.5, -8 );
const GOAL_RADIUS = 0.15;

const goalMaterial = new THREE.MeshBasicMaterial( {color: 0xff2626} );

const goalMesh = new THREE.Mesh(
	new THREE.SphereBufferGeometry( GOAL_RADIUS, 32, 32 ),
	goalMaterial
);
goalMesh.position.copy( GOAL_POS );

Scene.threeScene.add( goalMesh );

function checkGoal( ball ) {

	if ( ball.position.distanceTo( GOAL_POS ) < ball.radius + GOAL_RADIUS ) {

		goalMaterial.color.set( 0x51f52c )

	}

}

// FUNCTIONS

// holds the last position of the ball
const ballsPos = {};

const intersectVec = new THREE.Vector3();

function bounceBall( ball ) {

	// abort is there is no navGeometry to test for intersection
	if ( !navGeometry ) return

	/*
	planes.forEach( (plane) => {

		if ( plane.distanceToPoint( ball.position ) < 0 ) {

			// bounce the ball from the wall
			ball.velocity.reflect( plane.normal )

			// avoid that the ball becomes uncontrollable between walls
			ball.velocity.x *= 0.8;
			ball.velocity.y *= 0.8;

			// push the ball out from the wall to avoid repeated bouncing
			ball.position.copy( plane.projectPoint( ball.position, new THREE.Vector3() ));

			ball.position.add( ball.velocity );

		}

	});
	*/

	// check if there is a record for this ball to compute intersection
	if ( ballsPos[ ball.id ] ) {

		// set ray from previous and current ball position

		ray.origin.copy( ballsPos[ ball.id ] );

		ray.lookAt( ball.position );

		// get distance from previous to current position

		const ballTravetDist = Math.abs( ballsPos[ ball.id ].distanceTo( ball.position ) )

		// compute intersection for every face in the navGeometry

		let collisions = [];

		navGeometry.faces.forEach( (face) => {

			// get the three vertices of the face
			const vertices = [
				navGeometry.vertices[ face.a ],
				navGeometry.vertices[ face.b ],
				navGeometry.vertices[ face.c ]
			];

			// get intersection between the ray and the face
			ray.intersectTriangle(
				vertices[0],
				vertices[1],
				vertices[2],
				false,
				intersectVec
			);

			// get distance from ray origin to intersection
			const rayToFaceDist = Math.abs( ray.origin.distanceTo( intersectVec ) )

			if ( ballTravetDist > rayToFaceDist ) {

				collisions.push({
					face,
					distanceInside: ballTravetDist - rayToFaceDist
				})

				// temp
				vertices.forEach( (vertex) => {

					const helper = new THREE.Mesh(
						new THREE.SphereBufferGeometry( 0.03, 8, 8 ),
						new THREE.MeshNormalMaterial()
					);

					helper.position.copy( vertex );

					// Scene.add( helper );

				});

			}

		});

		// sort collision to get the more relevant

		collisions = collisions.sort( (a, b) => {

			if ( a.distanceInside > b.distanceInside ) return -1
			else if ( a.distanceInside > b.distanceInside ) return 1
			else return 0

		});

		// bounce the ball

		if ( collisions.length > 0 ) {

			ball.velocity.reflect( collisions[0].face.normal );
			ball.velocity.multiplyScalar( 0.8 );

			ball.position.add( ball.velocity );

		}

	}

	// record current ball position for later

	if ( !ballsPos[ ball.id ] ) {

		ballsPos[ ball.id ] = new THREE.Vector3().copy( ball.position );

	} else {

		ballsPos[ ball.id ].copy( ball.position );

	}

}

export default {
	bounceBall,
	checkGoal
}