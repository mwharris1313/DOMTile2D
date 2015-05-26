'use strict';

var WorldMap = function(parms) {
  var worldMap = {};
  worldMap.tileWidth = parms.tileWidth;
  worldMap.tileHeight = parms.tileHeight;
  worldMap.width = parms.tileWidth * parms.tile.width;
  worldMap.height = parms.tileHeight * parms.tile.height;
  return worldMap;
};