import { deepGet } from './deepGet';

describe('#deepGet', () => {
  it('returns initial object for no key', () => {
    const initialObject = {};
    const returnedValue = deepGet(initialObject, undefined);

    expect(returnedValue).toEqual(initialObject);
  });

  it('gets value to single deep key', () => {
    const initialObject = {
      a: 'test'
    };
    const returnedValue = deepGet(initialObject, 'a');

    expect(returnedValue).toBe('test');
  });

  it('sets value to multi deep key', () => {
    const initialObject = {
      a: {
        b: 'test'
      }
    };
    const returnedValue = deepGet(initialObject, 'a.b');

    expect(returnedValue).toBe('test');
  });

  it('returns undefined for non existing value', () => {
    const initialObject = {};
    const returnedValue = deepGet(initialObject, 'a.b');

    expect(returnedValue).toBeUndefined();
  });
});
