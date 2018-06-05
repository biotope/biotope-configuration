# configurationLoader

[![Join the chat at https://gitter.im/biotope/biotope-configuration](https://badges.gitter.im/biotope/biotope-configuration.svg)](https://gitter.im/biotope/biotope-configuration?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

configurationLoader.min.js loads configurations from a json file and then merges them with existing configurations using a flag (overwriteInlineConfigs) to decide which parameters should be overwritten. By default this flag is false, that is inline configurations take precedence over those set in json file. The loader returns a promise object which once resolved will give access to a configuration object. This object has also getter and setter methods which should be used to get and set configuration parameters.

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


