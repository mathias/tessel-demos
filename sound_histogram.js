var tessel = require('tessel');
var ambientlib = require('ambient-attx4');
var _ = require('underscore');

var ambient = ambientlib.use(tessel.port['D']);

var xmax = 0.0;
var xmin = 0.03;

var normalize = function(num) {
  if (xmax < num) {
    xmax = num;
  }

  if (xmin > num) {
    xmin = num;
  }

  return ((num - xmin) / (xmax - xmin));
};

ambient.on('ready', function() {
  setInterval(function() {
    ambient.getSoundLevel(function(err, sdata) {
      var starsCount = parseInt(normalize(sdata) * 40);
      console.log('*' + Array(starsCount).join('*'));
      //console.log('xmin:', xmin, 'xmax:', xmax, 'stars:', starsCount);
    });
  }, 100);
});

ambient.on('error', function(err) {
  console.log("Error initializing ambient module:", err);
});
