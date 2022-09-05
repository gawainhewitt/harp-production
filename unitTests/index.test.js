const EventBinders = require("../eventBinders");
const EventHandlers = require("../eventHandlers");
const HarpSoundControl = require("../harpSoundControl");

describe("setup", () => {
  it("creates instance of class EventBinders", () => {
    const eventBinders = new EventBinders();

    expect(eventBinders).toBeInstanceOf(EventBinders);
  });
  it("creates instance of class HarpSoundControl", () => {
    const harpSoundControl = new HarpSoundControl();

    expect(harpSoundControl).toBeInstanceOf(HarpSoundControl);
  });
  it("creates instance of class EventHandlers", () => {
    const eventHandlers = new EventHandlers();

    expect(eventHandlers).toBeInstanceOf(EventHandlers);
  });
});
