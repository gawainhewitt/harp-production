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
        startscreen: document.querySelector("#startscreen")
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
        startscreen: document.querySelector("#startscreen")
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

    eventHandlers.mouseDown = true;
    eventHandlers.stringIsPlucked("mouse", "stringMock");

    expect(mockHarpSoundControlInstance.playNote).toHaveBeenCalledWith(
      "stringMock"
    );
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
});
