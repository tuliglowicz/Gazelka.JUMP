const throttle = require("lodash/throttle");

const getConfig = (function(storer){
  const defaults = {
    bgColor: "#F0F0F0",
    pencilColor: "#000000",
    gazelkaStepAnimation: 3,
    withAnimation: false,
    step: 20, // 20px quantum step
    configVarName: 'config'
  };

  var configState = defaults;
  (function() {
    try {
      const parsedConfig = JSON.parse( storer.retrieve( defaults.configVarName ) || "[]" )
      parsedConfig.forEach( o => {
        configState[ o.k ] = o.v
      })
    } catch (e) {
      console.log("retrieveConfigFromLS", e, "Falling back to defaults")
    }
  })()

  const permanentConfig = (function() {
    const global = (1,eval)("this");
    const document = global.document
    const domParent = document && document.body || {getBoundingClientRect: () => {return {width: 1e3, height: 1e3}}}
    let canvas, ctx;
    if ( document ) {
      canvas = document.getElementsByTagName( "canvas" )[ 0 ]
      if ( canvas ) {
        ctx = canvas.getContext("2d")
      }
    }
    const getCentralPoint = () => {
      const { width, height } = domParent.getBoundingClientRect();
      const centerX = Math.round( width/2*100 )/100,
            centerY = Math.round( height/2*100 )/100
      return {centerX, centerY}
    }

    const adjustCanvasSize = () => {
      canvas.width = global.outerWidth-5;
      canvas.height = global.outerHeight-5;
    }
    adjustCanvasSize();
    const windowResize = throttle(adjustCanvasSize, 100);

    const obj = {
      ctx: ctx,
      domParent: domParent,
      iconImgSrc: "../app/img/icon.svg",
      getCentralPoint: getCentralPoint,
      getInitialGazelleState: function() {
        adjustCanvasSize()
        const {centerX, centerY} = this.getCentralPoint()
        return {
          x: centerX,
          y: centerY,
          angle: 0,
          color: "#000000",
          isVisible: true,
          step: 20
        }
      },
      prefix: "Gazelka.JUMP_",
      step: 20, //px
    };

    return obj;
  })();

  return { config: configState, permanentConfig }
})

module.exports = getConfig
