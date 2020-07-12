
import * as THREE from 'three';

import Rackets from './Rackets.js';

// temp
import Scene from '../core/Scene.js';

//

const plane = new THREE.Plane();

const line3 = new THREE.Line3();

const vec3 = new THREE.Vector3();

//

// contains arrays : [previousPos and currentPos]
const racketsPos = {};

// contains only the vec3 representing the last ball position
const ballsPos = {};

// keep the current position of the racket in racketsPos so we can
// collide balls at high speed between rackets last and current position

function recordRacketPos( racket ) {

	if ( !racketsPos[ racket.id ] ) {

		racketsPos[ racket.id ] = {
			start: {
				position: new THREE.Vector3( racket.position ),
				rotation: new THREE.Euler( racket.rotation )
			},
			end: {
				position: new THREE.Vector3( racket.position ),
				rotation: new THREE.Euler( racket.rotation )
			}
		}

	} else {

		racketsPos[ racket.id ].start = {
			position: racket.position,
			rotation: racket.rotation
		};

		racketsPos[ racket.id ].end = {
			position: racket.position,
			rotation: racket.rotation
		};

	}

}

//

function collideBallWithRackets( ball ) {

	if ( ballsPos[ ball.id ] ) {

		// set line according to this ball current and previous positions

		line3.start = ballsPos[ ball.id ];

		line3.end = ball.position;

		//

		Rackets.rackets.forEach( (racket) => {

			// set plane according to this racket's position and rotation

			vec3
			.set( 0, 1, 0 )
			.applyEuler( racket.rotation )
			.normalize();

			plane.setFromNormalAndCoplanarPoint( vec3, racket.position )

			// if the racket crosses the line created from ball current and last positions

			if ( plane.intersectsLine( line3 ) ) {

				// use the direction of the racket and the length of
				// the ball velocity vector to compute the new
				// velocity after hit by the racket

				vec3
				.multiplyScalar( ball.velocity.length() )
				.negate();

				// move ball to position where it didn't yet cross the racket,
				// in order to avoid a new collision on the way back,
				// then apply the new velocity.
				
				ball.position.copy( ballsPos[ ball.id ] );

				ball.velocity.copy( vec3 );

			}

		})

	}

	// record current ball position for later

	if ( !ballsPos[ ball.id ] ) {

		ballsPos[ ball.id ] = new THREE.Vector3().copy( ball.position );

	} else {

		ballsPos[ ball.id ].copy( ball.position );

	}

}

//

export default {
	recordRacketPos,
	collideBallWithRackets
}