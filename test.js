'use strict'

var test = require('tape')
var Observ = require('observ')
var partial = require('ap').partial
var pollWhen = require('./')

test(function (t) {
  t.plan(3)

  var observable = Observ(true)

  var i = 0
  var poll = pollWhen(observable, function (callback) {
    if (i > 3) observable.set(false)
    callback(null, i++)
  })

  poll.onData(function (i) {
    t.pass('onData with i = ' + i)
  })
})

test('cancelling and resuming', function (t) {
  t.plan(4)

  var observable = Observ(true)

  var i = 0
  var poll = pollWhen(observable, function (callback) {
    callback(null, i++)
    if (i > 3) observable.set(false)
  })

  poll.onData(function (i) {
    t.pass('onData with i = ' + i)
    // schedule a resume which will be cancelled after one cycle
    if (i === 3) process.nextTick(partial(observable.set, true))
  })
})
