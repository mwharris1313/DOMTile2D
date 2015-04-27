var g = {};
g.screen = {};
g.screen.width = 9;
g.screen.height = 9;

$(document).ready(function(){
  main();
});

var main = function(){
  console.log('Starting main() ....');
  console.log('worldmap', worldmap);
  var tilearray = worldmap.layers[0].data;
  console.log(tilearray);

  var images = ['<img src="assets/blank32.jpg">', '<img src="assets/image32.jpg">'];
  var tiles = [];
  var MAX_TILES = g.screen.width * g.screen.height;
  var isBlank = false;
  for (var i=0; i<MAX_TILES; i++){
    if (isBlank) {
      var template = _.template(images[0]);
    } else {
      var template = _.template(images[1]);      
    }
    isBlank = !isBlank;
    tiles.push(template(''));
  }

  for (i=0; i<MAX_TILES; i++){
    $('#tilegroup').append(tiles[i]);
  }

};
