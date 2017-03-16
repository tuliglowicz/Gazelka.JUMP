const { GazelkaPencil } = require( "./gazelka/gazelka.js" )
const isArray = require("lodash/isArray")
const isEmpty = require("lodash/isEmpty")
const cloneDeep = require("lodash/cloneDeep")

let gazelkaAnimationInterval

const stateTreeProcessor = function( callback, stateTree, gazelka, config ){
  if ( config.withAnimation ) {
    gazelkaAnimationInterval = 1000 / config.gazelkaStepAnimation
    animationStateTreeProcessor( callback, stateTree, gazelka, undefined, undefined, config )
  } else {
    noAnimationStateTreeProcessor( stateTree, gazelka )
    callback();
  }
};

const animationStateTreeProcessor = ( callback, stateTree, gazelka, resParent, rejParent, config ) => {
  const orders = cloneDeep( stateTree )
  const goThrough = function ( orders ) {
    if( gazelka.isDead ) {
      return
    }

    const o = orders.shift()
    if( ! o && typeof resParent === 'function' ){
      resParent()
      return
    } else {
      callback()
    }
    if ( isArray( o ) ) {
      gazelka.sleep()
      setTimeout( () => {
        const gazelkaClone = gazelka.clone()
        setTimeout( () => {
          new Promise( (res, rej) => {
            animationStateTreeProcessor( o, gazelkaClone, res, rej, config )
          }).then( () => {
            gazelka.wakeUp()
            gazelkaClone.finish()
            gazelka.ensureColorInCTX()
            setTimeout( () => {
              goThrough( orders )
            }, gazelkaAnimationInterval)
          }, gazelkaAnimationInterval)
        }, gazelkaAnimationInterval)
      }, gazelkaAnimationInterval )
    } else if( o ) {
      new Promise( (res, rej) => {
        gazelka.jump( o )
        setTimeout( () => {
          res()
        }, gazelkaAnimationInterval)
      }).then( () => {
        goThrough( orders )
      });
    }

  }; // goThrought function

  if ( ! isEmpty( orders ) ) {
    goThrough( orders )
  }
}

const noAnimationStateTreeProcessor = ( stateTree, gazelka ) => {
  stateTree.forEach( o => {
    if ( isArray( o ) ) {
      const gazelkaClone = gazelka.clone()
      noAnimationStateTreeProcessor( o, gazelkaClone )
      gazelkaClone.finish()
      gazelka.ensureColorInCTX()
    } else {
      gazelka.jump( o )
    }
  })
}

module.exports = { stateTreeProcessor }
