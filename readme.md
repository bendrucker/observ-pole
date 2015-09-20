# observ-pole [![Build Status](https://travis-ci.org/bendrucker/observ-pole.svg?branch=master)](https://travis-ci.org/bendrucker/observ-pole)

> Trigger polling via [pole](https://github.com/bendrucker/pole) in response to observ changes


## Install

```
$ npm install --save observ-pole
```


## Usage

```js
var observPole = require('observ-pole')

var poll = observPole(observable, function (callback) {
  fetchData(callback)
})

poll.onData(console.log)
//=> data
```

## API

#### `observPole(observable, [options], callback)` -> `object`

Returns a [pole](https://github.com/bendrucker/pole) interface and internally manages the lifecycle of the poller.

##### observable

*Required*  
Type: `function`

An observable value. When the observable's value is truthy polling is initiated. When it becomes falsy, polling is cancelled. 


## License

MIT © [Ben Drucker](http://bendrucker.me)
