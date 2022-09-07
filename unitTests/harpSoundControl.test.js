const HarpSoundControl = require("../harpSoundControl");

describe("setup audio", () => {
  const FakeTone = {
    start: async function () {
      setTimeout(() => {}, 200);
    },
    Sampler: class {
      constructor(params) {}
      connect = () => {};
      set = () => {};
    },
    Reverb: class {
      constructor(params) {}
      toDestination = () => {};
    }
  };

  const harpSoundControl = new HarpSoundControl(FakeTone);

  it("console logs 'Audio Started' once audio is started", async () => {
    const logSpy = jest.spyOn(console, "log");

    await harpSoundControl.startAudio();

    expect(logSpy).toHaveBeenCalledWith("Audio Started");
  });
  it("creates sampler", () => {
    harpSoundControl.setUpSampler();

    expect(harpSoundControl.sampler).toBeInstanceOf(FakeTone.Sampler);
  });
});
