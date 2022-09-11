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

test("constructor", () => {
  const harpSoundControl = new HarpSoundControl();
  const eventBinders = new EventBinders();
  const eventHandlers = new EventHandlers(eventBinders, harpSoundControl);

  expect(HarpSoundControl).toHaveBeenCalled();
  expect(EventBinders).toHaveBeenCalled();
});

it("mockClear is working", () => {
  expect(HarpSoundControl).not.toHaveBeenCalled();
  expect(EventBinders).not.toHaveBeenCalled();
});
