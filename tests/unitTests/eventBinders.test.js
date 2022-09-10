const fs = require("fs");
const html = fs.readFileSync("./index.html");
document.documentElement.innerHTML = html;

const EventBinders = require("../../eventBinders");

describe("UI buttons call functions", () => {
  const eventBinders = new EventBinders();

  test("chord buttons call handler function", () => {
    let onechord = document.querySelector("#onechord");
    let twochord = document.querySelector("#twochord");
    let threechord = document.querySelector("#threechord");
    const chordMock = jest.fn();

    eventBinders.bindChordButtons(chordMock);
    onechord.click();
    twochord.click();
    threechord.click();

    expect(chordMock).toHaveBeenCalledWith(0, "#onechord");
    expect(chordMock).toHaveBeenCalledWith(1, "#twochord");
    expect(chordMock).toHaveBeenCalledWith(2, "#threechord");
  });
  test("start screen calls handler function", () => {
    let startscreen = document.querySelector("#startscreen");
    const startScreenMock = jest.fn();

    eventBinders.bindStartScreen(startScreenMock);
    startscreen.click();

    expect(startScreenMock).toHaveBeenCalled();
  });
});
