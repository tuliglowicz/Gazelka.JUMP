const cloneDeep = require("lodash/cloneDeep")
const getConfig = require("../config")
const isEmpty = require("lodash/isEmpty")
const { gazelkaIdGenerator } = require("../gazelkaIdGenerator")
const debounce = require("lodash/debounce")
const storer = require("../storer")
const { config, permanentConfig } = getConfig( storer )

const DIM = "dim" // classname for "invisible" (semi-visible in reality) gazelle icon

class GazelkaPencil {
  constructor({ctx, domParent, iconImgSrc, initialState, withAnimation}) {
    this.id = gazelkaIdGenerator()
    this.ctx = ctx
    this.domParent = domParent
    this.iconImgSrc = iconImgSrc
    this.pencilState = initialState
    this.withAnimation = withAnimation
    this.clones = []
    this.isDead = false

    if ( !(this.ctx && this.pencilState && this.domParent) ) {
      throw "!!! gazelka, l19"
      throw {
        type: "missing params",
        msg: "GazelkaClass expects: id, ctx (2d canvas context), orders (array of states), domParent"
      }
    }

    if ( Object.prototype.toString.call(this.ctx) === "[object CanvasRenderingContext2D]" ) {
      // icon creation
      const icon = document.createElement( "img" )
      icon.id = this.id
      icon.src = this.iconImgSrc
      icon.classList.add("gazelka__icon") //TODO: remove hardcoding

      // position initiation
      this.smallIcon = true
      icon.style.transform = this.getCSSTransformationString()
      const {width, height} = this.domParent.getBoundingClientRect()
      icon.style.left = (this.pencilState.x || Math.round(width/2) )+"px"
      icon.style.top = (this.pencilState.y || Math.round(height/2) )+"px"

      if ( ! this.pencilState.isVisible ) {
        icon.classList.add( DIM )
      }

      this.icon = icon
      this.domParent.appendChild( icon )

      this.makeBigTimeout = setTimeout(this.makeBig.bind(this), 0)
    }
  }

  getCSSTransformationString() {
    const translation = "translate3d(-50%,-50%,0)"
    const rotation = `rotateZ(${this.getAngle()}deg)`
    const scaleParam = this.smallIcon ? .25 : 1
    const scaling = `scale3d(${ scaleParam },${ scaleParam }, 1)`
    return `${translation} ${rotation} ${scaling}`
  }

  updateIconTransfomation() {
    this.icon.style.transform = this.getCSSTransformationString()
  }

  makeSmall() {
    this.smallIcon = true
    this.updateIconTransfomation()
  }

  makeBig() {
    this.smallIcon = false
    this.updateIconTransfomation()
  }

  finish() {
    clearTimeout( this.makeBigTimeout )
    this.makeSmall()
  }

  die() {
    this.isDead = true
    this.domParent.removeChild( this.icon )
    this.clones.forEach( o => {
      o.die()
    })
  }

  getAngle(){
    return (this.pencilState.angle*180/Math.PI) || 0
  }

  jump( newState ) {
    const {x, y, angle, color, step} = this.pencilState // oldValues
    Object.assign(this.pencilState, newState)
    //assumption: either x,y or angle changes, never both
    if ( newState.x !== x || newState.y !== y ) {
      this.ctx.beginPath()
      this.ctx.moveTo( x, y )
      this.ctx.lineTo( this.pencilState.x, this.pencilState.y )
      this.icon.style.left = `${this.pencilState.x}px`
      this.icon.style.top = `${this.pencilState.y}px`
      this.pencilState.isVisible && this.ctx.stroke()
      this.ctx.closePath()
    } else if ( newState.angle !== angle ) {
      this.icon.style.transform = `translate3d(-50%,-50%,0) rotateZ(${this.getAngle()}deg)`
    } else if ( newState.color !== color ) {
      this.ctx.strokeStyle = this.pencilState.color
    }

    if ( this.pencilState.isVisible ) {
      this.icon.classList.remove( DIM )
    } else {
      this.icon.classList.add( DIM )
    }
  }

  ensureColorInCTX(){
    this.ctx.strokeStyle = this.pencilState.color
  }

  jumpUp() {
    this.icon.style.transform = this.icon.style.transform.replace(/(-?\d+)deg/g, function(match, grouped){
      return ((+grouped)-360)+"deg"
    })
  }

  fallBackToTheGround() {
    this.icon.style.transform = this.icon.style.transform.replace(/(-?\d+)deg/g, function(match, grouped){
      return ((+grouped)+360)+"deg"
    })
    this.icon.style.top = parseInt(this.icon.style.top)+10+"px"
  }

  setState(newState) {
    Object.assign( this.pencilState, newState )
  }

  clone() {
    const newClone = new GazelkaPencil({
      ctx: this.ctx,
      domParent: this.domParent,
      iconImgSrc: this.iconImgSrc,
      withAnimation: this.withAnimation,
      initialState: this.getState(),
    })
    this.clones.push( newClone )
    return newClone
  }

  sleep() {
    this.wasDimmed = this.icon.classList.contains( DIM )

    if( !this.wasDimmed){
      this.icon.classList.add( DIM )
    }
  }

  wakeUp() {
    this.ctx.strokeStyle = this.pencilState.color
    if( !this.wasDimmed ){
      this.icon.classList.remove( DIM )
    }
    delete this.wasDimmed
  }

  getState() {
    return cloneDeep(this.pencilState)
  }

  toString() {
    return JSON.stringify( this.pencilState )
  }
}

const getGazelleInstance = function() {
  return new GazelkaPencil({
    ctx: permanentConfig.ctx,
    domParent: permanentConfig.domParent,
    iconImgSrc: permanentConfig.iconImgSrc,
    initialState: permanentConfig.getInitialGazelleState(),
    withAnimation: config.withAnimation
  });
}
module.exports = { getGazelleInstance }