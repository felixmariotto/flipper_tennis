
import * as THREE from 'three';

import VRControls from './VRControls.js';

//

let intersect;

const pointerObstacles = [];

const raycaster = new THREE.Raycaster();

//

function addPointerObstacle( object ) {

	pointerObstacles.push( object );

}

//

function raycast() {

	return pointerObstacles.reduce( (closestIntersection, obj)=> {

		const intersection = raycaster.intersectObject( obj, true );

		if ( !intersection[0] ) return closestIntersection

		if ( !closestIntersection || intersection[0].distance < closestIntersection.distance ) {

			intersection[0].object = obj;

			return intersection[0]

		} else {

			return closestIntersection

		};

	}, null );

};

//

function update() {

	for ( let i=0 ; i<2 ; i++ ) {

		VRControls.setFromController( i, raycaster.ray );

		intersect = raycast();

		// Position the little white dot at the end of the controller pointing ray
		VRControls.setPointerAt( i, intersect.point );

	}

}

//

export default {
	addPointerObstacle,
	update
}