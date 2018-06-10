# configurationLoader

[![Join the chat at https://gitter.im/biotope/biotope-configuration](https://badges.gitter.im/biotope/biotope-configuration.svg)](https://gitter.im/biotope/biotope-configuration?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

configurationLoader is an object that helps with storing and retrieving configuration data for your Web project. The loader should be initialized as early as possible, preferably in head of your app/page and before any other script runs.

**API**

- **get(name)** Use this method to retrieve value of a property.
- **set(name, value)** Use this method to set the value of a particular property.
- **setRemote(pathToJson, callback, [overwrite: boolean])** This method sets properties by loading them from a json file. The overwrite option by default is true, but it can be set to false so that properties loaded from json will not overwrite existing properties in the loader. SetRemote loads json async and invokes the callback function as soon as it's done.

**Usage**
```javascript
configurationLoader({
	json: 'url.to.configuration.json',
	data: inline.configuration,
	overwriteInlineConfigs: [optional boolean parameter]
}).then(function(configuration) {
	window.myProject.configuration = configuration;
	window.myProject.configurationIsReady = true;
	$(window).trigger('configurationIsReady');
});

// DOM is fully loaded
$(function () {
	if (myProject.configurationIsReady) {
		myProject.init();
	} else {
		$(window).on('configurationIsReady', function() {
			myProject.init();
		});
	}
});

// It's now safe to run scripts depending on configuration parameters
myProject.init = function() {
	var test = myProject.configuration.get('nameOfProperty');
};
```
