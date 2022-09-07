const HarpSoundControl = require("../harpSoundControl");

describe("setup audio", () => {
  const FakeTone = {
    start: async function () {
      setTimeout(() => {}, 200);
    },
    Sampler: class {
      constructor(params) {}
      connect = () => {
        return "daschunds rule!";
      };
      set = () => {};
    },
    Reverb: class {
      constructor(params) {}
      toDestination = () => {
        return "blah";
      };
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
  it("creates reverb", () => expect(harpSoundControl.reverb).toEqual("blah"));
});
