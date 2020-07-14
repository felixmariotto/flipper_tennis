
import * as THREE from 'three';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

import Scene from './core/Scene.js';
import Raycasting from './Raycasting.js';

//

/*
const room = new THREE.LineSegments(
	new BoxLineGeometry( 6, 6, 6, 10, 10, 10 ).translate( 0, 3, 0 ),
	new THREE.LineBasicMaterial( { color: 0x808080 } )
);

Scene.add( room );
*/

//

const roomMesh = new THREE.Mesh(
	new THREE.BoxGeometry( 6, 6, 6, 10, 10, 10 ).translate( 0, 3, 0 ),
	new THREE.MeshBasicMaterial({ side: THREE.BackSide }),
);

Raycasting.addPointerObstacle( roomMesh );