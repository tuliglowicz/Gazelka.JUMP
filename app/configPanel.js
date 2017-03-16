function rysujConfig() {

  const buildHTML = ( option ) => {
    let isDisabled = typeof option.isDisabled === "function" ? option.isDisabled( configState ) : !!option.isDisabled
    return (
      `<li class="configOptions__li">
        <input
          id="${option.id}"
          type="${option.type}"
          title="${option.description}"
          class="configOptions__input"
          ${option.htmlAttrs ? option.htmlAttrs.map( o => o.name+"=\""+o.value+"\"").join(" ") : ''}
          ${isDisabled ? 'disabled="disabled' : ""}
        />
        <label for="${option.id}" class="configOptions__label">${option.label}</label>
      </li>`
    )
  }

  const configReset = (e) => {
    let reset = "<li><button id='Gazelka_config_reset'>Reset</button></li>"
    let pastejump = "<li><button id='Gazelka_pastejump'>Gazelka.JUMP</button></li>"
    let txt = `<ul class="configOptions__ul">${componentParams.map( buildHTML ).join("")}${reset}${pastejump}</ul>`
    document.getElementById("config").innerHTML = txt
    document.getElementById('Gazelka_config_reset').addEventListener( "click", configReset)
    document.getElementById('Gazelka_pastejump').addEventListener( "click", (e) => {
      pasteCode("Gazelka.JUMP( \"\" );");
    });
  }
  configReset()

  document.querySelector(".configOptions__ul").addEventListener( "change", () => {
    const newConfigState = componentParams.map( o => { return {k: o.id, v:o.getValue( document.getElementById( o.id ) )} })
    Gazelka.storer.store( JSON.stringify( newConfigState ), defaults.configVarName )
  });
}