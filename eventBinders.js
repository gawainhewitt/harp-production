class EventBinders {
  constructor() {
    this.stringsArray = [];
    for (let i = 0; i < 3; i++) {
      this.stringsArray[i] = [];
      for (let j = 0; j < 10; j++) {
        this.stringsArray[i][j] = document.querySelector(`#c${i}s${j}`);
      }
    }
    this.chordContainer = document.querySelector("#chord-container");
    this.startscreen = document.querySelector("#startscreen");
    this.optionsButton = document.querySelector("#optionsbutton");
    this.zerochordbutton = document.querySelector("#zerochordbutton");
    this.onechordbutton = document.querySelector("#onechordbutton");
    this.twochordbutton = document.querySelector("#twochordbutton");
  }

  bindChordButtons(handler) {
    this.zerochordbutton.addEventListener("click", () => {
      handler(0);
    });
    this.onechordbutton.addEventListener("click", () => {
      handler(1);
    });
    this.twochordbutton.addEventListener("click", () => {
      handler(2);
    });
  }

  bindStartScreen(handler) {
    this.startscreen.addEventListener("click", () => {
      handler();
    });
  }

  bindMouseEnter(handler) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 10; j++) {
        this.stringsArray[i][j].addEventListener("mouseenter", () => {
          handler("mouse", { chord: i, string: j });
        });
      }
    }
  }

  bindSelectStart(handler) {
    document.addEventListener("selectstart", (e) => {
      handler(e);
    });
  }

  bindMouseDown(handler) {
    document.addEventListener("mousedown", (e) => {
      handler(e);
    });
  }

  bindMouseUp(handler) {
    document.addEventListener("mouseup", (e) => {
      handler(e);
    });
  }

  bindTouchStart(handler) {
    this.chordContainer.addEventListener("touchstart", handler);
  }

  bindTouchEnd(handler) {
    this.chordContainer.addEventListener("touchend", handler);
  }

  bindTouchMove(handler) {
    this.chordContainer.addEventListener("touchmove", handler);
  }

  bindTouchCancel(handler) {
    this.chordContainer.addEventListener("touchcancel", handler);
  }

  bindKeyDown(handler) {
    document.addEventListener("keydown", handler);
  }

  bindKeyUp(handler) {
    document.addEventListener("keyup", handler);
  }

  bindOptionsButton(handler) {
    this.optionsButton.addEventListener("click", handler);
  }
}

module.exports = EventBinders;
