const HarpSoundControl = require("../harpSoundControl");

describe("setup audio", () => {
  it("console logs 'Audio Started' once audio is started", async () => {
    const logSpy = jest.spyOn(console, "log");
    const harpSoundControl = new HarpSoundControl();

    await harpSoundControl.startAudio();

    expect(logSpy).toHaveBeenCalledWith("Audio Started");
  });
});
