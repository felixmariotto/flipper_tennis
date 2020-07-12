
import Renderer from './Renderer.js';
import Camera from './Camera.js';

import Raycasting from '../Raycasting.js';

//

function loop() {

	Raycasting.update();

	Camera.update();

	Renderer.render();

}

//

function init() {

	Renderer.threeRenderer.setAnimationLoop( loop );

}

//

export default {
	init
}