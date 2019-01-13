# API

## createConfigurationLoader
Call it like so:
```js
const configurationLoader = window.biotope.createConfigurationLoader([initialState])
```
This will create a configurationLoader instance which has the following interface:

## configurationLoader
### getState()
This will return the current state of the loader:
```js
const configurationLoader = window.biotope.createConfigurationLoader({foo: 'bar'})
configurationLoader.getState();
// {
//   foo: 'bar'
// }
```

### load(url, override)
This will attempt to load a config json object from an url and merge it to the state

| Parameter | Type    | Optional | Default | Description                                                              |
|-----------|---------|----------|---------|--------------------------------------------------------------------------|
| url       | string  | no       | -       | The url to fetch the config json from                                    |
| override  | boolean | yes      | true    | Whether the loaded config shoult override same keys in the current state |

Setting override to false will result in keeping the old value with same keys:
```json
// remote.json
{
  "foo": "baz",
  "fam": "foi"
}
```
```js
const configurationLoader = window.biotope.createConfigurationLoader({foo: 'bar'})
configurationLoader.getState();
// {
//   foo: 'bar'
// }
await configurationLoader.load('remote.json', false);
configurationLoader.getState();
// {
//   foo: 'bar',
//   fam: 'foi'
// }
```
By not setting override, it will default to true and override same keys:
```json
// remote.json
{
  "foo": "baz",
  "fam": "foi"
}
```
```js
const configurationLoader = window.biotope.createConfigurationLoader({foo: 'bar'})
configurationLoader.getState();
// {
//   foo: 'bar'
// }
await configurationLoader.load('remote.json');
configurationLoader.getState();
// {
//   foo: 'baz',
//   fam: 'foi'
// }
```
