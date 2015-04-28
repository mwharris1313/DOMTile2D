var g = {};
g.tile = {};
g.tile.width = 32;
g.tile.height = 32;
g.screen = {};
// g.screen.width = 512;
// g.screen.height = 288;
g.screen.width = 1024;
g.screen.height = 512;
// g.screen.tileWidth = 17;
// g.screen.tileHeight = 10;
g.screen.tileWidth = 33;
g.screen.tileHeight = 17;
g.screenArr = [];
g.worldmap = {};
g.worldmap.tileWidth = worldmap.width;
g.worldmap.tileHeight = worldmap.height;
g.worldmap.width = g.worldmap.tileWidth * g.tile.width;
g.worldmap.height = g.worldmap.tileHeight * g.tile.height;
g.worldArr = [];
g.toggle = true;
g.adder = 2;
g.xAdder = 6;
g.yAdder = 2;

g.cam = {};
g.cam.x = 0;
g.cam.y = 0;
g.cam.xTile = 0;
g.cam.yTile = 0;
g.cam.getXYTile = function(){
  var xTile = Math.floor(g.cam.x / g.tile.width);
  var yTile = Math.floor(g.cam.y / g.tile.height);
  return [xTile, yTile];
};

g.tilegroup = {};

g.images = ['', 'assets/dwCave32.png' , 'assets/dwGrass32.png', 'assets/dwHill32.png', 'assets/dwMountain32.png', 'assets/dwWall32.png', 'assets/dwGrass32.png', 'assets/dwGrass32.png', 'assets/dwGrass32.png'];

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

  var tilearray = worldmap.layers[0].data;

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
  }

};
// ******************************************************************
var screenInit = function(){
  console.log('Starting screenInit() ...');

  //var images = ['TRANSPARENT_RESERVED', '<img src="assets/blank32.jpg">', '<img src="assets/image32.jpg">'];
  var images = ['TRANSPARENT_RESERVED', '<img src="assets/dwCave32.png">', '<img src="assets/dwGrass32.png">', '<img src="assets/dwHill32.png">', '<img src="assets/dwMountain32.png">', '<img src="assets/dwWall32.png">', '<img src="assets/dwGrass32.png">', '<img src="assets/dwGrass32.png">', '<img src="assets/dwGrass32.png">'];
  var tiles = [];
  var MAX_TILES = g.screen.tileWidth * g.screen.tileHeight;
  var isBlank = false;

  // initialize 2d screen array
  for (var i=0; i<g.screen.tileHeight; i++){
    g.screenArr.push(Array(g.screen.tileWidth + 1).join('0').split(''));
  }

  // load empty objects into screenArr
  var tileNumber = 0;
  for (var y=0; y<g.screen.tileHeight; y++){
    for (var x=0; x<g.screen.tileWidth; x++){

      var imageIndex = g.worldArr[x][y];
      console.log('test', x, y);




      var template = _.template(images[imageIndex]);
      g.screenArr[y][x] = {template:template('')};
    }
  }


  // push template to tiles array (to be appended to screen element)
  for (var y=0; y<g.screen.tileHeight; y++){
    for (var x=0; x<g.screen.tileWidth; x++){
      tiles.push(g.screenArr[y][x].template);
    }
  }

  // append each tile to the tilegroup
  for (i=0; i<MAX_TILES; i++){
    $('#tilegroup').append(tiles[i]);
  }

  // keep a reference of each child on its corresponding g.screenArr object
  var elementIndex = 0;
  for (var y=0; y<g.screen.tileHeight; y++){
    for (var x=0; x<g.screen.tileWidth; x++){
      g.screenArr[y][x].element = $('#tilegroup')[0].children[elementIndex];
      g.screenArr[y][x].src = $('#tilegroup')[0].children[elementIndex].src;
      elementIndex++;
    }
  }


  // place relative paths in each img src tag "assets/image32.jpg"
  var tileNumber = 0;
  for (var y=0; y<g.screen.tileHeight; y++){
    for (var x=0; x<g.screen.tileWidth; x++){
      var imageIndex = g.worldArr[x][y];
      g.screenArr[y][x].src = g.images[imageIndex];
      g.screenArr[y][x].imageIndex = imageIndex;
    }
  }

  // for (var y=0; y<g.screen.tileHeight; y++){
  //   for (var x=0; x<g.screen.tileWidth; x++){
  //     var imageIndex = g.worldArr[x][y];
  //     g.screenArr[x][y].src = g.images[imageIndex];
  //   }
  // }

  //console.dir($('#tilegroup')[0]);
  g.tilegroup.element = $('#tilegroup')[0];
  g.tilegroup.element.addEventListener('click', onClick, false);

  var xGroupOffset = g.cam.x % g.tile.width;
  var yGroupOffset = g.cam.y % g.tile.height;
  console.log(xGroupOffset, yGroupOffset);

  g.tilegroup.element.style.left = -xGroupOffset;
  g.tilegroup.element.style.top = -yGroupOffset;

  // g.tilegroup.element.offsetLeft = 4;//-32 + xGroupOffset;
  // g.tilegroup.element.offsetTop = -15;//-32 + yGroupOffset;


  // console.log(g.tilegroup.element.offsetLeft, g.tilegroup.element.offsetTop);
  //console.log(g.tilegroup.element.offsetLeft, g.tilegroup.element.offsetTop);
    // console.dir(g.tilegroup.element);
  window.requestAnimationFrame(renderScreen);
};

