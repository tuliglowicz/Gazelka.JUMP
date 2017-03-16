const peg = require('pegjs');
const data = `
start =
    tokens+
    
tokens = 
  w:[FfLR]
    /
  w:[TmMCW] rest:number
      {return w+rest}
    / "(" t:tokens+ ")"
      {return t}

number =
  minus:[-]? int:[0-9]+ kr:[.]? dec:[0-9]*
    {return (minus||'')+(int||[]).join("")+(kr||'')+(dec||[]).join("")}`

// Create my parser
var parser = peg.generate(data);

module.exports = parser
