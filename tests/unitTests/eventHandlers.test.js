const fs = require("fs");
const html = fs.readFileSync("./index.html");
document.documentElement.innerHTML = html;

const EventBinders = require("../../eventBinders");
const EventHandlers = require("../../eventHandlers");
const HarpSoundControl = require("../../harpSoundControl");
const CssManager = require("../../cssManager");

jest.mock("../../harpSoundControl");
jest.mock("../../eventBinders");
jest.mock("../../cssManager");

beforeEach(() => {
  EventBinders.mockClear();
  HarpSoundControl.mockClear();
  CssManager.mockClear();
});

describe("constructor", () => {
  test("sets up class instances correctly", () => {
    const harpSoundControl = new HarpSoundControl();
    const eventBinders = new EventBinders();
    const cssManager = new CssManager();
    const eventHandlers = new EventHandlers(
      eventBinders,
      harpSoundControl,
      cssManager
    );

    expect(eventHandlers.harpSoundControl).toBeInstanceOf(HarpSoundControl);
    expect(eventHandlers.eventBinders).toBeInstanceOf(EventBinders);
  });

  it("calls setUpSampler", () => {
    const harpSoundControl = new HarpSoundControl();
    const eventBinders = new EventBinders();
    const cssManager = new CssManager();
    const eventHandlers = new EventHandlers(
      eventBinders,
      harpSoundControl,
      cssManager
    );

    const mockHarpSoundControlInstance = HarpSoundControl.mock.instances[0];

    expect(mockHarpSoundControlInstance.setUpSampler).toHaveBeenCalledWith(
      eventHandlers.displayStartButton
    );
  });
});

describe("switchChords", () => {
  test("switchcords toggles css display", () => {
    const harpSoundControl = new HarpSoundControl();
    const eventBinders = new EventBinders();
    const cssManager = new CssManager();
    const eventHandlers = new EventHandlers(
      eventBinders,
      harpSoundControl,
      cssManager
    );

    const mockCssManager = CssManager.mock.instances[0];

    eventHandlers.switchChords(1, document.querySelector("#onechordbutton"));

    expect(mockCssManager.switchChords).toHaveBeenCalled();
  });
});

describe("enterOptionScreen", () => {
  test("makes option screen visible", () => {
    const harpSoundControl = new HarpSoundControl();
    const eventBinders = new EventBinders();
    const cssManager = new CssManager();
    const eventHandlers = new EventHandlers(
      eventBinders,
      harpSoundControl,
      cssManager
    );

    const mockCssManager = CssManager.mock.instances[0];

    eventHandlers.enterOptionScreen();

    expect(mockCssManager.optionsVisible).toHaveBeenCalled();
  });
});

describe("leaveOptionScreen", () => {
  test("makes option screen visible", () => {
    const harpSoundControl = new HarpSoundControl();
    const eventBinders = new EventBinders();
    const cssManager = new CssManager();
    const eventHandlers = new EventHandlers(
      eventBinders,
      harpSoundControl,
      cssManager
    );

    const mockCssManager = CssManager.mock.instances[0];

    eventHandlers.leaveOptionScreen();

    expect(mockCssManager.optionsInvisible).toHaveBeenCalled();
  });
});

describe("displayStartButton", () => {
  test("calls bindStartScreen", () => {
    const harpSoundControl = new HarpSoundControl();
    const eventBinders = new EventBinders();
    const cssManager = new CssManager();
    const eventHandlers = new EventHandlers(
      eventBinders,
      harpSoundControl,
      cssManager
    );

    const mockEventBinders = EventBinders.mock.instances[0];

    eventHandlers.displayStartButton();

    expect(mockEventBinders.bindStartScreen).toHaveBeenCalledWith(
      eventHandlers.start
    );
  });
});

describe("start", () => {
  test("calls harpSoundcontrol.startAudio", () => {
    const harpSoundControl = new HarpSoundControl();
    const eventBinders = new EventBinders();

    const cssManager = new CssManager();
    const eventHandlers = new EventHandlers(
      eventBinders,
      harpSoundControl,
      cssManager
    );

    const mockHarpSoundControlInstance = HarpSoundControl.mock.instances[0];

    eventHandlers.start();

    expect(mockHarpSoundControlInstance.startAudio).toHaveBeenCalled();
  });
  test("hides start screen", () => {
    const harpSoundControl = new HarpSoundControl();
    const eventBinders = new EventBinders();
    const cssManager = new CssManager();
    const eventHandlers = new EventHandlers(
      eventBinders,
      harpSoundControl,
      cssManager
    );

    const mockCssManagerInstance = CssManager.mock.instances[0];

    eventHandlers.start();

    expect(mockCssManagerInstance.hideStart).toHaveBeenCalled();
  });
});

describe("stringIsPlucked", () => {
  test("calls playNote if type is mouse && mouseDown && in main screen", () => {
    const harpSoundControl = new HarpSoundControl();
    const eventBinders = new EventBinders();
    const cssManager = new CssManager();
    const eventHandlers = new EventHandlers(
      eventBinders,
      harpSoundControl,
      cssManager
    );
    const optionscreen = document.querySelector("#optionscreen");
    optionscreen.className = "invisible";
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
  test("calls playNote if type is not mouse", () => {
    const harpSoundControl = new HarpSoundControl();
    const eventBinders = new EventBinders();
    const cssManager = new CssManager();
    const eventHandlers = new EventHandlers(
      eventBinders,
      harpSoundControl,
      cssManager
    );

    const mockHarpSoundControlInstance = HarpSoundControl.mock.instances[0];

    eventHandlers.stringIsPlucked("touch", "stringMock2");

    expect(mockHarpSoundControlInstance.playNote).toHaveBeenCalledWith(
      "stringMock2"
    );
  });
});

describe("disableSelect", () => {
  test("calls parameter.preventDefault", () => {
    const harpSoundControl = new HarpSoundControl();
    const eventBinders = new EventBinders();
    const cssManager = new CssManager();
    const eventHandlers = new EventHandlers(
      eventBinders,
      harpSoundControl,
      cssManager
    );

    const myMock = {
      preventDefault: jest.fn()
    };

    eventHandlers.disableSelect(myMock);

    expect(myMock.preventDefault).toHaveBeenCalled();
  });
});

describe("handleKeyDown and handleKeyUp", () => {
  it("plays a note when a key is presses", () => {
    const harpSoundControl = new HarpSoundControl();
    const eventBinders = new EventBinders();
    const cssManager = new CssManager();
    const eventHandlers = new EventHandlers(
      eventBinders,
      harpSoundControl,
      cssManager
    );

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
    const cssManager = new CssManager();
    const eventHandlers = new EventHandlers(
      eventBinders,
      harpSoundControl,
      cssManager
    );

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
// const cssManager = new CssManager(); //
// const eventHandlers = new EventHandlers(
//   eventBinders,
//   harpSoundControl,
//   cssManager
// );

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
