module.exports = (function(){
  const ace = require('brace');
  const editor = ace.edit('editor');
  const commandsDescription = `
// F (forward) - do przodu o standardową odległość ZE śladem
// f (forward) - do przodu o standardową odległość BEZ śladu
// L (left) - obrót w lewo
// R (right) - obrót w prawo
// T (turn) - obrót o zadany kąt w stopniach, przykłady: T45, T-60
//     T90 - równoznaczne z L
//     T-90 - równoznaczne z R

Gazelka.JUMP( "" ); // w cudzysłowia wpisz instrukcje`;

  addSnippets = (ace) => {
    // adds snippets
    const snippetManager = ace.acequire("ace/snippets").snippetManager;
    const snippets = [
        {
            "name": "for_Gazelka.JUMP",
            "content": "for ( ${1:i} = ${2:0}; ${1:i} < ${3:limit}; ${1:i}++ ) {\n    ${4://Ciało pętli}\n}",
            "tabTrigger": "forjump"
        },
        {
            "name": "Gazelka.JUMP",
            "content": "Gazelka.JUMP( ${1:instrukcja} );",
            "tabTrigger": "jump"
            
        }
    ]
    const snippetFile = snippetManager.files['ace/mode/javascript'];
    snippets.forEach(function(o){
      snippetFile.snippets.push(o)
    })
    snippetManager.register(snippetFile.snippets, snippetFile.scope)
  }

  const initEditor = function( initialValue ) {
    require('brace/mode/javascript');
    require('brace/theme/cobalt');
    require("brace/ext/language_tools")
    require("brace/ext/spellcheck")
    require("brace/ext/whitespace")
    require("brace/snippets/javascript")
    require("brace/ext/searchbox");
    editor.getSession().setMode('ace/mode/javascript');
    editor.setTheme('ace/theme/cobalt');

    // this line disables Tab from placing highlighted completions, doesn't prevent 'Enter' from it
    delete ace.acequire('ace/autocomplete').Autocomplete.prototype.commands.Tab

    editor.setOptions({
      enableSnippets: true,
      enableLiveAutocompletion: true,
      fontSize: 16
    });

    addSnippets( ace );

    // set initial value
    editor.setValue( initialValue || commandsDescription )

    return {ace, editor}
  }

  const beautifierOptions = {
    "brace_style": "collapse",
    "break_chained_methods": false,
    "end_with_newline": true,
    "eol": "\n",
    "eval_code": true,
    "indent_char": " ",
    "indent_level": 0,
    "indent_size": 4,
    "indent_with_tabs": false,
    "jslint_happy": true,
    "keep_array_indentation": true,
    "keep_function_indentation": true,
    "max_preserve_newlines": 3,
    "preserve_newlines": true,
    "space_after_anon_function": true,
    "space_before_conditional": true,
    "unescape_strings": false,
    "wrap_line_length": 0,
    "wrap_attributes": "auto",
    "wrap_attributes_indent_size": 4,
  };

  const { js_beautify } = require('../node_modules/js-beautifier/beautify')
  const beautify = function (e) {
    const output = js_beautify(editor.getValue(), beautifierOptions);
    editor.setValue(output);
    editor.focus();
  };

  return { initEditor, beautify }
})()
