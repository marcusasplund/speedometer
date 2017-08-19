# Speedometer

[![GitHub issues](https://img.shields.io/github/issues/marcusasplund/speedometer.svg)](https://github.com/marcusasplund/speedometer/issues)
[![Build status](https://travis-ci.org/marcusasplund/speedometer.svg?branch=master)](https://travis-ci.org/marcusasplund/speedometer)
[![dependencies](https://david-dm.org/marcusasplund/speedometer.svg)](https://david-dm.org/marcusasplund/speedometer)

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## [demo](https://pap.as/speedo/)

Simple html5 speedometer, with altitude

Offline support with service worker

## installation

````bash
    $ git clone https://github.com/marcusasplund/speedometer.git

    $ cd speedometer

    $ yarn

    $ yarn start
````

Open up application at http://localhost:4000/ in browser

## build a release

````bash
    $ yarn run build

````
This will generate a release directory with your minified/rev'd assets.


## serve static

````bash
    $ yarn run serve

````

This will use serve to statically serve your app from the release directory.

## Credits

The rollup and fly config is based on https://github.com/tzellman/hyperapp-boilerplate
