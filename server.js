if ( process.env.NODE_ENV !== 'production' ) {
    console.log('running a non-production instance');
    require('dotenv').config();
} else{
    console.log('running a PRODUCTION instance');
}


const express = require('express');
const app = express();
app.use(express.static(__dirname + '/dist'));
app.listen(process.env.PORT || 8080);
const path = require('path');

app.get('/api/env', function(req, res) {
    const rp = require('request-promise');
    const url = process.env.SERVER_URL + '/api/v1/env';
    rp( url )
        .then(function( data ) {
            const env = JSON.parse( data );
            env['SERVER_URL'] = process.env.SERVER_URL; // add SERVER_URL
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify( env ));
        })
        .catch(function( error ){
            console.log( error );
        });
});

app.get('/*', function(req, res){
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});
console.log('Server listening on port ' + ( process.env.PORT || 8080 ));
