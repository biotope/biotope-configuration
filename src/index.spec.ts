global['window'] = {};
import './index';

describe('iife build', () => {
  it('registers createConfigurationLoader on the biotope namespace', () => {
    expect((<any>window).biotope.createConfigurationLoader).toBeDefined();
  })
})
