const exp = require("constants");
const fs = require("fs");
const html = fs.readFileSync("./index.html");
document.documentElement.innerHTML = html;

const EventBinders = require("../../eventBinders");

describe("UI elements call functions upon interaction", () => {
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
  test("strings call handler function when mouse enters", () => {
    let stringsArray = [];
    for (let i = 0; i < 3; i++) {
      stringsArray[i] = [];
      for (let j = 0; j < 10; j++) {
        stringsArray[i][j] = document.querySelector(`#c${i}s${j}`);
      }
    }
    const mouseEnterMock = jest.fn();

    eventBinders.bindMouseEnter(mouseEnterMock);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 10; j++) {
        stringsArray[i][j].dispatchEvent(
          new MouseEvent("mouseenter", {
            view: window,
            bubbles: true,
            cancelable: true
          })
        );
        expect(mouseEnterMock).toHaveBeenCalledWith("mouse", {
          chord: i,
          string: j
        });
      }
    }
  });
  test("selectstart event calls handler function", () => {
    const selectstartMock = jest.fn();
    eventBinders.bindSelectStart(selectstartMock);

    document.dispatchEvent(new Event("selectstart"));

    expect(selectstartMock).toHaveBeenCalled();
  });
  test("mousedown events call handler function", () => {
    const mousedownMock = jest.fn();
    eventBinders.bindMouseDown(mousedownMock);

    document.dispatchEvent(new MouseEvent("mousedown"));

    expect(mousedownMock).toHaveBeenCalled();
  });
  test("mouseup events call handler function", () => {
    const mouseupMock = jest.fn();
    eventBinders.bindMouseUp(mouseupMock);

    document.dispatchEvent(new MouseEvent("mouseup"));

    expect(mouseupMock).toHaveBeenCalled();
  });
  test("touchstart event calls handler function", () => {
    const touchstartMock = jest.fn();
    eventBinders.bindTouchStart(touchstartMock);

    document
      .querySelector("#middle-box")
      .dispatchEvent(new TouchEvent("touchstart"));

    expect(touchstartMock).toHaveBeenCalled();
  });
  test("touchend calls handler function", () => {
    const touchendMock = jest.fn();
    eventBinders.bindTouchEnd(touchendMock);

    document
      .querySelector("#middle-box")
      .dispatchEvent(new TouchEvent("touchend"));

    expect(touchendMock).toHaveBeenCalled();
  });
  test("touchmove calls handler function", () => {
    const touchmoveMock = jest.fn();
    eventBinders.bindTouchMove(touchmoveMock);

    document
      .querySelector("#middle-box")
      .dispatchEvent(new TouchEvent("touchmove"));

    expect(touchmoveMock).toHaveBeenCalled();
  });
});
