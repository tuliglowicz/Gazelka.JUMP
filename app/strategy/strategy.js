"use strict";

function move(state, actualStep){
  console.log( state, actualStep, '--==')
  state.x += Math.cos(state.angle)*(actualStep)
  state.y += Math.sin(state.angle)*(actualStep)
  return state
}
function turn(state, angleDiff){
  state.angle -= angleDiff
  return state
}
function getVal( order ){
  return +order.substring(1)
}

const strategyObj = {
  'f':{
    description: {
      pl: 'idź na wprost BEZ śladu',
      en: 'move forward WITHOUT mark',
    },
    validate:{
      fun: function(command){
        return command.length === 1
      },
      msg: {
        pl: 'nieoczekiwany parametr przy instrukcji f',
        en: 'unexpected token after f command'
      }
    },
    action: function(state){
      var tmpObj = move(state, state.step)
      tmpObj.isVisible = false
      return tmpObj
    }
  },
  'F':{
    description: {
      pl: 'idź na wprost ZE śladem',
      en: 'move forward WITH mark',
    },
    validate:{
      fun: function(command){
        return command.length === 1
      },
      msg: {
        pl: 'nieoczekiwany parametr przy instrukcji F',
        en: 'unexpected token after F command'
      }
    },
    action: function(state){
      var tmpObj = move(state, state.step)
      tmpObj.isVisible = true
      return tmpObj
    }
  },
  'L':{
    description: {
      pl: 'obrót w lewo o 90 stopni od obecnego kąta',
      en: 'turn left by 90 deg from current angle',
    },
    validate:{
      fun: function(command){
        return command.length === 1
      },
      msg: {
        pl: 'nieoczekiwany parametr przy instrukcji L',
        en: 'unexpected token after L command'
      }
    },
    action: function(state){
      var tmpObj = turn(state, -Math.PI/2)
      return tmpObj
    }
  },
  'R':{
    description: {
      pl: 'obrót w prawo o 90 stopni od obecnego kąta',
      en: 'turn right by 90 deg from current angle',
    },
    validate:{
      fun: function(command){
        return command.length === 1
      },
      msg: {
        pl: 'nieoczekiwany parametr przy instrukcji R',
        en: 'unexpected token after R command'
      }
    },
    action: function(state){
      var tmpObj = turn(state, Math.PI/2)
      return tmpObj
    }
  },
  'T':{
    description: {
      pl: 'Obróć o zadany kąt. Ujemne liczby kierują w prawo, dodatnie w lewo.',
      en: 'turn by given angle from current state. Positives for left, negatives for right.',
    },
    validate:{
      fun: function(command){
        var probablyNumber = +command.substring(1)
        return command.length > 1 && !isNaN(probablyNumber) && isFinite(probablyNumber)
      },
      msg: {
        pl: 'Parametr T oczekuje liczby. Możliwe, że użyłeś/łaś znaku przecinka zamiast kropki do oddzielenia części dziesiętnej',
        en: 'T Parameter expects a number as an arument',
      }
    },
    action: function(state, order){
      var angleDiff = getVal(order);
      var tmpObj = turn(state, angleDiff*Math.PI/180)
      return tmpObj
    }
  },
  'M':{
    description: {
      pl: 'Idź do przodu o zadaną odległość ZE śladem',
      en: 'Move forward by a given distance WITHOUT mark',
    },
    validate:{
      fun: function(command){
        var probablyNumber = +command.substring(1)
        return command.length > 1 && !isNaN(probablyNumber) && isFinite(probablyNumber)
      },
      msg: {
        pl: 'Parametr M oczekuje liczby. Możliwe, że użyłeś/łaś znaku przecinka zamiast kropki do oddzielenia części dziesiętnej',
        en: 'M Parameter expects a number as an arument',
      }
    },
    action: function(state, order){
      var actualStep = getVal(order)
      var tmpObj = move(state, actualStep)
      tmpObj.isVisible = true
      return tmpObj
    }
  },
  'm':{
    description: {
      pl: 'Idź do przodu o zadaną odległość BEZ śladu',
      en: 'Move forward by a given distance WITH mark',
    },
    validate:{
      fun: function(command){
        var probablyNumber = +command.substring(1)
        return command.length > 1 && !isNaN(probablyNumber) && isFinite(probablyNumber)
      },
      msg: {
        pl: 'Parametr m oczekuje liczby. Możliwe, że użyłeś/łaś znaku przecinka zamiast kropki do oddzielenia części dziesiętnej',
        en: 'm Parameter expects a number as an arument',
      }
    },
    action: function(state, order){
      var actualStep = getVal(order)
      var tmpObj = move(state, actualStep)
      tmpObj.isVisible = false
      return tmpObj
    }
  },
  'C':{
    description: {
      pl: 'Zmień kolor śladów',
      en: 'Change the color of the mark',
    },
    colors: [
      "#000000", // 0 - czerń
      "#000000", // 1 - czerń
      "#FFFFFF", // 2 - biel
      "#FF0000", // 3 - czerwień
      "#FF8000", // 4 - pomarańcz
      "#FFFF00", // 5 - żółć
      "#00FF00", // 6 - zieleń
      "#00FF80", // 7 - jasnozielony
      "#00FFFF", // 8 - morski
      "#0080FF", // 9 - jasnoniebieski
      "#0000FF", // 10 - niebieski
      "#FF00FF", // 11 - fiolet
    ],
    validate:{
      fun: function(command){
        var colors = strategy["C"].colors
        var probablyNumber = +command.substring(1)
        return command.length > 1 && !isNaN(probablyNumber) && isFinite(probablyNumber) && probablyNumber
        >= 0 && probablyNumber < colors.length
      },
      msg: {
        pl: 'Parametr C oczekuje liczby 1-10. Możliwe, że użyłeś/łaś znaku przecinka zamiast kropki do oddzielenia części dziesiętnej',
        en: 'C Parameter expects a number 1-10 as an arument',
      }
    },
    action: function(state, order){
      var colorId = getVal(order)
      switch(colorId){
        case 1: state.color = "#000000"; break;
        case 2: state.color = "#FFFFFF"; break;
        case 3: state.color = "#FF0000"; break;
        
        case 4: state.color = "#FF8000"; break;
        case 5: state.color = "#FFFF00"; break;
        case 6: state.color = "#00FF00"; break;

        case 7: state.color = "#00FF80"; break;
        case 8: state.color = "#00FFFF"; break;
        case 9: state.color = "#0080FF"; break;
        case 10: state.color = "#0000FF"; break;
        case 11: state.color = "#FF00FF"; break;
      }
      return state
    }
  }
}

const strategy = function(currentOrder, STATE){
    return strategyObj[ currentOrder.charAt(0) ].action(STATE, currentOrder)
};

module.exports = strategy