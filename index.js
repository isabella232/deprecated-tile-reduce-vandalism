'use strict'
var tileReduce = require('tile-reduce');
var turf = require('turf');
var argv = require('minimist')(process.argv.slice(2));
var path = require('path');
var fs = require('fs');

var area = JSON.parse(argv.area);
var fc = turf.featurecollection([]);

tileReduce({
    bbox: area,
    zoom: 12,
    map: path.join(__dirname, '/place-changes.js'),
    sources: [{name: 'osm', mbtiles: path.join(__dirname, '/', argv.mbtiles), raw: false}]
})
.on('reduce', function(result) {
    fc.features = fc.features.concat(result);
})
.on('end', function() {
    fs.writeFile(path.join(__dirname, '/places-changed.geojson'), JSON.stringify(fc));
});
