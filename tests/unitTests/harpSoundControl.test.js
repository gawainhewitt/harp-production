const HarpSoundControl = require("../../harpSoundControl");

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
    triggerAttack = (note, time) => {
      this.theNote = note;
    };
  },
  Reverb: class {
    constructor(params) {}
    toDestination = () => {
      return "blah";
    };
  },
  now: () => {}
};

describe("setup audio", () => {
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
  it("connect's sampler to reverb", () =>
    expect(harpSoundControl.sampler.connect()).toEqual("daschunds rule!"));
});

describe("making a sound", () => {
  const harpSoundControl = new HarpSoundControl(FakeTone);

  it("plays a note", () => {
    harpSoundControl.setUpSampler();

    harpSoundControl.playNote({ chord: 0, string: 3 });
    expect(harpSoundControl.sampler.theNote).toEqual("G4");
  });
});
