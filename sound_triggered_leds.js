var tessel = require('tessel');
var ambientlib = require('ambient-attx4');

var ambient = ambientlib.use(tessel.port['D']);

var soundThreshold = 0.03;

var led1 = tessel.led[0].output(1);
var led2 = tessel.led[1].output(0);

ambient.on('ready', function() {
  ambient.setSoundTrigger(soundThreshold);

  ambient.on('sound-trigger', function(data) {
    var parsedData = parseInt(data * 1000);

    console.log("Something happened with sound:", data);

    if (parsedData > 35) {
      led1.toggle();
    } else {
      led2.toggle();
    }

    // Clear the trigger so it stops firing
    ambient.clearSoundTrigger();

    setTimeout(function() {
      ambient.setSoundTrigger(soundThreshold);
    }, 50);
  });
});

ambient.on('error', function(err) {
  console.log("Error initializing ambient module:", err);
});
