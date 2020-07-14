
import Balls from './physics/Balls.js';

export default {
	startGame
}

//

startGame();

function startGame() {

	Balls.popBall();

	setTimeout( () => {

		Balls.popBall();

	}, 1000 );

}