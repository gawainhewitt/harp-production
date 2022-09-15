const fs = require("fs");
const html = fs.readFileSync("./index.html");
document.documentElement.innerHTML = html;

const EventBinders = require("../../eventBinders");
const EventHandlers = require("../../eventHandlers");
const HarpSoundControl = require("../../harpSoundControl");

jest.mock("../../harpSoundControl");
jest.mock("../../eventBinders");

beforeEach(() => {
  EventBinders.mockClear();
  HarpSoundControl.mockClear();
});

describe("setup", () => {
  test("constructor sets up class instances correctly", () => {
    const harpSoundControl = new HarpSoundControl();
    const eventBinders = new EventBinders();
    const eventHandlers = new EventHandlers(eventBinders, harpSoundControl);

    expect(eventHandlers.harpSoundControl).toBeInstanceOf(HarpSoundControl);
    expect(eventHandlers.eventBinders).toBeInstanceOf(EventBinders);
  });

  it("constructor calls setUpSampler", () => {
    const harpSoundControl = new HarpSoundControl();
    const eventBinders = new EventBinders();
    const eventHandlers = new EventHandlers(eventBinders, harpSoundControl);

    const mockHarpSoundControlInstance = HarpSoundControl.mock.instances[0];

    expect(mockHarpSoundControlInstance.setUpSampler).toHaveBeenCalledWith(
      eventHandlers.displayStartButton
    );
  });
});

