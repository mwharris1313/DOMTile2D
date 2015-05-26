var g = {};
g.tile = Tile({width:32, height:40});
g.screen = Screen({tile: g.tile, tileWidth: 20, tileHeight: 10});

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

g.isTransitioning = false;
g.transitionTo = {};
g.transitionTo.x = -1;
g.transitionTo.y = -1;

g.cam = {};
g.cam.x = 0;
g.cam.y = 0;
g.cam.xTile = 0;
g.cam.yTile = 0;

g.key = {};
g.key.delta = 1;
g.key.xDelta = 0;
g.key.yDelta = 0;

g.isKeyDown = false;
g.isKeyUp = false;
g.isKeyLeft = false;
g.isKeyRight = false;

var setKeyFalse = function(){
  g.isKeyDown = false;
  g.isKeyUp = false;
  g.isKeyLeft = false;
  g.isKeyRight = false;
}


g.cam.getXYTile = function(){
  var xTile = Math.floor(g.cam.x / g.tile.width);
  var yTile = Math.floor(g.cam.y / g.tile.height);
  return [xTile, yTile];
};

g.lastKeyState = '';

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
  var sheets = document.styleSheets;
  console.log(sheets);

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
      // console.log('test', x, y);




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
  document.addEventListener("keydown", onKeydown, false);
  document.addEventListener("keyup", onKeyup, false);

  var xGroupOffset = g.cam.x % g.tile.width;
  var yGroupOffset = g.cam.y % g.tile.height;
  // console.log(xGroupOffset, yGroupOffset);

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

  var delta = 20;
  if (g.isKeyDown) g.cam.y += delta;
  if (g.isKeyUp) g.cam.y -= delta;
  if (g.isKeyLeft) g.cam.x -= delta;
  if (g.isKeyRight) g.cam.x += delta;

  // TODO: research Robert Penner's Easing Functions...
  if (g.isTransitioning) {
    console.log('gTransition', g.cam.x-g.transitionTo.x);
    //console.log('asdfasdfasdf');
    if (Math.abs(g.cam.x-g.transitionTo.x) <= 1) {
      g.cam.x = g.transitionTo.x;
      if (g.cam.x === g.transitionTo.x && g.cam.y === g.transitionTo.y) g.isTransitioning = false;
    } else {
      g.cam.x = Math.floor(Math.sqrt(g.transitionTo.x - g.cam.x) + g.cam.x);
    }

    if (Math.abs(g.cam.x-g.transitionTo.x) <= 1) {
      g.cam.y = g.transitionTo.y;
      if (g.cam.x === g.transitionTo.x && g.cam.y === g.transitionTo.y) g.isTransitioning = false;
    } else {
      g.cam.y = Math.floor(Math.sqrt(g.transitionTo.y - g.cam.y) + g.cam.y);
    }

    //console.log('TESTXY',g.cam.x, g.cam.y,g.transitionTo.x, g.transitionTo.y);
  }

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
  // console.dir(evt);
  // console.log(evt.x, evt.y);

  // var xDelta = evt.x - Math.floor(g.screen.width/2);
  // var yDelta = evt.y - Math.floor(g.screen.height/2);
  // g.transitionTo.x = g.cam.x + xDelta;
  // g.transitionTo.y = g.cam.y + yDelta;
  // g.isTransitioning = true;

};

var onKeydown = function(evt){
  console.log('onKeydown() ...');

  var up = 87;
  var down = 83;
  var left = 65;
  var right = 68;

  var blankAll = function(){
    g.key.xDelta = 0;
    g.key.yDelta = 0;    
  }

  if (evt.keyCode === up) {
    setKeyFalse();
    g.isKeyUp = true;
     // g.key.yDelta = g.delta;
  } else if (evt.keyCode === down) {
    setKeyFalse();
    g.isKeyDown = true;
    // g.key.yDelta = -g.delta;
  } else if (evt.keyCode === left) {
    setKeyFalse();
    g.isKeyLeft = true;
    // g.key.xDelta = g.delta;
  } else if (evt.keyCode === right) {
    setKeyFalse();
    g.isKeyRight = true;
    // g.key.xDelta = -g.delta;
  }

}

var onKeyup = function(evt){
  console.log('onKeyUp() ...');
    setKeyFalse();
  // g.key.xDelta = 0;
  // g.key.yDelta = 0;
}
//setInterval(renderScreen, 0); // using setInterval for testing, will replace with requestAnimationFrame
// ******************************************************************

