const isArray = require('lodash/isArray')
const clone = require('lodash/clone')

module.exports = function( state, strategy ){
  "use strict";

  if(!state || !strategy){
    throw new Error("Podaj parametry, ziom!")
  }

  const stack = [];

  function execToken(state){
    return function(o){
      if( isArray(o) ){
        return execExpression(o, state)
      } else {
        return (state = strategy(o, clone(state)))
      }
    }
  };

  function execExpression(tab, state, isFirst){
    //zapamietaj obecny stan
    //zmianiaj stan wg tokenow
    //kiedy skoncza sie tokeny przywroc stan z góry stosu

    stack.push( state );
    const retVal = tab.map( execToken( clone(state) ) );
    // isFirst && retVal.unshift(state)
    // !isFirst && (state = clone(stack.pop()));
    return retVal;
  };

  //[ 'F', 'F', [ 'L', [ 'F', 'F' ] ], 'F', 'L', 'L', 'L' ]
  return {
    produce: function(orders) {
      return execExpression( orders, clone(state), true );
    }
  }
}