# configurationLoader

configurationLoader.js loads configurations from a json file and then merges them with existing configurations using a flag (overwriteInlineConfigs) to decide which parameters should be overwritten. By default this flag is false, that is inline configurations take precedence over those set in json file. The loader returns a promise object which once resolved will give access to a configuration object. This object has also getter and setter methods which should be used to get and set configuration parameters.

**Usage**
```javascript
configurationLoader({
	json: 'url.to.configuration.json',
	data: inline.configuration,
	overwriteInlineConfigs: [optional boolean parameter]
}).then(function(configuration) {
	window.myProject.configuration = configuration;
	// It's now safe to run scripts depending on configuration parameters
});

var test = myProject.configuration.get('nameOfProperty');
```

**Build**
To update the configurationLoader.min.js run `npm build` before committing.


