const Tone = require("./node_modules/tone");

class HarpSoundControl {
  startAudio = async function () {
    await Tone.start();
    console.log("Audio Started");
  };
}

module.exports = HarpSoundControl;
