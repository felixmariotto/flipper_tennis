
import * as THREE from 'three';
import ThreeMeshUI from 'three-mesh-ui';

import robotoJSON from 'three-mesh-ui/examples/assets/Roboto-msdf.json';
import robotoPNG from 'three-mesh-ui/examples/assets/Roboto-msdf.png';

//

const BIG_SCREEN_HEIGHT = 1.5;
const BIG_SCREEN_WIDTH = 1.5;
const BIG_SCREEN_DEPTH = 0.1;

const BIG_SCREEN_POS = new THREE.Vector3( 0, 1.25, -1 );

//

const bigScreen = new THREE.Group();

bigScreen.position.copy( BIG_SCREEN_POS );

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

bigScreen.add( screenBoxMesh )

// user interface

const uiContainer = new ThreeMeshUI.Block({
	height: BIG_SCREEN_HEIGHT,
	width: BIG_SCREEN_WIDTH,
	fontFamily: robotoJSON,
	fontTexture: robotoPNG
});

uiContainer.position.z += (BIG_SCREEN_DEPTH / 2) + 0.01;

bigScreen.add( uiContainer );

// title

const titleContainer = new ThreeMeshUI.Block({
	height: 0.15,
	width: BIG_SCREEN_WIDTH,
	justifyContent: 'center',
	offset: 0,
	backgroundOpacity: 0,
	fontSize: 0.08
});

titleContainer.add(
	new ThreeMeshUI.Text({
		content: 'Select a level :'
	})
);

uiContainer.add( titleContainer );

//

export default {
	bigScreen
}