const Tone = require("./node_modules/tone");

class HarpSoundControl {
  constructor(Tone) {
    this.Tone = Tone;
  }

  startAudio = async function () {
    await this.Tone.start();
    console.log("Audio Started");
  };

  setUpSampler = async function (callback) {
    this.sampler = new this.Tone.Sampler({
      urls: {
        C4: "Harp-C4.mp3"
      },
      baseUrl: "/sounds/",
      onload: () => {
        callback();
      }
    });

    this.reverb = new this.Tone.Reverb({
      decay: 3,
      predelay: 0,
      wet: 0.5
    }).toDestination();

    this.sampler.connect(this.reverb);

    this.sampler.set({
      release: 8,
      volume: -6
    });
  };
}

module.exports = HarpSoundControl;
