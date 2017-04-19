# todo

[![Greenkeeper badge](https://badges.greenkeeper.io/marcusasplund/speedometer.svg)](https://greenkeeper.io/)
[![GitHub issues](https://img.shields.io/github/issues/marcusasplund/speedometer.svg)](https://github.com/marcusasplund/speedometer/issues)
[![Build status](https://travis-ci.org/marcusasplund/speedometer.svg?branch=master)](https://travis-ci.org/marcusasplund/speedometer)
[![dependencies](https://david-dm.org/marcusasplund/speedometer.svg)](https://david-dm.org/marcusasplund/speedometer)

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

# Speedometer

## [demo](https://pap.as/speedo/)

Simple html5 speedometer

Offline support with service worker

## installation

````bash
    $ git clone https://github.com/marcusasplund/speedometer.git

    $ cd speedometer

    $ yarn OR $ npm install

    $ npm start
````

Open up application at http://localhost:4000/ in browser

## build a release

````bash
    $ npm run build

````
This will generate a release directory with your minified/rev'd assets.


## serve static

````bash
    $ npm run serve

````

This will use serve to statically serve your app from the release directory.

## Credits

The rollup and fly config is based on https://github.com/tzellman/hyperapp-boilerplate
