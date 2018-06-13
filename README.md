# biotopeConfiguration

[![Join the chat at https://gitter.im/biotope/biotope-configuration](https://badges.gitter.im/biotope/biotope-configuration.svg)](https://gitter.im/biotope/biotope-configuration?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

biotopeConfiguration is a script that helps you store and retrieve configuration data for your Web project. The script should be initialized as early as possible, preferably in head of your app or Web page and before any other script runs. This allows you to use set() and get() methods immediately. If your configuration data is stored in a json file, you can use setRemote() method to load data from that file as well. See usage section or demo page for an example of how to use this script.

**API**

- **get(key)** Use this method to retrieve value of a property.
- **set(key, value)** Use this method to set the value of a particular property.
- **setRemote({url: 'path-of-json', overwrite: true})** This method sets properties by loading them from a json file. The path is the only required options, overwrite is optional (default is true). If overwrite is set to false, properties loaded from json will not overwrite existing configuration properties.

**Usage in browser**
```javascript
<script src="biotopeConfiguration.js"></script>
<script>
	myApp = {};
	myApp.config = biotopeConfiguration();
	myApp.config.set('data.language', 'en');
	myApp.config.get('data.language'); //en
	myApp.config.setRemote({
		url: 'demo.json',
		overwrite: false
	}).then(function() {
		//myApp.config is now updated with data from json file.
		myApp.configurationIsReady = true;
		if (window.domIsReady) {
			myApp.init();
		}		
	});

	// DOM is ready
	$(function () {
		window.domIsReady = true;
		if (myApp.configurationIsReady) {
			myApp.init();
		}
	});
</script>
```
