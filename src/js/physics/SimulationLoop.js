
import World from './World.js';
import Balls from './Balls.js';
import Rackets from './Rackets.js';

//

const MAX_BALL_SPEED = 0.01;

const GRAVITY_DRAG = 0.0005;

//

function update( delta ) {

	Balls.balls.forEach( (ball) => {

		// apply gravity
		ball.velocity.z += GRAVITY_DRAG;

		// simulate air friction
		ball.velocity.z -= GRAVITY_DRAG * ( ball.velocity.z / MAX_BALL_SPEED );

		ball.position.add( ball.velocity );

		ball.mesh.position.copy( ball.position );

	});

	Rackets.rackets.forEach( (racket) => {

		racket.mesh.position.copy( racket.position );
		racket.mesh.rotation.copy( racket.rotation );

	});

}

//

export default {
	update
}