const fs = require("fs");
const html = fs.readFileSync("./index.html");
document.documentElement.innerHTML = html;

const CssManager = require("../../cssManager");

describe("setInitialClass", () => {
  it("initialises elements with correct class", () => {
    const cssManager = new CssManager();

    const elementNames = ["startscreen", "topbox", "zero", "one", "two"];

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

    cssManager.setInitialClass();

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

    const bottombox = document.querySelector("#bottombox");
    expect(bottombox.className).toEqual("bottombox");
  });
});
