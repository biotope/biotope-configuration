/**
 * VI configurationLoader v1.0.0
 * For documentation see:
 * https://github.com/frontend-framework/configuration
 */
import {deepSet} from './deepSet';
import {deepGet} from './deepGet';
import 'whatwg-fetch';

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

	return fetch(options.json).then((response) => {
	  let mergedData = {};
		if (options.overwriteInlineConfigs) {
      mergedData = {
        ...getData(options),
        ...response.json()
      };
		} else {
      mergedData = {
        ...response.json(),
        ...getData(options)
      };
		}

		return createConfiguration(mergedData);
	})
};

const getData = (options: ConfigurationLoaderOptions) => hasData(options) ? {} : options.data;
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
