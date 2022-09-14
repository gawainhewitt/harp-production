class EventHandlers {
  constructor(eventBinders, harpSoundControl) {
    this.eventBinders = eventBinders;
    this.harpSoundControl = harpSoundControl;
    this.ongoingTouches = [];
    this.touchesOnElements = [];
    this.mouseEnterCount = 0;
    this.buttonCount = 0;
    this.mouseDown = false;

    this.harpSoundControl.setUpSampler(this.displayStartButton);
    this.chordButtonState = [true, true, true];
  }

  switchChords = (button, buttonId) => {
    const chordBlockClasses = [".one", ".two", ".three"];
    console.log(`button id = ${buttonId}`);
    this.chordButtonState[button] = !this.chordButtonState[button];
    console.log(this.chordButtonState);
    for (let i = 0; i < this.chordButtonState.length; i++) {
      if (this.chordButtonState[i]) {
        document.querySelector(chordBlockClasses[i]).style.display = "flex";
        // john suggesting I could instead create and destroy a class here rather than change the style
      } else {
        document.querySelector(chordBlockClasses[i]).style.display = "none";
      }
    }
  };

  displayStartButton() {
    this.eventBinders.bindStartScreen(this.hideStartScreen); // get this actioned once sounds have loaded
  }

  hideStartScreen() {
    this.harpSoundControl.startAudio();
    this.eventBinders.startscreen.style.display = "none";
  }

  stringIsPlucked = (type, whichString) => {
    if (type === "mouse") {
      if (this.mouseDown) {
        console.log(`type = ${type}`);
        this.harpSoundControl.playNote(whichString);
      }
    } else {
      console.log(`type = ${type}`);
      this.harpSoundControl.playNote(whichString);
    }
  };

  disableSelect = (e) => {
    e.preventDefault();
  };

  registerMouseDown = (e) => {
    this.disableSelect(e);
    this.mouseDown = true;
  };

  registerMouseUp = () => {
    this.mouseDown = false;
  };

  handleKeyDown = (e) => {
    let key = e.code;
    this.#whichKey(key);
    console.log("keydown " + key); //debugging
  };

  #whichKey = (key) => {
    // prettier-ignore
    const chords = [['KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP'], 
                    ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon'],
                    ['KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash']];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 10; j++) {
        if (key === chords[i][j]) {
          this.stringIsPlucked("key", { chord: i, string: j });
        }
      }
    }
  };
}

module.exports = EventHandlers;
