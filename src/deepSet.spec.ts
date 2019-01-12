import { deepSet } from './deepSet';

describe('#deepSet', () => {
  it('returns initial object for no key', () => {
    const initialObject = {};
    const returnedObject = deepSet(initialObject, undefined, 'test');

    expect(returnedObject).toEqual(initialObject);
  });

  it('returns initial object for no value', () => {
    const initialObject = {};
    const returnedObject = deepSet(initialObject, 'a.b.', undefined);

    expect(returnedObject).toEqual(initialObject);
  });

  it('sets value to single deep key', () => {
    const initialObject = {};
    const returnedObject = deepSet(initialObject, 'a', 'test');

    expect(returnedObject['a']).toBe('test');
  });

  it('sets value to multi deep key', () => {
    const initialObject = {};
    const returnedObject = deepSet(initialObject, 'a.b', 'test');

    expect(returnedObject['a']['b']).toBe('test');
  });

  it('does not set value to multi deep key with existing object', () => {
    const initialObject = {
      a: 'blocked'
    };
    const returnedObject = deepSet(initialObject, 'a.b', 'test');

    expect(returnedObject['a']['b']).toBeUndefined;
    expect(returnedObject['a']).toBe('blocked');
  });
});
