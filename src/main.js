$(document).ready(function(){
  main();
});

var main = function(){
  console.log('Starting main() ....');

  var images = ['<img src="assets/blank32.jpg">', '<img src="assets/image32.jpg">'];
  var tiles = [];
  var MAX_TILES = 64;
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
    $('body').append(tiles[i]);
  }

};
