const fs = require("fs");
const html = fs.readFileSync("./index.html");
document.documentElement.innerHTML = html;

const EventBinders = require("../../eventBinders");

describe("UI elements call functions upon interaction", () => {
  const eventBinders = new EventBinders();

  test("chord buttons call handler function", () => {
    let zerochordbutton = document.querySelector("#zerochordbutton");
    let onechordbutton = document.querySelector("#onechordbutton");
    let twochordbutton = document.querySelector("#twochordbutton");
    const chordMock = jest.fn();

    eventBinders.bindChordButtons(chordMock);
    zerochordbutton.click();
    onechordbutton.click();
    twochordbutton.click();

    expect(chordMock).toHaveBeenCalledWith(0, "#zerochordbutton");
    expect(chordMock).toHaveBeenCalledWith(1, "#onechordbutton");
    expect(chordMock).toHaveBeenCalledWith(2, "#twochordbutton");
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
      .querySelector("#chord-container")
      .dispatchEvent(new TouchEvent("touchstart"));

    expect(touchstartMock).toHaveBeenCalled();
  });
  test("touchend calls handler function", () => {
    const touchendMock = jest.fn();
    eventBinders.bindTouchEnd(touchendMock);

    document
      .querySelector("#chord-container")
      .dispatchEvent(new TouchEvent("touchend"));

    expect(touchendMock).toHaveBeenCalled();
  });
  test("touchmove calls handler function", () => {
    const touchmoveMock = jest.fn();
    eventBinders.bindTouchMove(touchmoveMock);

    document
      .querySelector("#chord-container")
      .dispatchEvent(new TouchEvent("touchmove"));

    expect(touchmoveMock).toHaveBeenCalled();
  });
  test("touchcancel calls handler function", () => {
    const touchcancelMock = jest.fn();
    eventBinders.bindTouchCancel(touchcancelMock);

    document
      .querySelector("#chord-container")
      .dispatchEvent(new TouchEvent("touchcancel"));

    expect(touchcancelMock).toHaveBeenCalled();
  });
  test("keydown calls handler function", () => {
    const keydownMock = jest.fn();
    eventBinders.bindKeyDown(keydownMock);

    document.dispatchEvent(new Event("keydown"));

    expect(keydownMock).toHaveBeenCalled();
  });
  test("keyup calls handler function", () => {
    const keyupMock = jest.fn();
    eventBinders.bindKeyUp(keyupMock);

    document.dispatchEvent(new Event("keyup"));

    expect(keyupMock).toHaveBeenCalled();
  });
});
