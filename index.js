'use strict'

var Event = require('geval/event')
var poll = require('pole')
var watch = require('observ/watch')
var nextTick = require('next-tick')
var partial = require('ap').partial

module.exports = function observPoll (observable, options, callback) {
  var poller = null
  nextTick(partial(watch, observable, onChange))

  var DataEvent = Event()
  var ErrorEvent = Event()

  return {
    onData: DataEvent.listen,
    onError: ErrorEvent.listen,
    cancel: cancel
  }

  function onChange (value) {
    return (value ? create : cancel)()
  }

  function create () {
    if (poller) return
    poller = poll(options, callback)
    poller.onData(DataEvent.broadcast)
    poller.onError(ErrorEvent.broadcast)
  }

  function cancel () {
    if (poller) poller.cancel()
  }
}
