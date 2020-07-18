
import * as THREE from 'three';
import ThreeMeshUI from 'three-mesh-ui';

import robotoJSON from 'three-mesh-ui/examples/assets/Roboto-msdf.json';
import robotoPNG from 'three-mesh-ui/examples/assets/Roboto-msdf.png';

//

const BIG_SCREEN_HEIGHT = 1.5;
const BIG_SCREEN_WIDTH = 1.5;
const BIG_SCREEN_DEPTH = 0.1;

const LEVEL_TILE_HEIGHT = (BIG_SCREEN_HEIGHT - 0.28) / 5;
const LEVEL_TILE_WIDTH = (BIG_SCREEN_WIDTH - 0.20) / 4;

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

// rows

const rows = [];

for ( let i=0 ; i<5 ; i++ ) {

	const row = new ThreeMeshUI.Block({
		height: LEVEL_TILE_HEIGHT + 0.017,
		width: BIG_SCREEN_WIDTH,
		backgroundColor: new THREE.Color( 0xff00ff ),
		offset: 0,
		backgroundOpacity: 0,
		contentDirection: 'row',
		justifyContent: 'center',
		alignContent: 'center'
	});

	uiContainer.add( row );

	rows.push( row );

}

// level tiles

rows.forEach( (row) => {

	const rowColor = new THREE.Color(
		(Math.random() * 0.2) + 0.2,
		(Math.random() * 0.2) + 0.2,
		(Math.random() * 0.2) + 0.2
	)

	for ( let i=0 ; i<4 ; i++ ) {

		const tile = new ThreeMeshUI.Block({
			height: LEVEL_TILE_HEIGHT,
			width: LEVEL_TILE_WIDTH,
			margin: 0.01,
			backgroundColor: rowColor,
			justifyContent: 'center',
			alignContent: 'center',
			fontSize: 0.1
		});

		tile.add(
			new ThreeMeshUI.Text({
				content: String( i )
			})
		)

		row.add( tile );

	}

})

//

export default {
	bigScreen
}