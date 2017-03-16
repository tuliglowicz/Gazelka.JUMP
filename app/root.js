const { getGazelleInstance } = require("./gazelka/gazelka")

// editor
const { initEditor, beautify } = require( "./editorConfig" )

// parsing
const parser = require("./parser/parser");
const strategy =  require("./strategy/strategy");
const stateTreeProducer = require("./stateTreeProducer/stateTreeProducer");
const { stateTreeProcessor } = require("./stateTreeProcessor")

//storer
const storer = require("./storer")

//config
var getConfig = require("./config")

// injections and event handlers
const gazelkaInjections = require( "./gazelkaInjections" )
const { prepareOnKeyDown } = require("./eventHandlers");
// ==============================================================


const init = function( global, ctx ) {
  const { config, permanentConfig } = getConfig( storer )
  const { editor, ace } = initEditor( storer.retrieve() );
  gazelkaInjections( global );
  var gazelleGod = getGazelleInstance();

  global.onKeyDown = prepareOnKeyDown( editor, storer )

  
  global.Gazelka = {
    JUMP: (orders) => {
      // const stateTreeProcessor = function( stateTree, gazelka, config ){
      const parsedOrders = parser.parse( orders );
      // console.log( parsedOrders, gazelleGod.getState(), 'parsedOrders' );
      const producer = stateTreeProducer( gazelleGod.getState(), strategy );
      // console.log( producer, 'producer' );
      const stateTree = producer.produce( parsedOrders );
      // console.log( stateTree, 'stateTree' );
      stateTreeProcessor( () => { gazelleGod.sleep()}, stateTree, gazelleGod, config );
    },
    reset: function(){
      this.reborn();
      gazelleGod.ctx.clearRect(0,0,1e3,1e3);
    },
    reborn: function() {
      gazelleGod.die();
      gazelleGod = getGazelleInstance();
    },
    get: () => {
      return gazelleGod;
    },
    storer,
    editor
  }
}

init( (1,eval)("this") );

module.exports = global.Gazelka;