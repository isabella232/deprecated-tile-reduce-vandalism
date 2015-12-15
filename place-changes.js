'use strict'
var time = require('time')(Date);
var yesterday = (time.time() - 7 * 24 * 60 * 60);

module.exports = function(tileLayers, tile, writeData, done) {
    var layer = tileLayers.osm.osm;
    var result = layer.features.filter(function(val) {
        return (val.geometry.type == 'Point' && val.properties.place && (val.properties._timestamp >= yesterday));
    });
    done(null, result);
};