const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 8080;

const app = express()

	.use( express.static( path.join( __dirname, 'dist' ) ) )

	.get('/', (req, res) => {

		res.sendFile( path.join( __dirname, 'dist/index.html' ) );

	})

	.listen( PORT, () => {

		console.log( 'App listening on port ' + PORT );

	})