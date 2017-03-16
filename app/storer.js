const storer = (function(global){
  const localStorage = global.localStorage;
  let i = localStorage && (localStorage['Gazelka.JUMP_pointer']) || 0;
  const LIMIT = 10;

  function nextI(){
    i++;
    i = (i === LIMIT ? 0 : i )
  }

  function store(what, pointer) {
    var isPointerDefined = !!pointer
    !isPointerDefined && nextI()
    pointer = pointer || i
    localStorage && (localStorage['Gazelka.JUMP_'+pointer] = what)
    localStorage && !isPointerDefined && (localStorage['Gazelka.JUMP_pointer'] = i)

    return i;
  }

  function retrieve( pointer ){
    var pointer = ( pointer || i )
    return localStorage && localStorage['Gazelka.JUMP_'+pointer]
  }

  return {
    i: i,
    store: store,
    retrieve: retrieve
  }
})((1,eval)("this"));

module.exports = storer