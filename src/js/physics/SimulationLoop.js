
import World from './World.js';
import Balls from './Balls.js';
import Rackets from './Rackets.js';

function update( delta ) {

	Balls.balls.forEach( (ball) => {

		ball.mesh.position.copy( ball.position );

	});

	Rackets.rackets.forEach( (racket) => {

		racket.mesh.position.copy( racket.position );
		racket.mesh.rotation.copy( racket.rotation );

	});

}

export default {
	update
}