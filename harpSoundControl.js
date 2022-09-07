const Tone = require("./node_modules/tone");

class HarpSoundControl {
  constructor(Tone) {
    this.Tone = Tone;

    this.chordArray = [
      ["C3", "E3", "G3", "C4", "E4", "G4", "C5", "E5", "G5", "C6"],
      ["F3", "A3", "C4", "F4", "A4", "C5", "F5", "A5", "C6", "F6"],
      ["G3", "B3", "D4", "G4", "B4", "D5", "G5", "B5", "D6", "G6"]
    ];
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

  playNote = (whichString) => {
    this.sampler.triggerAttack(
      this.chordArray[whichString.chord][whichString.string],
      this.Tone.now()
    );
  };
}

module.exports = HarpSoundControl;
