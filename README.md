# configurationLoader

[![Join the chat at https://gitter.im/biotope/biotope-configuration](https://badges.gitter.im/biotope/biotope-configuration.svg)](https://gitter.im/biotope/biotope-configuration?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

configurationLoader is an object that helps with storing and retrieving configuration data for your Web project. The loader should be initialized as early as possible, preferably in head of your app/page and before any other script runs.

**API**

- **get(name)** Use this method to retrieve value of a property.
- **set(name, value)** Use this method to set the value of a particular property.
- **setRemote(options)** This method sets properties by loading them from a json file. The overwrite option by default is true, but it can be set to false so that properties loaded from json will not overwrite existing properties in the loader. SetRemote loads json async and invokes the callback function as soon as it's done.

**Usage**
```javascript
var myApp = {};
myApp.config = configurationLoader();
myApp.config.set('data.language', 'en');
myApp.config.get('data.language'); //en
myApp.config.setRemote({
	path: 'url.to.configuration.json',
	callback: function() {
		//myApp.config is now updated with data from json file.
		myApp.configurationIsReady = true;
		if (window.domIsReady) {
			myApp.init();
		}
	},
	overwrite: false
});

// DOM is ready
$(function () {
	window.domIsReady = true;
	if (myApp.configurationIsReady) {
		myApp.init();
	}
});
```
