$(document).ready(function(){
  main();
});

var main = function(){
  console.log('Starting main() ....');
  var template = _.template('<img src="assets/image32.jpg">');
  console.log(template({}));

  $('body').append(template(''));
};
