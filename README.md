# node-engine-strict
This package was used to treat npm modules as if the user had set engine-strict but it works on npm version > 3

```javascript
'use strict';

const engineStrict = require('node-engine-strict')
const config = require('./config/environment')

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var env = process.env.NODE_ENV;

if (env === 'development' || env === 'test') {

  if (config.rootDir !== process.cwd()) {
    process.chdir(config.rootDir)
  }

  engineStrict.check()

}

// Export the application
exports = module.exports = require('./app');

```