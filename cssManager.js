class cssManager {
  setInitialClass() {
    const elementNames = [
      "startscreen",
      "topbox",
      "zero",
      "one",
      "two",
      "bottombox",
      "optionstop",
      "optionsmiddle",
      "optionsbottom",
      "backbutton"
    ];
    const chordNames = ["chord0name", "chord1name", "chord2name"];
    const stringContainers = [
      "stringscontainer0",
      "stringscontainer1",
      "stringscontainer2"
    ];
    const rightspaces = [
      "chordzerorightspace",
      "chordonerightspace",
      "chordtworightspace"
    ];
    for (const name of elementNames) {
      const element = document.querySelector(`#${name}`);
      element.className = name;
    }
    for (const name of chordNames) {
      const element = document.querySelector(`#${name}`);
      element.className = "chordname";
    }
    for (const name of stringContainers) {
      const element = document.querySelector(`#${name}`);
      element.className = "stringscontainer";
    }
    for (let chord = 0; chord < 3; chord++) {
      for (let string = 0; string < 10; string++) {
        const element = document.querySelector(`#c${chord}s${string}`);
        element.className = "string";
      }
    }
    for (const name of rightspaces) {
      const element = document.querySelector(`#${name}`);
      element.className = "rightspace";
    }
    this.optionsInvisible();
  }

  switchChords(chord, visible) {
    const chordBlockClasses = ["zero", "one", "two"];
    if (!visible) {
      document.querySelector(`#${chordBlockClasses[chord]}`).className =
        "invisible";
    } else {
      document.querySelector(`#${chordBlockClasses[chord]}`).className =
        chordBlockClasses[chord];
    }
  }

  optionsVisible() {
    document.querySelector("#optionscreen").className = "optionscreen";
  }

  optionsInvisible() {
    const optionscreen = document.querySelector("#optionscreen");
    optionscreen.className = "invisible";
  }

  showStart() {
    document.querySelector("#startbutton").innerHTML = "Start";
  }

  hideStart() {
    document.querySelector("#startscreen").className = "invisible";
  }
}

module.exports = cssManager;
