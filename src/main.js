var g = {};
g.tile = {};
g.tile.width = 32;
g.tile.height = 32;
g.screen = {};
g.screen.width = 256;
g.screen.height = 256;
g.screen.tileWidth = 9;
g.screen.tileHeight = 9;
g.worldmap = {};
g.worldmap.tileWidth = worldmap.width;
g.worldmap.tileHeight = worldmap.height;
g.worldmap.width = g.worldmap.tileWidth * g.tile.width;
g.worldmap.height = g.worldmap.tileHeight * g.tile.height;
g.worldArr = [];
$(document).ready(function(){
  main();
});

// ##################################################################
var main = function(){
  console.log('Starting main() ....');

  init();
  screenInit();

};

// ******************************************************************
var init = function(){
  console.log('Starting init() ...');
  console.log('SCREEN: ', g.screen.width, g.screen.height);
  console.log('SCREEN TILE WxH: ', g.screen.tileWidth, g.screen.tileHeight);
  console.log('WORLDMAP: ', g.worldmap.width, g.worldmap.height);

  console.dir(worldmap);
  var tilearray = worldmap.layers[0].data;
  console.log(tilearray);

  // initial 2d world array
  for (var i=0; i<g.worldmap.tileHeight; i++){
    g.worldArr.push(Array(g.worldmap.tileWidth + 1).join('0').split(''));
  }

  // load worldmap data into worldMap 2d array
  var tileNumber = 0;
  for (var y=0; y<g.worldmap.tileHeight; y++){
    for (var x=0; x<g.worldmap.tileWidth; x++){
      g.worldArr[x][y] = tilearray[tileNumber];
      tileNumber++;
    }
  }

  // test render
  for (var y=0; y<g.worldmap.tileHeight; y++){
    var rowStr = '';
    for (var x=0; x<g.worldmap.tileWidth; x++){
      rowStr += g.worldArr[x][y];
    }
    console.log(rowStr);
  }

};
// ******************************************************************
var screenInit = function(){
  console.log('Starting screenInit() ...');

  var images = ['TRANSPARENT_RESERVED', '<img src="assets/blank32.jpg">', '<img src="assets/image32.jpg">'];
  var tiles = [];
  var MAX_TILES = g.screen.tileWidth * g.screen.tileHeight;
  var isBlank = false;

  // test render
  for (var y=0; y<g.screen.tileHeight; y++){
    for (var x=0; x<g.screen.tileWidth; x++){
      var imageIndex = g.worldArr[x][y];
      var template = _.template(images[imageIndex]);
      tiles.push(template(''));
    }
  }


  // for (var i=0; i<MAX_TILES; i++){
  //   if (isBlank) {
  //     var template = _.template(images[0]);
  //   } else {
  //     var template = _.template(images[1]);      
  //   }
  //   isBlank = !isBlank;
  //   tiles.push(template(''));
  // }

  for (i=0; i<MAX_TILES; i++){
    $('#tilegroup').append(tiles[i]);
  }

};

// ******************************************************************
var renderScreen = function(){

};

// ******************************************************************




