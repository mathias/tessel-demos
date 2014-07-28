var tessel = require('tessel');

var climateLib = require('climate-si7020');

var climate = climateLib.use(tessel.port['A']);

climate.on('ready', function() {
  console.log('Connected to si7020');

  var loop = function() {
    climate.readTemperature('f', function (err, temp) {
      console.log('Degrees:', temp.toFixed(2) + 'F');
    });
    climate.readHumidity(function (err, humid) {
      console.log('Humidity:', humid.toFixed(4) + '%RH');
    });
    setTimeout(loop, 600);
  };

  setImmediate(loop);
});

climate.on('error', function(err) {
  console.log('Error connecting module:', err);
});
