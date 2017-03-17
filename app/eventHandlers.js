// const Gazelka = (1,eval)("this").Gazelka
// console.log(Gazelka.editor.getValue(), '--')


const geval = eval;
function prepareOnKeyDown( editor, storer ) {
  return (e) => {
    // e.preventDefault()
    // e.stopPropagation()
    if (e.key === "Enter" && e.ctrlKey && e.shiftKey) {
      geval(editor.getValue());
      storer.store(editor.getValue());
    }
  }
}

module.exports = { prepareOnKeyDown }

// const x = function(global, editor) {
  // const document = global.document || {}

  // const beautify = document.getElementById("beautify");
  // const submit = document.getElementById('submit');
  // const reset = document.getElementById('reset');

//   submit.onclick = function (e) {
//     try {
//       geval(editor.getValue());
//       err.innerHTML = "";
//       errCont.classList.remove('show');
//     } catch (e) {
//       console.log(e);
//       // err.innerHTML = e; //errorStrategy( tmp, STATE.lang );
//       // errCont.classList.add('show');
//     }
//   };

//   function onKeyDown(STATE, storer){
//     return function(e) {
//       if (e.key === "Enter") {
//         // if( document.activeElement !== codeInput ){
//         if (!editor.isFocused()) {
//           e.stopPropagation();
//           e.preventDefault();
//         }
//         var tmp = STATE.showAnimation;
//         // codeInput.focus();
//         editor.focus()
//         if (e.shiftKey) {
//           STATE.showAnimation = false;
//         }
//         if (e.ctrlKey) {
//           submit.onclick();
//         }
//         STATE.showAnimation = tmp;
//       } else if (e.key === "Escape") {
//         if( e.ctrlKey ){
//           resetGazelle(STATE);
//         } else {
//           // codeInput.blur();
//           editor.blur();
//         }
//           // } if( e.ctrlKey && document.activeElement === codeInput ){
//       }
//       if (e.ctrlKey && editor.isFocused()) {
//         // var value = codeInput.value;
//         // var value = editor.getValue();
//         var toAdd;
//         // var caretPos = codeInput.selectionStart;
//         switch (e.key) {
//         case 'ArrowUp':
//           if (e.shiftKey) {
//             toAdd = 'f';
//           } else {
//             toAdd = 'F';
//           }
//           break;
//         case 'ArrowDown':
//           toAdd = 'RR';
//           break
//         case 'ArrowLeft':
//           toAdd = 'L';
//           break;
//         case 'ArrowRight':
//           toAdd = 'R';
//           break;
//         }

//         if (toAdd) {
//           editor.insert(toAdd);
//           return false;
//         }

//         if (toAdd) {
//           e.stopPropagation();
//           e.preventDefault();
//         }

//       }
//       storer.store(editor.getValue());
//     }
//   }

//   document.body.onkeydown = onKeyDown(STATE, storer);
// };


// /*
//   const pasteCode = (code) => {
//     Gazelka.editor.insert(code);
//     Gazelka.editor.focus();
//     Gazelka.storer.store(Gazelka.editor.getValue());
//   }


//   gazelleGod.ctx.canvas.width  = global.innerWidth;
//   gazelleGod.ctx.canvas.height = global.innerHeight;
// */



// module.exports = x