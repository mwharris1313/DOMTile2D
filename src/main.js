var g = {};
g.tile = {};
g.tile.width = 32;
g.tile.height = 32;
g.screen = {};
g.screen.width = 256;
g.screen.height = 256;
g.screen.tileWidth = 9;
g.screen.tileHeight = 9;
g.screenArr = [];
g.worldmap = {};
g.worldmap.tileWidth = worldmap.width;
g.worldmap.tileHeight = worldmap.height;
g.worldmap.width = g.worldmap.tileWidth * g.tile.width;
g.worldmap.height = g.worldmap.tileHeight * g.tile.height;
g.worldArr = [];
g.toggle = false;

g.images = ['', 'assets/blank32.jpg' , 'assets/image32.jpg'];

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

  // initialize 2d world array
  for (var i=0; i<g.worldmap.tileHeight; i++){
    g.worldArr.push(Array(g.worldmap.tileWidth + 1).join('0').split(''));
  }

  // load worldmap data into worldArr 2d array
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

  // initialize 2d screen array
  for (var i=0; i<g.screen.tileHeight; i++){
    g.screenArr.push(Array(g.screen.tileWidth + 1).join('0').split(''));
  }
  console.dir(g.screenArr);

  // load empty objects into screenArr
  var tileNumber = 0;
  for (var y=0; y<g.screen.tileHeight; y++){
    for (var x=0; x<g.screen.tileWidth; x++){
      var imageIndex = g.worldArr[x][y];
      var template = _.template(images[imageIndex]);
      g.screenArr[x][y] = {template:template('')};
    }
  }


  // push template to tiles array (to be appended to screen element)
  for (var y=0; y<g.screen.tileHeight; y++){
    for (var x=0; x<g.screen.tileWidth; x++){
      console.log(g.screenArr[x][y].template);
      tiles.push(g.screenArr[x][y].template);
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
  console.dir($('#tilegroup')[0].children[0].src);

  // test, way to change images of img
  setTimeout(function(){
    $('#tilegroup')[0].children[0].src = g.images[1];
  }, 3000);
  setTimeout(function(){
    $('#tilegroup')[0].children[0].src = g.images[2];
  }, 5000);


};

// ******************************************************************
var renderScreen = function(xTile, yTile){

};

// ******************************************************************


