# Configuration Loader
Keep you runtim configurations in on spot. Load config json files form remote and merge them into the config loaders state.

**Usage**
```javascript
const configuration = await biotope.createConfigurationLoader({
	configUrl: 'url.to.configuration.json',
	initialState: {
    foo: 'bar'
  },
  overwriteInitialState: false
})

console.log(configuration.get());
// { foo: 'bar' }
```


