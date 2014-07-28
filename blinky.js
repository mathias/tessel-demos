// Import the interface to Tessel hardware
var tessel = require('tessel');

// Set the led pins as outputs with initial states
// Truthy initial state sets the pin high
// Falsy sets it low.
var led1 = tessel.led[0].output(1);
var led2 = tessel.led[1].output(0);

var counter = 0;

setInterval(function () {
    console.log("I blinked " + counter + " times." );
    // Toggle the led states
    led1.toggle();
    led2.toggle();
    counter++;
}, 100);
