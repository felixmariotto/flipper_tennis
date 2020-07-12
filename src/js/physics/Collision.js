
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
				position: undefined,
				rotation: undefined
			},
			end: {
				position: new THREE.Vector3( racket.position ),
				rotation: new THREE.Euler( racket.rotation )
			}
		}

	} else {

		racketsPos[ racket.id ].start = {
			position: racketsPos[ racket.id ].end.position,
			rotation: racketsPos[ racket.id ].end.rotation
		};

		racketsPos[ racket.id ].end = {
			position: racket.position,
			rotation: racket.rotation
		};

	}

}

//

function collideBallWithRackets( ball ) {

	// if previous ball position was recorded,
	// we trigger collision search with each racket.

	if ( ballsPos[ ball.id ] ) {

		Rackets.rackets.forEach( (racket) => {

			// abort if the racket record is not full

			if (
				!racketsPos[ racket.id ] ||
				!racketsPos[ racket.id ].start ||
				!racketsPos[ racket.id ].end
			) {
				return
			}

			// trigger collision search with individual rackets

			collideBallRacket(
				ballsPos[ ball.id ],
				ball.position,
				racketsPos[ racket.id ].start,
				racketsPos[ racket.id ].end
			);

		});

	};

	



	/*

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

	*/

	// record current ball position for later

	if ( !ballsPos[ ball.id ] ) {

		ballsPos[ ball.id ] = new THREE.Vector3().copy( ball.position );

	} else {

		ballsPos[ ball.id ].copy( ball.position );

	}

}

// collide ball with individual racket from the racket records

function collideBallRacket( ballStart, ballEnd, racketStart, racketEnd ) {

	//////////////////////////////////////////
	// broadly check for a possible collision
	//////////////////////////////////////////

	// set line from ball previous and current position

	line3.start = ballStart;

	line3.end = ballEnd;

	//

	setPlaneFromPosRot( racketStart.position, racketStart.rotation );

	const IntersectRacketStart = plane.intersectsLine( line3 );

	const distRackStartBallStart = plane.distanceToPoint( ballStart );

	const distRackStartBallEnd = plane.distanceToPoint( ballEnd );

	setPlaneFromPosRot( racketEnd.position, racketEnd.rotation );

	const IntersectRacketEnd = plane.intersectsLine( line3 );

	const distRackEndBallStart = plane.distanceToPoint( ballStart );

	const distRackEndBallEnd = plane.distanceToPoint( ballEnd );

	// check if a racket plane is crossing the line or
	// if at least one ball is between the two planes

	if (
		Math.sign( distRackStartBallStart ) !== Math.sign( distRackEndBallStart ) ||
		Math.sign( distRackStartBallEnd ) !== Math.sign( distRackEndBallEnd ) ||
		IntersectRacketStart ||
		IntersectRacketEnd
	) {
		console.log('got it')
	}

}

// set the plane from a position and a rotation,
// in order to match the surface of the racket

function setPlaneFromPosRot( position, rotation ) {

	vec3
	.set( 0, 1, 0 )
	.applyEuler( rotation )
	.normalize();

	plane.setFromNormalAndCoplanarPoint( vec3, position )

};

//

export default {
	recordRacketPos,
	collideBallWithRackets
}