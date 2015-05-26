'use strict';

var Screen = function(parms) {
  var screen = {};
  screen.tileWidth = parms.tileWidth;
  screen.tileHeight = parms.tileHeight;
  screen.width = screen.tileWidth * parms.tile.width + parms.tile.width;
  screen.height = screen.tileHeight * parms.tile.height + parms.tile.height;
  return screen;
};

