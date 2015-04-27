$(document).ready(function(){
  main();
});

var main = function(){
  console.log('Starting main() ....');
  var template = _.template('<img src="http://tinyurl.com/n4vgcl5">');
  console.log(template({}));

};
