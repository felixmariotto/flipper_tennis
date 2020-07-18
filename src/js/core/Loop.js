
import ThreeMeshUI from 'three-mesh-ui';

import Renderer from './Renderer.js';
import Camera from './Camera.js';
import clock from './clock.js';

import Raycasting from '../Raycasting.js';

import SimulationLoop from '../physics/SimulationLoop.js';

//

let ticks, clockDelta;

//

function loop() {

	clockDelta = clock.getDelta();

	ticks = Math.round( ( clockDelta / ( 1 / 60 ) ) * 2 );

	for ( let i = 0 ; i < ticks ; i++ ) {

		SimulationLoop.update( clockDelta / ticks );

	};

	ThreeMeshUI.update();

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