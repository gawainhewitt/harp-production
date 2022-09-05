const EventBinders = require("../eventBinders");
const EventHandlers = require("../eventHandlers");
const HarpSoundControl = require("../harpSoundControl");

describe("setup", () => {
  const eventBinders = new EventBinders();
  const harpSoundControl = new HarpSoundControl();
  const eventHandlers = new EventHandlers(eventBinders, harpSoundControl);

  it("creates instance of class EventBinders", () => {
    expect(eventBinders).toBeInstanceOf(EventBinders);
  });
  it("creates instance of class HarpSoundControl", () => {
    expect(harpSoundControl).toBeInstanceOf(HarpSoundControl);
  });
  it("creates instance of class EventHandlers", () => {
    expect(eventHandlers).toBeInstanceOf(EventHandlers);
  });
  test("eventHandlers to have eventBinders injected", () =>
    expect(eventHandlers.eventBinders).toBeInstanceOf(EventBinders));
});
