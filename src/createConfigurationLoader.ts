export interface ConfigurationLoaderOptions {
  configUrl?: string;
  initialState?: object;
  overwriteInitialState?: boolean;
}

export interface Configuration<State> {
  get: () => State;
  load: (url: string, override?: boolean) => Promise<void>;
}

const getRemoteConfig = async (url: string): Promise<any> => {
  const response = await fetch(url, {
    cache: 'no-cache',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'content-type': 'application/json'
    }
  });

  return response.json();
}

const createConfigurationLoader = async ({ configUrl, initialState = {}, overwriteInitialState = true }: ConfigurationLoaderOptions = {}): Promise<Configuration<any>> => {
  let state = {
    ...initialState,
  }
  if (configUrl) {
    const remoteConfig = await getRemoteConfig(configUrl);
    state = overwriteInitialState ? {
      ...state,
      ...remoteConfig
    } : {
        ...remoteConfig,
        ...state
      };
  } else {
    console.warn('No configuration url specified. Creating empty config loader.');
  }

  return createConfiguration(state);
}

const createConfiguration = (state: object): Configuration<any> => ({
  get: (): any => ({ ...state }),
  load: async (url: string, override: boolean = true): Promise<void> => {
    const remoteConfig = await getRemoteConfig(url);

    state = override ? {
      ...state,
      ...remoteConfig
    } : {
        ...remoteConfig,
        ...state
      };
    return Promise.resolve()
  }
});

export default createConfigurationLoader;
