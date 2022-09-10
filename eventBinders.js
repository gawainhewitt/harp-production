class EventBinders {
  constructor() {
    this.stringsArray = [];
    for (let i = 0; i < 3; i++) {
      this.stringsArray[i] = [];
      for (let j = 0; j < 10; j++) {
        this.stringsArray[i][j] = document.querySelector(`#c${i}s${j}`);
      }
    }
    this.middlebox = document.querySelector("#middle-box");
    this.startscreen = document.querySelector("#startscreen");
    this.onechord = document.querySelector("#onechord");
    this.twochord = document.querySelector("#twochord");
    this.threechord = document.querySelector("#threechord");
  }

  bindChordButtons(handler) {
    this.onechord.addEventListener("click", () => {
      handler(0, "#onechord");
    });
    this.twochord.addEventListener("click", () => {
      handler(1, "#twochord");
    });
    this.threechord.addEventListener("click", () => {
      handler(2, "#threechord");
    });
  }

  bindStartScreen(handler) {
    this.startscreen.addEventListener("click", () => {
      handler();
    });
  }
}

module.exports = EventBinders;
