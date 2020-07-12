
import * as THREE from 'three';

import Rackets from './Rackets.js';

//

const plane = new THREE.Plane();

const line3 = new THREE.Line3();

const vec3 = new THREE.Vector3();

const lerp = THREE.MathUtils.lerp;

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
				position: new THREE.Vector3(),
				rotation: new THREE.Euler()
			},
			end: {
				position: new THREE.Vector3().copy( racket.position ),
				rotation: new THREE.Euler().copy( racket.rotation )
			}
		}

	} else {

		racketsPos[ racket.id ].start.position.copy(
			racketsPos[ racket.id ].end.position
		);

		racketsPos[ racket.id ].start.rotation.copy(
			racketsPos[ racket.id ].end.rotation
		);

		//

		racketsPos[ racket.id ].end.position.copy(
			racket.position
		);

		racketsPos[ racket.id ].end.rotation.copy(
			racket.rotation
		);

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
		
		// cut the trajectory of the ball and the racket in 10
		// interpolated points

		const distanceSets = [];

		for ( let i=0 ; i<11 ; i++ ) {

			const factor = i / 10;

			distanceSets[ i ] = {};

			// interpolated ball positions

			distanceSets[ i ].ball = new THREE.Vector3(
				lerp( ballStart.x, ballEnd.x, factor ),
				lerp( ballStart.y, ballEnd.y, factor ),
				lerp( ballStart.z, ballEnd.z, factor )
			)

			// interpolated rackets position

			distanceSets[ i ].racket = {
				position: new THREE.Vector3(
					lerp( racketStart.position.x, racketEnd.position.x, factor ),
					lerp( racketStart.position.y, racketEnd.position.y, factor ),
					lerp( racketStart.position.z, racketEnd.position.z, factor )
				),
				rotation: new THREE.Euler(
					lerp( racketStart.rotation.x, racketEnd.rotation.x, factor ),
					lerp( racketStart.rotation.y, racketEnd.rotation.y, factor ),
					lerp( racketStart.rotation.z, racketEnd.rotation.z, factor )
				)
			}

		}

		// sort the sets by distance

		distanceSets

		.map( (set) => {

			setPlaneFromPosRot( set.racket.position, set.racket.rotation );

			set.distance = Math.abs( plane.distanceToPoint( set.ball ) );

			return set

		})

		.sort( (set1, set2) => {

			return set1.distance > set2.distance ? 1 : -1;

		});

		if ( distanceSets[0].distance > distanceSets[1].distance ) distanceSets.reverse()

		// if closest approach is farther than a ball diameter,
		// then recursively call this function to get closer

		if ( distanceSets[0].distance > 0.1 ) {

			console.log('iterate')

			collideBallRacket(
				distanceSets[0].ball,
				distanceSets[1].ball,
				distanceSets[0].racket,
				distanceSets[1].racket,
			);

		} else {

			console.log( distanceSets[0].distance )

		}

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