# MMM-MFP
MyFitnessPal MagicMirror module

This [MagicMirror Module[mm] is designed to display your personal MyFitnessPal data.  Since MyFitnessPal API is not really public at this point, this module uses a python script to grab your data and passes to the node.js module.

## Installation

In your terminal, navigate to your MagicMirror modules folder:

```bash
cd ~/MagicMirror/modules
```
Clone this repository:
```bash
git clone https://github.com/NateDee/MMM-MFP.git
```
Configure the module in your config.js file.

## Using this module

To use this module, add it to the modules array in your config.js file.

```js
modules: [
     {
      username: "yourMFPlogin",
      passwd: "yourMFPpassword,
      updateTime: 60 * 1000 * 5, // Run every 5 minutes by default
      usernickname: "Nate",
	   },
  ]
```
## Configuration Options

Option|Description
------|-----------
`username`|Your MyFitnessPal login username.<br/>**Expected Value type:** `string`
`passwd`|Your MyFitnessPal password to your account.<br/>**Expected Value type:** `string`
`updateTime`|How often the python script should look for updates, every 5 minutes is the default and likely more than enough.<br/>**Expected Value type:** `int`
`usernickname`|This will display your choosen name at the header of the MFP module.<br/>**Expected Value type:** `string`

## Create an issue for any recommendations or requests please!

[mm]: https://github.com/MichMich/MagicMirror
