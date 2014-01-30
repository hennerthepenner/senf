"use strict";

/* Tests for the Broker */

var Broker = require("../").Broker;
var Dispatcher = require("../").Dispatcher;


describe("Broker", function testBroker() {
  it("parses JSON strings", function parse(done) {
    var dispatcher = new Dispatcher();
    var broker = new Broker(dispatcher);
    broker.handleRawMessage("{\"cmd\": \"playBall\"}");
    dispatcher.on("playBall", function playBall() {
      done();
    });
  });

  it("handles unparsable strings", function parseError(done) {
    var broker = new Broker();
    // Tap into error handling
    broker.logError = function() {
      done();
    };
    broker.handleRawMessage("{unescapedString: 23}");
  });
});
