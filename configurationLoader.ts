/**
 * Biotope configurationLoader
 * For documentation see:
 * https://github.com/biotope/biotope-configuration
 */
import {deepSet} from './deepSet';
import {deepGet} from './deepGet';
import 'whatwg-fetch';
import merge from 'deepmerge';

interface ConfigurationLoaderOptions {
	data: object;
	json: string;
	overwriteInlineConfigs: boolean;
}

interface Configuration {
	get: Function;
	set: Function;
}

export const configurationLoader = (options: ConfigurationLoaderOptions): Promise<Configuration> => {

	if (hasNoJson(options)) {
		console.warn('Configuration file is not specified! Abortion configuration setup!');
		return;
	}

	return fetch(options.json,
	{
		cache: 'no-cache',
		mode: 'cors',
		credentials: 'same-origin',
		headers: {
			'content-type': 'application/json'
		  }
	}
	).then((response) => {
		return response.json().then((jsonData) => {
			let mergedData: object = (options.overwriteInlineConfigs) ? merge(getData(options), jsonData) : merge(jsonData, getData(options));

			return createConfiguration(mergedData);
		});
	});
};

const getData = (options: ConfigurationLoaderOptions) => hasData(options) ? options.data : {};
const hasData = (options: ConfigurationLoaderOptions) => !(typeof options.data === 'undefined');

const hasNoJson = (options: ConfigurationLoaderOptions) => !options.json;

const createConfiguration = (baseData: object = {}): Configuration => ({
	get: (key): any => deepGet(baseData, key),
	set: (key: string, value: any): boolean => {
		baseData = deepSet(baseData, key, value);
		return deepGet(baseData, key) === value;
	}
});



window['configurationLoader'] = configurationLoader;
