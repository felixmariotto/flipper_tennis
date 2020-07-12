
import World from './World.js';
import Balls from './Balls.js';
import Rackets from './Rackets.js';
import Collision from './Collision.js';

//

const MAX_BALL_SPEED = 0.1;

const GRAVITY_DRAG = 0.0005;

//

function update( delta ) {

	// position rackets according to VR controllers

	Rackets.rackets.forEach( (racket) => {

		// set position and rotation from controller

		racket.position.z = Math.sin( Date.now() / 100 );

		Collision.recordRacketPos( racket );

		// apply position and rotation to the mesh

		racket.mesh.position.copy( racket.position );
		racket.mesh.rotation.copy( racket.rotation );

	});

	// move balls and collide them

	Balls.balls.forEach( (ball) => {

		// apply gravity
		ball.velocity.z += GRAVITY_DRAG;

		// simulate air friction
		ball.velocity.z -= GRAVITY_DRAG * ( ball.velocity.z / MAX_BALL_SPEED );

		ball.position.add( ball.velocity );

		// collide this ball against both rackets
		Collision.collideBallWithRackets( ball );

		ball.mesh.position.copy( ball.position );

	});

}

//

export default {
	update
}