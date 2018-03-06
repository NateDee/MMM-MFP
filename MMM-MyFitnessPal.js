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
		this.scheduleUpdate();
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
		if (this.mfpData) {
			var userRow = document.createElement("tr");
			var userRowElement = document.createElement("td");
			userRowElement.align = "middle";
			userRowElement.colSpan = "2";
			userRowElement.className = "medium";
			userRowElement.innerHTML = this.config.usernickname;
			userRow.appendChild(userRowElement);
			table.appendChild(userRow);
			
			// Loop through python script data
			for (i = 0, len = this.mfpData; i < len; i++) {
			  var dataRow = document.createElement("tr");
			  dataRow.className = "small";
			  dataRow.align = "left";
			  var rowLabel = document.createElement("td");
			  rowLabel.innerHTML = statID[i];
			  dataRow.appendChild(rowLabel);
			  var rowData = document.createElement("td");
			  rowData.align = "middle";
			  rowData.innerHTML = this.mfpData[i];
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
			console.log("Socket notification received - MFPdata");
			this.mfpData = payload;
			this.updateDom();
			if (this.loaded === FALSE) {
				this.loaded === TRUE;
				};
			this.scheduleUpdate(this.config.updateTime);
		}
	},
	
// Create get data function

// Create scheduleUpdate function
//For python get data, send each dict value to stdout, receive as array and parse
// See:  https://www.npmjs.com/package/python-shell for python shell processing
}
);