// ******************************************************************
var renderScreen = function(){
  requestAnimationFrame(renderScreen);
  //console.log('Starting renderScreen() ...');

  // // demo scroll
  // if (g.cam.x < (g.worldmap.width-g.screen.width) && g.cam.y < (g.worldmap.height-g.screen.height)) {
  //   g.cam.x+=1*g.xAdder;
  //   g.cam.y+=1*g.yAdder;

  //   if (g.toggle) {
  //     var test1 = g.cam.x >= (g.worldmap.width-g.screen.width);
  //     var test2 = g.cam.y >= (g.worldmap.height-g.screen.height);
  //     if (test1)  g.cam.x = g.worldmap.width-g.screen.width-1;
  //     if (test2) g.cam.y = g.worldmap.height-g.screen.height-1;

  //     if (test1) {
  //       g.xAdder = -g.xAdder;
  //       g.toggle = !g.toggle;
  //     }      

  //     if (test2) {
  //       g.yAdder = -g.yAdder;
  //       g.toggle = !g.toggle;
  //     }      

  //   } else {
  //     if (g.cam.x <= 0)  g.cam.x = 0;
  //     if (g.cam.y <= 0) g.cam.y = 0;

  //     if (g.cam.x <= 0) {
  //       g.xAdder = -g.xAdder;
  //       g.toggle = !g.toggle;
  //     }

  //     if (g.cam.y <= 0) {
  //       g.yAdder = -g.yAdder;
  //       g.toggle = !g.toggle;
  //     }

  //   }

  // }



  var xGroupOffset = g.cam.x % g.tile.width;
  var yGroupOffset = g.cam.y % g.tile.height;  g.tilegroup.element.style.left = -xGroupOffset;
  g.tilegroup.element.style.top = -yGroupOffset;


  var xyTile = g.cam.getXYTile();
  var xTile = xyTile[0];
  var yTile = xyTile[1];

  for (var y=0; y<g.screen.tileHeight; y++){
    for (var x=0; x<g.screen.tileWidth; x++){

      var screenTile = g.screenArr[y][x];
      var worldTile = g.worldArr[xTile + x][yTile + y];

      // is the screen tile not up to date with the world map?
      if (screenTile.imageIndex !== worldTile) {
        screenTile.imageIndex = worldTile;
        screenTile.element.src = g.images[screenTile.imageIndex];
      }

    }
  }

};

var onClick = function(evt){
  console.log('Starting onClick() ...');
  console.dir(evt);
  console.log(evt.x, evt.y);

  var xDelta = evt.x - Math.floor(g.screen.width/2);
  var yDelta = evt.y - Math.floor(g.screen.height/2);
  g.cam.x += xDelta;
  g.cam.y += yDelta;
};
//setInterval(renderScreen, 0); // using setInterval for testing, will replace with requestAnimationFrame
// ******************************************************************


