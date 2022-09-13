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
});
