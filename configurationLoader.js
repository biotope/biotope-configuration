/**
 * VI configurationLoader v1.0.0
 * For documentation see:
 * https://github.com/frontend-framework/configuration
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
