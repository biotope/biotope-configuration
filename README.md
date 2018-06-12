# configurationLoader

[![Join the chat at https://gitter.im/biotope/biotope-configuration](https://badges.gitter.im/biotope/biotope-configuration.svg)](https://gitter.im/biotope/biotope-configuration?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

configurationLoader is an object that helps with storing and retrieving configuration data for your Web project. The loader should be initialized as early as possible, preferably in head of your app/page and before any other script runs.

**API**

- **get(name)** Use this method to retrieve value of a property.
- **set(name, value)** Use this method to set the value of a particular property.
- **setRemote({path: 'url-to-json', callback: fn, overwrite: true})** This method sets properties by loading them from a json file. The path and callback are required options, overwrite is optional (default is true). If overwrite is set to false, properties loaded from json will not overwrite existing properties in the loader. SetRemote loads json async and invokes the callback function as soon as it's done.

**Usage in browser**
```javascript
<script src="configurationLoader.js"></script>
<script>
	myApp = {};
	myApp.config = configurationLoader();
	myApp.config.set('data.language', 'en');
	myApp.config.get('data.language'); //en
	myApp.config.setRemote({
		url: 'url-to-json',
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
