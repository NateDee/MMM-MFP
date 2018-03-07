var NodeHelper = require('node_helper');
var PythonShell = require('python-shell');
var colors = require('colors');

module.exports = NodeHelper.create({
	start: function() {
		this.config = null;
	},
	
	socketNotificationReceived: function(notification, payload) { // Payload is 'request' from MMM-CTA
		var self = this;
		if (notification === "GET-MFP-DATA" ) {		
			self.config = payload;
			self.getData(payload);
			console.log("GOT notify in node_helper");
			}
	},
	
	doData: function(data) {
		if (data[0] > data[6]) {var fiber = true} else {var fiber = false};
		if (message[0] > message[6]) {var sodium = true} else {var sodium = false};
		if (message[0] > message[6]) {var carbs = true} else {var carbs = false};
		if (message[0] > message[6]) {var cals = true} else {var cals = false};
		if (message[0] > message[6]) {var fat = true} else {var fat = false};
		if (message[0] > message[6]) {var protein = true} else {var protein = false};
		// var colorsets = {fiber, sodium, carbs, cals, fat, protein};
		console.log(fiber);
		// self.sendSocketNotification("MY-MFP-DATA", data);
	},

	getData: function(payload) {
		console.log("Running MFP get data"); // for debugging
		var self = this;
		var resultSend = {};
		var options = {
			mode: 'json',
			pythonPath: '/usr/bin/python',
			scriptPath: '/home/pi/MagicMirror/modules/MMM-MyFitnessPal',
			args: [payload.user, payload.passw]
		}
		const mfpPyShell = new PythonShell('mfp_getdata.py', options);
		mfpPyShell.on('message', function(message) { 
				console.log(message);
				self.testvar = message;
				self.sendSocketNotification("MY-MFP-DATA", message);
		});
		mfpPyShell.end(function (err) {
			if (err) throw err;
			console.log('Finished getting MFP data');
		});
		// doData(self.testvar);
	},


//For python get data, send each dict value to stdout, receive as array and parse
// See:  https://www.npmjs.com/package/python-shell for python shell processing
});
