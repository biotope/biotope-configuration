export interface Configuration<State> {
  getState: () => State;
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

const createConfigurationLoader = (state: object = {}): Configuration<any> => ({
  getState: (): any => ({ ...state }),
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
})

export default createConfigurationLoader;
