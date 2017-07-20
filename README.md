# Introduction
This package allow to treat npm modules as if the user had set engine-strict, it works also on npm version > 3

The package use the `semver` standard to check the version

```js
// check                 
// exec node version = '1.2.3'
// engines verion specified in package.json: '1.x || >=2.5.0 || 5.0.0 - 7.2.3') 
// it return true
```

You can use all range types of `semver`.

Show more on [semver](https://www.npmjs.com/package/semver)

# Getting started
You need to specify in your `package.json` the engines you would use, for example: 

```json
...
"engines": {
  "node": "7.10.0",
  "npm": "4.2.0"
}
...
```


Then require the module in your main project file and run check:

```javascript
// index.js
'use strict';

const engineStrict = require('node-engine-strict')

engineStrict.check()

```

To find the correct `package.json` you need to check that `process.cwd()` point to your project root dir, because if you use `pm2` or another process manager that run your project from different folder you need to set `cwd` with `process.chdir('path-to-project-root')` command, as in the following example: 

```javascript
// index.js
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

Feel free to open issues, fork project, and collaborate with us!

### Contribute

Clone repository locally and install dependencies:
```sh
$ git clone https://github.com/daton89-topperblues/node-engine-strict.git
$ cd node-engine-strict
$ npm i
```

Fork project and open pull request 

### Changelog

 1.0.0 first version  

### Contributors 
[@daton89](https://github.com/daton89) Toni D'Angelo

[@topperblues](https://github.com/topperblues) Nicola Bonavita
