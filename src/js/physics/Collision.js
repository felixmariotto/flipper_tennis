
import * as THREE from 'three';

import Rackets from './Rackets.js';

// temp
import Scene from '../core/Scene.js';

//

const plane = new THREE.Plane();

const line3 = new THREE.Line3();

const vec3 = new THREE.Vector3();

//

const ballsPos = {}

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

			console.log( plane.intersectsLine( line3 ) )

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
	collideBallWithRackets
}