'use strict';

var path = require('path')
var semver = require('semver')
var exec = require('child_process').exec;
var execNpmVersion;

function nodeEngineStrict() {

    getPackageJson()
        .then(getEngines)
        .then(checkNodeVersion)
        .then(checkNpmVersion)
        .then(success, fail);

    return;

    function success() {
        return true;
    }

    function fail(err) {
        console.log('Error: ', err);
        return process.exit(1);
    }

    function checkNodeVersion(data) {
        return new Promise(function (resolve, reject) {

            if (semver.satisfies(process.version.substring(1), data.node)) {
                resolve(data);
            } else {
                reject('Incorrect node version\n' +
                    '`package.json` specifies `' + data.node + '`, ' +
                    'you’re currently running `' + process.version + '`.');
            }
        });
    }

    function checkNpmVersion(data) {
        return new Promise(function (resolve, reject) {

            exec('npm -v',
                function (error, stdout, stderr) {

                    if (error) return reject('Unable to find npm version')

                    execNpmVersion = stdout;

                    if (semver.satisfies(execNpmVersion, data.npm)) {
                        resolve();
                    } else {
                        reject('Incorrect npm version\n' +
                            '`package.json` specifies `' + data.npm + '`, ' +
                            'you’re currently running `' + execNpmVersion + '`.');
                    }
                });

        });
    }

    function getEngines(data) {
        return new Promise(function (resolve, reject) {

            var versions;

            if (data.engines) {
                versions = data.engines;
            }

            if (versions) {
                resolve(versions);
            } else {
                reject('Missing or improper `engines` parameter in `package.json`');
            }
        });
    }

    function getPackageJson() {
        return new Promise(function (resolve, reject) {
            try {
                resolve(require(path.resolve(process.cwd(), 'package.json')));
            } catch (e) {
                reject('`package.json` not found!');
            }
        });
    }
}

module.exports = { check: nodeEngineStrict }
