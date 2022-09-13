const EventBinders = require("../../eventBinders");
const EventHandlers = require("../../eventHandlers");
const HarpSoundControl = require("../../harpSoundControl");

jest.mock("../../harpSoundControl");
jest.mock("../../eventBinders");

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  EventBinders.mockClear();
  HarpSoundControl.mockClear();
});

test("constructor sets up class instances correctly", () => {
  const harpSoundControl = new HarpSoundControl();
  const eventBinders = new EventBinders();
  const eventHandlers = new EventHandlers(eventBinders, harpSoundControl);

  expect(HarpSoundControl).toHaveBeenCalledTimes(1);
  expect(EventBinders).toHaveBeenCalledTimes(1);
  expect(eventHandlers.harpSoundControl).toBeInstanceOf(HarpSoundControl);
  expect(eventHandlers.eventBinders).toBeInstanceOf(EventBinders);
});

it("constructor calls setUpSampler", () => {
  const harpSoundControl = new HarpSoundControl();
  const eventBinders = new EventBinders();
  const eventHandlers = new EventHandlers(eventBinders, harpSoundControl);

  const mockHarpSoundControlInstance = HarpSoundControl.mock.instances[0];

  expect(mockHarpSoundControlInstance.setUpSampler).toHaveBeenCalled();
});
