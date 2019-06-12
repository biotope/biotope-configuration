import createConfigurationLoader from './createConfigurationLoader';

describe('#createConfigurationLoader', () => {
  let remoteData = {};
  beforeEach(() => {
    remoteData = {};
    global['fetch'] = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(remoteData)
    }));
  })

  it('puts initialState from options into state', async () => {
    const configuration = await createConfigurationLoader({ some: 'state' });
    expect(configuration.getState()).toEqual({ some: 'state' });
  })

  describe('return value', () => {
    describe('getState', () => {
      it('exists', async () => {
        const configuration = await createConfigurationLoader();

        expect(configuration.getState).toBeDefined();
      })

      it('returns copy of the state if called without arguments', async () => {
        var initialState = { some: 'state' };
        const configuration = await createConfigurationLoader(initialState);

        const state = configuration.getState();

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
        const configuration = await createConfigurationLoader({ some: 'state' });
        remoteData = {
          some: 'other state'
        }
        await configuration.load('url/to/config.json');
        const state = configuration.getState();

        expect(state.some).toBe('other state');
      })

      it('does not override current state if defined otherwise', async () => {
        const configuration = await createConfigurationLoader({ some: 'state' });
        remoteData = {
          some: 'other state'
        }
        await configuration.load('url/to/config.json', false);
        const state = configuration.getState();

        expect(state.some).toBe('state');
      })
    })
  });

});
