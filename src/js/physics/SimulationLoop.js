
import World from './World.js';
import Balls from './Balls.js';
import Rackets from './Rackets.js';
import Collision from './Collision.js';

//

const MAX_BALL_SPEED = 0.1;

const GRAVITY_DRAG = 0.00035;

//

function update( delta ) {

	// position rackets according to VR controllers

	Rackets.rackets.forEach( (racket) => {

		// set position and rotation from controller

		/*
		const newZPos = Math.sin( Date.now() / 50 );
		racket.velocity.z = newZPos - racket.position.z;
		racket.position.z = newZPos;
		*/

		racket.velocity
		.copy( racket.controller.position )
		.sub( racket.position )

		racket.position.copy( racket.controller.position );

		// get rotation from rotated mesh inside controller space
		racket.rotation.setFromQuaternion( racket.mesh.getWorldQuaternion() );

		// record position for collision with balls
		Collision.recordRacketPos( racket );

	});

	// move balls and collide them

	Balls.balls.forEach( (ball) => {

		// apply gravity
		ball.velocity.z += GRAVITY_DRAG;

		// simulate air friction
		ball.velocity.z -= GRAVITY_DRAG * ( ball.velocity.z / MAX_BALL_SPEED );

		ball.position.add( ball.velocity );

		World.bounceBall( ball );

		// collide this ball against both rackets
		Collision.collideBallWithRackets( ball );

		ball.mesh.position.copy( ball.position );

		// recover ball when it was lost
		if ( ball.position.z > 3 ) ball.reset();

	});

}

//

export default {
	update
}