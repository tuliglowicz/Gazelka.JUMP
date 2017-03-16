getCanvasParams = () => {
  const document = (1,eval)("this").document
  const domParent = document && document.body || {getBoundingClientRect: () => {return {width: 1e3, height: 1e3}}}
  const { width, height } = domParent.getBoundingClientRect();
  const centerX = Math.round( width/2 ),
        centerY = Math.round( height/2 )
  let ctx
  if ( document ) {
    const canvas = document.getElementsByTagName("canvas")[0]
    if( canvas ){
      ctx = canvas.getContext("2d")
    }
  }

  return {centerX, centerY, ctx, domParent}
}

const getConfig = (function() {
  const basicColor = "#000000"
  const { centerX, centerY, ctx, domParent } = getCanvasParams()
  const obj = {
    backgroundColor: "#FFFFFF", //
    basicColor: basicColor,      //
    centerX: centerX+"px",      //
    centerY: centerY+"px",      //
    ctx: ctx,
    domParent: domParent,
    gazelkaStepAnimation: 200,  //
    iconImgSrc: "../app/img/icon.svg",
    initialGazelleState: {
      x: centerX,
      y: centerY,
      angle: 0,
      color: basicColor,
      step: 20
    },
    prefix: "Gazelka.JUMP_",
    withAnimation: true,        //
  };

  return obj;
});


// na podstawie danych są rysowane kontrolki
// zmiana kontrolki = akcja
// akcja odpala store
// potem jest przebudowanie widoku

// u mnie może być:
//   jedna akcja: coś się zmieniło
//   zczytanie wszystiego
//   aktualizacja store-a
//   przerysowanie html-a

// const defaults = {
//   bgColor: "#F0F0F0",
//   pencilColor: "#000000",
//   gazelkaStepAnimation: 3,
//   withAnimation: true,
//   configVarName: 'config'
// };

// const componentParams = [
//   {
//     id: "bgColor",
//     type: "color",
//     label: "Kolor tła",
//     description: "Określa kolor tła obszaru gazelki",
//     htmlAttrs: [
//       {name: "value", value: getConfigValueFor("bgColor")},
//     ],
//     getValue: ( elem => elem.value ),
//   },
//   {
//     id: "pencilColor",
//     type: "color",
//     label: "Kolor kreski",
//     description: "Określa kolor kresek zostawianych przez gazelkę",
//     htmlAttrs: [
//       {name: "value", value: getConfigValueFor("pencilColor")},
//     ],
//     getValue: ( elem => elem.value ),
//   },
//   {
//     id: "gazelkaStepAnimation",
//     type: "range",
//     label: "Prędkość animacji",
//     description: "Określa prędkość poruszania się gazelki",
//     htmlAttrs: [
//       {name: "value", value: getConfigValueFor("gazelkaStepAnimation")},
//       {name: "min", value: 1},
//       {name: "max", value: 10},
//     ],
//     getValue: ( elem => elem.value ),
//     isDisabled: function( configState ){
//       return !configState.withAnimation
//     }
//   },
//   {
//     id: "withAnimation",
//     type: "checkbox",
//     label: "Animacja",
//     description: "Czy animować ruch gazelki?",
//     htmlAttrs: getConfigValueFor("withAnimation") && [
//       {name: "checked", value: "checked"},
//     ],
//     getValue: ( elem => elem.checked )
//   },
//   {
//     id: "clearEachTime",
//     type: "checkbox",
//     label: "Czyść i JUMP",
//     description: "Czy animować ruch gazelki?",
//     htmlAttrs: getConfigValueFor("clearEachTime") && [
//       {name: "checked", value: "checked"},
//     ],
//     getValue: ( elem => elem.checked )
//   },
//   {
//     id: "resetEachTime",
//     type: "checkbox",
//     label: "Reset i JUMP",
//     description: "Czy animować ruch gazelki?",
//     htmlAttrs: getConfigValueFor("resetEachTime") && [
//       {name: "checked", value: "checked"},
//     ],
//     getValue: ( elem => elem.checked )
//   },
// ];

// let configState = {}
// JSON.parse( Gazelka.storer.retrieve( defaults.configVarName ) || "[]" )
//   .forEach( o => { configState[o.k] = o.v } )

// let getConfigValueFor = (id) => {
//   return typeof configState[ id ] !== 'undefined' ? configState[ id ] : defaults[ id ]
// }

// const buildHTML = ( option ) => {
//   let isDisabled = typeof option.isDisabled === "function" ? option.isDisabled( configState ) : !!option.isDisabled
//   return (
//     `<li class="configOptions__li">
//       <input
//         id="${option.id}"
//         type="${option.type}"
//         title="${option.description}"
//         class="configOptions__input"
//         ${option.htmlAttrs ? option.htmlAttrs.map( o => o.name+"=\""+o.value+"\"").join(" ") : ''}
//         ${isDisabled ? 'disabled="disabled' : ""}
//       />
//       <label for="${option.id}" class="configOptions__label">${option.label}</label>
//     </li>`
//   )
// }

// const pasteCode = (code) => {
//   Gazelka.editor.insert(code);
//   Gazelka.editor.focus();
//   Gazelka.storer.store(Gazelka.editor.getValue());
// }

// const configReset = (e) => {
//   // Gazelka_config_reset
//   let reset = "<li><button id='Gazelka_config_reset'>Reset</button></li>"
//   let pastejump = "<li><button id='Gazelka_pastejump'>Gazelka.JUMP</button></li>"
//   let txt = `<ul class="configOptions__ul">${t.map( buildHTML ).join("")}${reset}${pastejump}</ul>`
//   document.getElementById("config").innerHTML = txt
//   Gazelka.storer.store( [], defaults.configVarName )
//   document.getElementById('Gazelka_config_reset').addEventListener( "click", configReset)
//   document.getElementById('Gazelka_pastejump').addEventListener( "click", (e) => {
//     pasteCode("Gazelka.JUMP( \"\" );");
//   });
// }
// configReset()

// document.querySelector(".configOptions__ul").addEventListener( "change", () => {
//   const newConfigState = t.map( o => { return {k: o.id, v:o.getValue( document.getElementById( o.id ) )} })
//   Gazelka.storer.store( JSON.stringify( newConfigState ), defaults.configVarName )
// });

// module.exports = configReset;

// module.exports = { getConfig };