const fs = require("fs");
const html = fs.readFileSync("./index.html");
document.documentElement.innerHTML = html;

const EventBinders = require("../../eventBinders");

describe("bindChordButtons", () => {
  test("chord buttons call handler function", () => {
    const eventBinders = new EventBinders();

    let zerochordbutton = document.querySelector("#zerochordbutton");
    let onechordbutton = document.querySelector("#onechordbutton");
    let twochordbutton = document.querySelector("#twochordbutton");
    const chordMock = jest.fn();

    eventBinders.bindChordButtons(chordMock);
    zerochordbutton.click();
    onechordbutton.click();
    twochordbutton.click();

    expect(chordMock).toHaveBeenCalledWith(0);
    expect(chordMock).toHaveBeenCalledWith(1);
    expect(chordMock).toHaveBeenCalledWith(2);
  });
});

describe("bindStartScreen", () => {
  test("calls handler function", () => {
    const eventBinders = new EventBinders();

    let startscreen = document.querySelector("#startscreen");
    const startScreenMock = jest.fn();

    eventBinders.bindStartScreen(startScreenMock);
    startscreen.click();

    expect(startScreenMock).toHaveBeenCalled();
  });
});

describe("bindOptionScreen", () => {
  test("calls handler function", () => {
    const eventBinders = new EventBinders();

    let optionscreen = document.querySelector("#optionscreen");
    const optionScreenMock = jest.fn();

    eventBinders.bindOptionScreen(optionScreenMock);
    optionscreen.click();

    expect(optionScreenMock).toHaveBeenCalled();
  });
});

describe("bindMouseEnter", () => {
  test("strings call handler function when mouse enters", () => {
    const eventBinders = new EventBinders();

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
});

describe("bindSelectStart", () => {
  test("calls handler function", () => {
    const eventBinders = new EventBinders();

    const selectstartMock = jest.fn();
    eventBinders.bindSelectStart(selectstartMock);

    document.dispatchEvent(new Event("selectstart"));

    expect(selectstartMock).toHaveBeenCalled();
  });
});

describe("bindMouseDown", () => {
  test("calls handler function", () => {
    const eventBinders = new EventBinders();

    const mousedownMock = jest.fn();
    eventBinders.bindMouseDown(mousedownMock);

    document.dispatchEvent(new MouseEvent("mousedown"));

    expect(mousedownMock).toHaveBeenCalled();
  });
});

describe("bindMouseUp", () => {
  test("calls handler function", () => {
    const eventBinders = new EventBinders();

    const mouseupMock = jest.fn();
    eventBinders.bindMouseUp(mouseupMock);

    document.dispatchEvent(new MouseEvent("mouseup"));

    expect(mouseupMock).toHaveBeenCalled();
  });
});

describe("bindTouchStart", () => {
  test("calls handler function", () => {
    const eventBinders = new EventBinders();

    const touchstartMock = jest.fn();
    eventBinders.bindTouchStart(touchstartMock);

    document
      .querySelector("#chord-container")
      .dispatchEvent(new TouchEvent("touchstart"));

    expect(touchstartMock).toHaveBeenCalled();
  });
});

describe("bindTouchEnd", () => {
  test("calls handler function", () => {
    const eventBinders = new EventBinders();

    const touchendMock = jest.fn();
    eventBinders.bindTouchEnd(touchendMock);

    document
      .querySelector("#chord-container")
      .dispatchEvent(new TouchEvent("touchend"));

    expect(touchendMock).toHaveBeenCalled();
  });
});

describe("bindTouchend", () => {
  test("calls handler function", () => {
    const eventBinders = new EventBinders();

    const touchendMock = jest.fn();
    eventBinders.bindTouchEnd(touchendMock);

    document
      .querySelector("#chord-container")
      .dispatchEvent(new TouchEvent("touchend"));

    expect(touchendMock).toHaveBeenCalled();
  });
});

describe("bindTouchMove", () => {
  test("calls handler function", () => {
    const eventBinders = new EventBinders();

    const touchmoveMock = jest.fn();
    eventBinders.bindTouchMove(touchmoveMock);

    document
      .querySelector("#chord-container")
      .dispatchEvent(new TouchEvent("touchmove"));

    expect(touchmoveMock).toHaveBeenCalled();
  });
});

describe("bindTouchCancel", () => {
  test("calls handler function", () => {
    const eventBinders = new EventBinders();

    const touchcancelMock = jest.fn();
    eventBinders.bindTouchCancel(touchcancelMock);

    document
      .querySelector("#chord-container")
      .dispatchEvent(new TouchEvent("touchcancel"));

    expect(touchcancelMock).toHaveBeenCalled();
  });
});

describe("bindKeyDown", () => {
  test("calls handler function", () => {
    const eventBinders = new EventBinders();

    const keydownMock = jest.fn();
    eventBinders.bindKeyDown(keydownMock);

    document.dispatchEvent(new Event("keydown"));

    expect(keydownMock).toHaveBeenCalled();
  });
});

describe("bindKeyUp", () => {
  const eventBinders = new EventBinders();

  test("calls handler function", () => {
    const keyupMock = jest.fn();
    eventBinders.bindKeyUp(keyupMock);

    document.dispatchEvent(new Event("keyup"));

    expect(keyupMock).toHaveBeenCalled();
  });
});

describe("bindOptionsButton", () => {
  test("call handler function", () => {
    const eventBinders = new EventBinders();

    let optionsbutton = document.querySelector("#optionsbutton");

    const optionsMock = jest.fn();

    eventBinders.bindOptionsButton(optionsMock);
    optionsbutton.click();

    expect(optionsMock).toHaveBeenCalled();
  });
});
