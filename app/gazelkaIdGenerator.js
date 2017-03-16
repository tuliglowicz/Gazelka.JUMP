const gazelkaIdGeneratorSingleton = (prefix) => {
  var instance = null, i;

  if ( !instance ) {
    i = 0;
    instance = function(){
      return (prefix||"Gazelka_")+(i++)
    }
  }

  return instance
}

module.exports = { gazelkaIdGenerator: gazelkaIdGeneratorSingleton()};
