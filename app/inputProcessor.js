const parser = require('./parser/parser');
const stateTreeProducer = require('./stateTreeProducer/stateTreeProducer');

module.exports = function (orders, state, strategy ){
  const parsedOrders = parser.parse( orders )
  // state = state || require("./getConfig")["getConfig"]().initialGazelleState;
  strategy = strategy || require("./strategy/strategy");

  const producer = stateTreeProducer( state, strategy );

  return producer.produce( parsedOrders );
}
