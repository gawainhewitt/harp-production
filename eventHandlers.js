class EventHandlers {
  constructor(eventBinders, harpSoundControl, cssManager) {
    this.eventBinders = eventBinders;
    this.harpSoundControl = harpSoundControl;
    this.cssManager = cssManager;

    this.cssManager.setInitialClass();

    this.ongoingTouches = [];
    this.touchesOnElements = [];
    this.mouseEnterCount = 0;
    this.buttonCount = 0;
    this.mouseDown = false;

    // for (const property in binders) {
    //   const handler = this[binders[property]]
    //   this.eventBinder[property] = handler
    // }

    // [].forEach((el) => {

    // }) From John

    this.eventBinders.bindMouseEnter(this.stringIsPlucked);
    this.eventBinders.bindSelectStart(this.disableSelect);
    this.eventBinders.bindMouseDown(this.registerMouseDown);
    this.eventBinders.bindMouseUp(this.registerMouseUp);
    this.eventBinders.bindKeyDown(this.handleKeyDown);
    this.eventBinders.bindKeyUp(this.handleKeyUp);
    this.eventBinders.bindTouchStart(this.handleTouchStart);
    this.eventBinders.bindTouchEnd(this.#handleTouchEnd);
    this.eventBinders.bindTouchMove(this.#handleTouchMove);
    this.eventBinders.bindTouchCancel(this.#handleCancel);
    this.harpSoundControl.setUpSampler(this.displayStartButton);
    this.eventBinders.bindChordButtons(this.switchChords);
    this.chordButtonState = [true, true, true];
    this.keyIsDown = {};
  }

  switchChords = (button) => {
    this.chordButtonState[button] = !this.chordButtonState[button];
    console.log(this.chordButtonState);
    console.log(button, this.chordButtonState[button]);
    this.cssManager.switchChords(button, this.chordButtonState[button]);
  };

  displayStartButton = () => {
    this.eventBinders.bindStartScreen(this.hideStartScreen);
    document.querySelector("#startbutton").innerHTML = "Start";
  };

  hideStartScreen = () => {
    console.log("click");
    this.harpSoundControl.startAudio();
    this.eventBinders.startscreen.style.display = "none";
  };

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
    if (key in this.keyIsDown === false) {
      this.keyIsDown[key] = true;
      this.#whichKey(key);
      // console.log("keydown " + key); //debugging
    }
  };

  handleKeyUp = (e) => {
    let key = e.code;
    delete this.keyIsDown[key];
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

  handleTouchStart = (e) => {
    e.preventDefault();
    console.log("touch start");
    let touches = e.changedTouches;
    // console.log(touches);
    this.ongoingTouches.push(this.#copyTouch(touches[0]));
    // console.log(this.ongoingTouches);
    this.#showElement(this.ongoingTouches);
  };

  #handleTouchEnd = (e) => {
    e.preventDefault();
    let touches = e.changedTouches;
    // console.log("touch end");

    for (let i = 0; i < touches.length; i++) {
      let idx = this.#ongoingTouchIndexById(touches[i].identifier);
      if (idx >= 0) {
        // did we get a match?
        console.log("touchend " + idx);
        this.ongoingTouches.splice(idx, 1); // remove it; we're done
      } else {
        // no match
        console.log("can't figure out which touch to end");
      }
      for (let j = 0; j < this.touchesOnElements.length; j++) {
        if (this.touchesOnElements[j].touch_id === touches[i].identifier) {
          this.touchesOnElements.splice(j, 1);
        }
      }
    }
  };

  #handleTouchMove = (e) => {
    e.preventDefault();
    console.log("touch move");
    let touches = e.changedTouches;
    for (let i = 0; i < touches.length; i++) {
      let idx = this.#ongoingTouchIndexById(touches[i].identifier);
      if (idx >= 0) {
        // did we get a match?
        this.ongoingTouches.splice(idx, 1, this.#copyTouch(touches[i]));
        // console.log(this.#copyTouch(touches[i]));
      } else {
        // no match
        console.log("can't figure out which touch to continue");
      }
    }
    this.#showElement(this.ongoingTouches);
  };

  #handleCancel = (e) => {
    e.preventDefault();
    console.log("touchcancel.");
    let touches = e.changedTouches;

    for (let i = 0; i < touches.length; i++) {
      let idx = this.ongoingTouchIndexById(touches[i].identifier);
      this.ongoingTouches.splice(idx, 1); // remove it; we're done
    }
  };

  #copyTouch = ({ identifier, clientX, clientY }) => {
    return { identifier, clientX, clientY };
  };

  #ongoingTouchIndexById = (idToFind) => {
    for (let i = 0; i < this.ongoingTouches.length; i++) {
      let id = this.ongoingTouches[i].identifier;
      if (id == idToFind) {
        return i;
      }
    }
    return -1; // not found
  };

  #showElement = () => {
    for (let i = 0; i < this.ongoingTouches.length; i++) {
      let el = document.elementFromPoint(
        this.ongoingTouches[i].clientX,
        this.ongoingTouches[i].clientY
      );
      // console.log(`element = ${el.id}`);

      if (this.#isNewTouchOnElement(i, el.id)) {
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 10; j++) {
            if (el.id === `c${i}s${j}`) {
              this.stringIsPlucked("touch", { chord: i, string: j });
            }
          }
        }
      }
    }
  };

  #isNewTouchOnElement = (idx, el_id) => {
    // console.log(`length of this touches on elements = ${this.touchesOnElements.length}`)
    for (let i = 0; i < this.touchesOnElements.length; i++) {
      // console.log(`touches on elements ${i} ${this.touchesOnElements[i]}`);
      if (
        this.touchesOnElements[i].touch_id ===
        this.ongoingTouches[idx].identifier
      ) {
        if (this.touchesOnElements[i].element_id === el_id) {
          // console.log("already on element");
          return false;
        } else {
          // console.log("same touch new element");
          this.touchesOnElements.splice(i, 1, {
            touch_id: this.ongoingTouches[idx].identifier,
            element_id: el_id
          });
          return true;
        }
      }
    }
    this.touchesOnElements.push({
      touch_id: this.ongoingTouches[idx].identifier,
      element_id: el_id
    });
    return true;
  };
}

module.exports = EventHandlers;
