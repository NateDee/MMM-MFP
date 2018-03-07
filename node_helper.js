var NodeHelper = require("node_helper");
var PythonShell = require('python-shell');

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
				self.sendSocketNotification('MY-MFP-DATA', message);
		});
		mfpPyShell.end(function (err) {
			if (err) throw err;
			console.log('Finished getting MFP data');
		});
	},


//For python get data, send each dict value to stdout, receive as array and parse
// See:  https://www.npmjs.com/package/python-shell for python shell processing
});
