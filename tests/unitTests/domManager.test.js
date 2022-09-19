const fs = require("fs");
const html = fs.readFileSync("./index.html");
document.documentElement.innerHTML = html;

const DomManager = require("../../domManager");

describe("setInitialClass", () => {
  it("initialises elements with correct class", () => {
    const domManager = new DomManager();

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

    domManager.setInitialClass();

    for (const name of elementNames) {
      const element = document.querySelector(`#${name}`);
      expect(element.className).toEqual(name);
    }

    for (const name of chordNames) {
      const element = document.querySelector(`#${name}`);
      expect(element.className).toEqual("chordname");
    }

    for (const name of stringContainers) {
      const element = document.querySelector(`#${name}`);
      expect(element.className).toEqual("stringscontainer");
    }

    for (let chord = 0; chord < 3; chord++) {
      for (let string = 0; string < 10; string++) {
        const element = document.querySelector(`#c${chord}s${string}`);
        expect(element.className).toEqual("string");
      }
    }

    for (const name of rightspaces) {
      const element = document.querySelector(`#${name}`);
      expect(element.className).toEqual("rightspace");
    }

    const optionscreen = document.querySelector("#optionscreen");
    expect(optionscreen.className).toEqual("invisible");
  });
});

describe("switchChords", () => {
  const domManager = new DomManager();
  const chordBlockClasses = ["zero", "one", "two"];
  const button = 0;

  it("changes class to invisible when it is visible", () => {
    domManager.switchChords(button, false);

    expect(
      document.querySelector(`#${chordBlockClasses[button]}`).className
    ).toEqual("invisible");
  });
  it("changes class to visible when it is invisible", () => {
    domManager.switchChords(button, true);

    expect(
      document.querySelector(`#${chordBlockClasses[button]}`).className
    ).toEqual(chordBlockClasses[button]);
  });
});

describe("optionsVisible", () => {
  const domManager = new DomManager();

  it("change to visible class", () => {
    domManager.optionsVisible();

    expect(document.querySelector("#optionscreen").className).toEqual(
      "optionscreen"
    );
  });
});

describe("optionsInvisible", () => {
  const domManager = new DomManager();

  it("change to invisible class", () => {
    domManager.optionsInvisible();

    expect(document.querySelector("#optionscreen").className).toEqual(
      "invisible"
    );
  });
});

describe("showStart", () => {
  const domManager = new DomManager();
  it("sets load screen to start text", () => {
    domManager.setInitialClass();
    domManager.showStart();
    expect(document.querySelector("#startbutton").innerHTML).toEqual("Start");
  });

  describe("hideStart", () => {
    const domManager = new DomManager();
    it("hides start screen", () => {
      domManager.setInitialClass();
      domManager.hideStart();
      expect(document.querySelector("#startscreen").className).toEqual(
        "invisible"
      );
    });
  });
});

describe("changeChordName", () => {
  const domManager = new DomManager();
  it("changes displayed chord name", () => {
    const whichChord = 0;
    const name = "D#";
    domManager.setInitialClass();
    domManager.changeChordName(whichChord, name);

    expect(document.querySelector(`#chord${whichChord}name`).innerHTML).toEqual(
      name
    );
  });
});