'use strict'

var test = require('tape')
var Observ = require('observ')
var pollWhen = require('./')

test(function (t) {
  t.plan(3)

  var observable = Observ(true)

  var i = 0
  var poll = pollWhen(observable, function (callback) {
    if (i > 3) observable.set(false)
    callback(null, i++)
  })

  // Thunk prevents duplicates
  observable.set(true)
  observable.set(true)

  poll.onData(function (i) {
    t.pass('onData with i = ' + i)
  })
})
