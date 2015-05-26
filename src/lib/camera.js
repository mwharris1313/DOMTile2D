'use strict';

var Camera = function(parms) {
  var cam = {};
  cam.x = parms.x || 0;
  cam.y = parms.y || 0;
  cam.xTile = parms.xTile || 0;
  cam.yTile = parms.yTile || 0;

  cam.isTransitioning = parms.isTransitioning || false;
  cam.transitionTo = {};
  cam.transitionTo.x = -1;
  cam.transitionTo.y = -1;

  cam.getXYTile = function(){
    var xTile = Math.floor(cam.x / parms.tile.width);
    var yTile = Math.floor(cam.y / parms.tile.height);
    return [xTile, yTile];
  };



  return cam;
};
