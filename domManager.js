class DomManager {
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
    this.stringElementVisibility = [
      ["#zero", "#one", "#two"],
      ["#stringscontainer0", "#stringscontainer1", "#stringscontainer2"],
      ["#chordzerorightspace", "#chordonerightspace", "#chordtworightspace"]
    ];
    for (let i = 0; i < this.stringElementVisibility.length; i++) {
      for (let j = 0; j < this.stringElementVisibility[i].length; j++) {
        const element = document.querySelector(
          this.stringElementVisibility[i][j]
        );
        element.classList.add("flex");
      }
    }
  }

  switchChords(chord, visible) {
    // const chordBlockClasses = ["zero", "one", "two"];
    if (!visible) {
      for (let i = 0; i < this.stringElementVisibility.length; i++) {
        const element = document.querySelector(
          this.stringElementVisibility[i][chord]
        );
        element.classList.remove("flex");
        element.classList.add("invisible");
      }
    } else {
      for (let i = 0; i < this.stringElementVisibility.length; i++) {
        const element = document.querySelector(
          this.stringElementVisibility[i][chord]
        );
        element.classList.remove("invisible");
        element.classList.add("flex");
      }
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

  changeChordName(whichChord, name) {
    document.querySelector(`#chord${whichChord}name`).innerHTML = name;
  }
}

module.exports = DomManager;
