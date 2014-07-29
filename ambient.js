var tessel = require('tessel');
var ambientlib = require('ambient-attx4');

var ambient = ambientlib.use(tessel.port['D']);

ambient.on('ready', function() {
  setInterval(function() {
    ambient.getLightLevel(function(err, ldata) {
      console.log("Light level:", ldata.toFixed(8));
    });
    ambient.getSoundLevel(function(err, sdata) {
      console.log("Sound level:", sdata.toFixed(8));
    });
  }, 500); // the readings will happen unless the trigger is hit

  ambient.setLightTrigger(0.5);
  ambient.setSoundTrigger(0.01);

  ambient.on('light-trigger', function(data) {
    console.log("Our light trigger was hit:", data);

    // Clear the trigger so it stops firing
    ambient.clearLightTrigger();

    setTimeout(function() {
      ambient.setLightTrigger(0.5);
    }, 1500);
  });

  ambient.on('sound-trigger', function(data) {
    console.log("Something happened with sound:", data);

    // Clear the trigger so it stops firing
    ambient.clearSoundTrigger();

    setTimeout(function() {
      ambient.setSoundTrigger(0.01);
    }, 1500);
  });
});

ambient.on('error', function(err) {
  console.log("Error initializing ambient module:", err);
});
