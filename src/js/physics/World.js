
import * as THREE from 'three';
import Scene from '../core/Scene.js';

const planes = [
	new THREE.Plane( new THREE.Vector3( -1, 0, 0 ), 2 ),
	new THREE.Plane( new THREE.Vector3( 1, 0, 0 ), 2 ),
	new THREE.Plane( new THREE.Vector3( 0, -1, 0 ), 2 ),
	new THREE.Plane( new THREE.Vector3( 0, 1, 0 ), 2 )
];

planes.forEach( (plane) => {

	var helper = new THREE.PlaneHelper( plane, 1, 0xffff00 );
	Scene.threeScene.add( helper );

});

export default undefined