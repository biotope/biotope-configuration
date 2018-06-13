/**
 * biotopeConfiguration
 * For documentation see:
 * https://github.com/biotope/biotope-configuration
 */
import {deepSet} from './deepSet';
import {deepGet} from './deepGet';
import 'whatwg-fetch';
import merge from 'deepmerge';

interface Configuration {
	get: Function;
	set: Function;
	setRemote: Function;
}

interface setRemoteOptions {
	url: string;
	overwrite: boolean;
}

export const biotopeConfiguration = (): Configuration => {
	let configData = {};

	return {
		get: (key): string => {
			return deepGet(configData, key);
		},
		set: (key: string, value: any): boolean => {
			configData = deepSet(configData, key, value);
			return deepGet(configData, key) === value;
		},
		setRemote: (options: setRemoteOptions): Promise<any> => {
			return fetch(options.url, {
				cache: 'no-cache',
				mode: 'cors',
				credentials: 'same-origin',
				headers: {
					'content-type': 'application/json'
				  }
			}).then((response) => {
				return response.json().then((jsonData) => {
					configData = (options.overwrite) ? merge(configData, jsonData) : merge(jsonData, configData);
				});
			});
		}
	}
};

window['biotopeConfiguration'] = biotopeConfiguration;
