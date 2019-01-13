[![Build Status](https://travis-ci.org/biotope/biotope-configuration.svg?branch=master)](https://travis-ci.org/biotope/biotope-configuration)
[![codecov](https://codecov.io/gh/biotope/biotope-configuration/branch/master/graph/badge.svg)](https://codecov.io/gh/biotope/biotope-configuration)

# Configuration Loader
Keep you runtime configurations in one spot. Load config json files form remote and merge them into the config loaders state.

**Usage**
```javascript
const configuration = await biotope.createConfigurationLoader({foo: 'bar'})

console.log(configuration.getState());
// { foo: 'bar' }
```


