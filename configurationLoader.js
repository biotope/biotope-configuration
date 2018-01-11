/*

DEV NOTES:

configurationLoader loads configurations from a json file and then merges them with existing confiugrations using a flag (overwriteInlineConfigs) to decide which parameters should be overwritten. By default this flag is false, that is inline configurations take precedence over those set in json file. The loader returns a promise object which once resolved will give access to configuration object. This object has also getter and setter methods which should be used to get and set configuration parameters.

Usage example:

configurationLoader({
	json: 'url.to.configuration.json',
	data: inline.configuration,
	overwriteInlineConfigs: [boolean]
}).then(function(data) {
	window.myProject.configuration = data;
	//it's now safe to run scripts that depend on configuration parameters
});

var test = myProject.configuration.get('nameOfProperty');

*/

configurationLoader = function(options) {
	'use strict';

	var configuration = typeof options.data === 'undefined' ? {} : options.data;

	if (!options.json) {
		console.warn('Configuration file is not specified!');
		return;
	}

	var promise = $.getJSON(options.json).then(function(data) {
		if (options.overwriteInlineConfigs) {
			$.extend(true, options.data, data);
			configuration = options.data;
		} else {
			$.extend(true, data, options.data);
			configuration = data;
		}

		configuration.set = function(key, value) {
			var tempKeys = key.split('.');
			if(tempKeys.length === 2) {
				if(typeof configuration[tempKeys[0]] === 'undefined') {
					configuration.data[tempKeys[0]] = {};
				}
				configuration.data[tempKeys[0]][tempKeys[1]] = value;
				return true;
			}
			configuration.data[tempKeys[0]] = value;
			return true;
		};

		configuration.get = function(key) {
			var tempKeys = key.split('.');
			if(tempKeys.length === 2) {
				if(typeof configuration.data[tempKeys[0]] === 'undefined' || typeof configuration.data[tempKeys[0]][tempKeys[1]] === 'undefined') {
					return null;
				}
				return configuration.data[tempKeys[0]][tempKeys[1]];
			}
			if(typeof configuration.data[tempKeys[0]] === 'undefined') {
				return null;
			}
			return configuration.data[tempKeys[0]];
		};

		return configuration;
	});

	return promise;
};
