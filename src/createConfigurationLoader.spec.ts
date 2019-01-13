import createConfigurationLoader, { ConfigurationLoaderOptions } from './createConfigurationLoader';

describe('#createConfigurationLoader', () => {
  let remoteData = {};
  beforeEach(() => {
    remoteData = {};
    global['fetch'] = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(remoteData)
    }));
  })

  it('warns when no config url provided', () => {
    global.console = {
      ...global.console,
      warn: jest.fn()
    };

    const options: ConfigurationLoaderOptions = {
      configUrl: ''
    }
    createConfigurationLoader(options);
    expect(console.warn).toHaveBeenCalled();
  })

  it('fetches options from config url if provided', async () => {
    const options: ConfigurationLoaderOptions = {
      configUrl: 'some/mock/url.json'
    }
    await createConfigurationLoader(options);
    expect(global['fetch']).toHaveBeenCalled();
    expect(global['fetch'].mock.calls[0][0]).toBe('some/mock/url.json');
  })

  it('puts initialState from options into state', async () => {
    const options: ConfigurationLoaderOptions = {
      initialState: { some: 'state' }
    }
    const configuration = await createConfigurationLoader(options);
    expect(configuration.get()).toEqual({ some: 'state' });
  })

  it('puts remoteState into state', async () => {
    remoteData = { some: 'state' };
    const options: ConfigurationLoaderOptions = {
      configUrl: 'any/url.json'
    }
    const configuration = await createConfigurationLoader(options);
    expect(configuration.get()).toEqual({ some: 'state' });
  })

  it('overrides initial state with remote state if not set differently in options', async () => {
    remoteData = { some: 'another state' };
    const options: ConfigurationLoaderOptions = {
      configUrl: 'any/url.json',
      initialState: { some: 'state' }
    }
    const configuration = await createConfigurationLoader(options);
    expect(configuration.get()).toEqual({ some: 'another state' });
  })

  it('does not override initial state with remote state if set differently in options', async () => {
    remoteData = { some: 'another state' };
    const options: ConfigurationLoaderOptions = {
      configUrl: 'any/url.json',
      initialState: { some: 'state' },
      overwriteInitialState: false
    }
    const configuration = await createConfigurationLoader(options);
    expect(configuration.get()).toEqual({ some: 'state' });
  })

  describe('return value', () => {
    describe('get', () => {
      it('exists', async () => {
        const configuration = await createConfigurationLoader();

        expect(configuration.get).toBeDefined();
      })

      it('returns copy of the state if called without arguments', async () => {
        var initialState = { some: 'state' };
        const configuration = await createConfigurationLoader({
          initialState
        });

        const state = configuration.get();

        expect(state).toEqual(initialState);

        initialState.some = 'another state';

        expect(state.some).toEqual('state');
      })
    })

    describe('load', () => {
      it('exists', async () => {
        const configuration = await createConfigurationLoader();

        expect(configuration.load).toBeDefined();
      })

      it('calls fetch with the provided url', async () => {
        const configuration = await createConfigurationLoader();

        configuration.load('url/to/config.json');

        expect(global['fetch']).toHaveBeenCalled();
        expect(global['fetch'].mock.calls[0][0]).toEqual('url/to/config.json');
      })

      it('overrides current state if not defined otherwise', async () => {
        const configuration = await createConfigurationLoader({
          initialState: { some: 'state' }
        });
        remoteData = {
          some: 'other state'
        }
        await configuration.load('url/to/config.json');
        const state = configuration.get();

        expect(state.some).toBe('other state');
      })

      it('does not overrids current state if defined otherwise', async () => {
        const configuration = await createConfigurationLoader({
          initialState: { some: 'state' }
        });
        remoteData = {
          some: 'other state'
        }
        await configuration.load('url/to/config.json', false);
        const state = configuration.get();

        expect(state.some).toBe('state');
      })
    })
  });

});
