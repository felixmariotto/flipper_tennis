
import * as THREE from 'three';
import ThreeMeshUI from 'three-mesh-ui';

//

const BIG_SCREEN_HEIGHT = 1.5;
const BIG_SCREEN_WIDTH = 1.5;
const BIG_SCREEN_DEPTH = 0.1;

const BIG_SCREEN_POS = new THREE.Vector3( 0, 1.25, -1 );

//

const bigScreen = new THREE.Group();

// screen 3D box model

const screenBoxGeom = new THREE.BoxBufferGeometry(
	BIG_SCREEN_WIDTH,
	BIG_SCREEN_HEIGHT,
	BIG_SCREEN_DEPTH
);

const screenBoxMat = new THREE.MeshPhongMaterial({
	color: 0x000000
});

const screenBoxMesh = new THREE.Mesh(
	screenBoxGeom,
	screenBoxMat
);

screenBoxMesh.position.copy( BIG_SCREEN_POS );

bigScreen.add( screenBoxMesh )

//

export default {
	bigScreen
}