describe("handlers", () => {
  test("displayStartButton calls bindStartScreen", () => {
    const harpSoundControl = new HarpSoundControl();
    const eventBinders = new EventBinders();
    const eventHandlers = new EventHandlers(eventBinders, harpSoundControl);

    const mockEventBinders = EventBinders.mock.instances[0];

    eventHandlers.displayStartButton();

    expect(mockEventBinders.bindStartScreen).toHaveBeenCalledWith(
      eventHandlers.hideStartScreen
    );
  });
  test("switchcords toggles css display", () => {
    const harpSoundControl = new HarpSoundControl();
    const eventBinders = new EventBinders();
    const eventHandlers = new EventHandlers(eventBinders, harpSoundControl);

    eventHandlers.switchChords(1, "poodle");

    expect(document.querySelector(".two").style.display).toEqual("none");

    eventHandlers.switchChords(1, "oxen");
    eventHandlers.switchChords(0, "fox");

    expect(document.querySelector(".two").style.display).toEqual("flex");
    expect(document.querySelector(".one").style.display).toEqual("none");
  });

  test("hideStartScreen calls harpSoundcontrol.startAudio", () => {
    const harpSoundControl = new HarpSoundControl();
    EventBinders.mockImplementationOnce(() => {
      return {
        startscreen: document.querySelector("#startscreen"),
        bindMouseEnter: jest.fn(),
        bindSelectStart: jest.fn(),
        bindMouseDown: jest.fn(),
        bindMouseUp: jest.fn(),
        bindKeyDown: jest.fn(),
        bindKeyUp: jest.fn(),
        bindTouchStart: jest.fn(),
        bindTouchEnd: jest.fn(),
        bindTouchMove: jest.fn(),
        bindTouchCancel: jest.fn(),
        bindChordButtons: jest.fn()
      };
    });
    const eventBinders = new EventBinders();

    const eventHandlers = new EventHandlers(eventBinders, harpSoundControl);

    const mockHarpSoundControlInstance = HarpSoundControl.mock.instances[0];

    eventHandlers.hideStartScreen();

    expect(mockHarpSoundControlInstance.startAudio).toHaveBeenCalled();
  });
  test("hideStartScreen changes css display to none", () => {
    const harpSoundControl = new HarpSoundControl();
    EventBinders.mockImplementationOnce(() => {
      return {
        startscreen: document.querySelector("#startscreen"),
        bindMouseEnter: jest.fn(),
        bindSelectStart: jest.fn(),
        bindMouseDown: jest.fn(),
        bindMouseUp: jest.fn(),
        bindKeyDown: jest.fn(),
        bindKeyUp: jest.fn(),
        bindTouchStart: jest.fn(),
        bindTouchEnd: jest.fn(),
        bindTouchMove: jest.fn(),
        bindTouchCancel: jest.fn(),
        bindChordButtons: jest.fn()
      };
    });
    const eventBinders = new EventBinders();
    const eventHandlers = new EventHandlers(eventBinders, harpSoundControl);

    eventHandlers.hideStartScreen();

    expect(eventHandlers.eventBinders.startscreen.style.display).toEqual(
      "none"
    );
  });
  test("stringIsPlucked calls playNote if type is mouse and mouseDown", () => {
    const harpSoundControl = new HarpSoundControl();
    const eventBinders = new EventBinders();
    const eventHandlers = new EventHandlers(eventBinders, harpSoundControl);

    const mockHarpSoundControlInstance = HarpSoundControl.mock.instances[0];

    const myMock = {
      preventDefault: jest.fn()
    };

    eventHandlers.registerMouseDown(myMock);
    eventHandlers.stringIsPlucked("mouse", "stringMock");

    expect(mockHarpSoundControlInstance.playNote).toHaveBeenCalledWith(
      "stringMock"
    );

    eventHandlers.registerMouseUp();

    eventHandlers.stringIsPlucked("mouse", "stringMock");

    expect(mockHarpSoundControlInstance.playNote).toHaveBeenCalledTimes(1);
  });
  test("stringIsPlucked calls playNote if type is not mouse", () => {
    const harpSoundControl = new HarpSoundControl();
    const eventBinders = new EventBinders();
    const eventHandlers = new EventHandlers(eventBinders, harpSoundControl);

    const mockHarpSoundControlInstance = HarpSoundControl.mock.instances[0];

    eventHandlers.stringIsPlucked("touch", "stringMock2");

    expect(mockHarpSoundControlInstance.playNote).toHaveBeenCalledWith(
      "stringMock2"
    );
  });
  test("disableSelect calls parameter.preventDefault", () => {
    const harpSoundControl = new HarpSoundControl();
    const eventBinders = new EventBinders();
    const eventHandlers = new EventHandlers(eventBinders, harpSoundControl);

    const myMock = {
      preventDefault: jest.fn()
    };

    eventHandlers.disableSelect(myMock);

    expect(myMock.preventDefault).toHaveBeenCalled();
  });
  it("plays a note when a key is presses", () => {
    const harpSoundControl = new HarpSoundControl();
    const eventBinders = new EventBinders();
    const eventHandlers = new EventHandlers(eventBinders, harpSoundControl);

    const myMock = {
      code: "KeyA"
    };

    const spy = jest.spyOn(eventHandlers, "stringIsPlucked");

    eventHandlers.handleKeyDown(myMock);

    expect(spy).toHaveBeenCalledWith("key", { chord: 1, string: 0 });
  });
  it("note does not repeat when held down", () => {
    const harpSoundControl = new HarpSoundControl();
    const eventBinders = new EventBinders();
    const eventHandlers = new EventHandlers(eventBinders, harpSoundControl);

    const myMock = {
      code: "KeyD"
    };

    const spy = jest.spyOn(eventHandlers, "stringIsPlucked");

    eventHandlers.handleKeyDown(myMock);
    eventHandlers.handleKeyDown(myMock);

    expect(spy).toHaveBeenCalledWith("key", { chord: 1, string: 2 });
    expect(spy).toHaveBeenCalledTimes(1);

    eventHandlers.handleKeyUp(myMock);

    eventHandlers.handleKeyDown(myMock);

    expect(spy).toHaveBeenCalledTimes(2);
  });
  // it("plays a note when screen touched", () => {
  //   jest.mock("../../eventHandlers", () => {
  //     const originalModule = jest.requireActual("../../eventHandlers");

  //     return {
  //       __esModule: true,
  //       ...originalModule,
  //       showElement: jest.fn()
  //     };
  //   });

  //   const harpSoundControl = new HarpSoundControl();
  //   const eventBinders = new EventBinders();
  //   const eventHandlers = new EventHandlers(eventBinders, harpSoundControl);

  //   // const stringPosition = document
  //   //   .querySelector("#c0s0")
  //   //   .getBoundingClientRect();

  //   // console.log(stringPosition);

  //   const mockTouch = {
  //     identifier: "sportPants",
  //     clientX: 0,
  //     clientY: 0,
  //     preventDefault: jest.fn(),
  //     changedTouches: [{ identifier: "sportPants", clientX: 0, clientY: 0 }]
  //   };

  //   eventHandlers.handleTouchStart(mockTouch);
  // });

  // can't find a way to test further as document.elementFromPoint ends up being
  // called - and there is no layout in JSDOM, so this feature is not implemented
  // and therefore I can't test
});
