Module.register("MMM-MyFitnessPal", {
	defaults: { // All we need is user and password
		username: null,
		passwd: null,
		updateTime: 60 * 1000 * 5, // Run every 5 minutes by default
		usernickname: null,
	},
	
	getStyles: function() {
		return ["font-awesome.css"];
	},

	header: function() {
		var header = document.createElement("header");
		head.innerHTML = "MyFitnessPal Stats";
		return header;
	},
	
	start: function() {
		Log.info("Starting module: " + this.name);
		// Don't need to realistically update more than once a minute
		if (this.updateTime < 60000) {
			this.updateTime = 60000
		};
		this.loaded = false;
		this.getData(this); // Run initialization data get
	},

	getData: function(self) {
		var request = {
			user: self.config.username,
			passw: self.config.passwd,
		};
		self.sendSocketNotification("GET-MFP-DATA", request);
	},
	
	getDom: function() {
		var self = this;
		wrapper = document.createElement("div");
		var table = document.createElement("table");
		var statID = ['Fiber', 'Sodium', 'Carbs', 'Cals', 'Fat', 'Protein'];
		console.log("Updating MFP DOM");
		wrapper.className = "medium";
		if (this.mfpData) {
			var userRow = document.createElement("tr");
			var userRowElement = document.createElement("td");
			userRowElement.align = "middle";
			userRowElement.colSpan = "3";
			userRowElement.className = "medium";
			userRowElement.innerHTML = this.config.usernickname + "'s" + " Daily Goals";
			userRow.appendChild(userRowElement);
			table.appendChild(userRow);
			
			// Loop through python script data
			for (i = 0, len = statID.length; i < len; i++) {
			  var dataRow = document.createElement("tr");
			  dataRow.className = "small";
			  dataRow.align = "left";
			  var rowLabel = document.createElement("td");
			  rowLabel.innerHTML = statID[i];
			  dataRow.appendChild(rowLabel);
			  var rowData = document.createElement("td");
			  rowData.align = "middle";
			  rowData.innerHTML = this.mfpData[i] + " / " + this.mfpData[i+6];
			  dataRow.appendChild(rowData);
			  table.appendChild(dataRow);
			}
		};
		wrapper.appendChild(table);
		return wrapper;
	},
	
	scheduleUpdate: function() {
		var nextLoad = this.config.updateTime;
		var self = this;
		this.updateTimer = setInterval(function() {
			self.getData(self);
		}, nextLoad);
	},
	
	socketNotificationReceived: function (notification, payload) {
		if (notification === "MY-MFP-DATA") {
			Log.log("Socket notification received - MFPdata");
			this.mfpData = payload;
			this.updateDom();
			this.scheduleUpdate(this.config.updateTime);
		}
	},
	
// Create get data function

// Create scheduleUpdate function
//For python get data, send each dict value to stdout, receive as array and parse
// See:  https://www.npmjs.com/package/python-shell for python shell processing
}
);
