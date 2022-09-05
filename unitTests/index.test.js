const EventHandlers = require("../eventHandlers");

describe("setup", () => {
  it("creates instance of class EventHandlers", () => {
    const eventHandlers = new EventHandlers();

    expect(eventHandlers).toBeInstanceOf(EventHandlers);
  });
});
