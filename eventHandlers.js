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
  }

  displayStartButton() {
    this.eventBinders.bindStartScreen(this.hideStartScreen); // get this actioned once sounds have loaded
  }

  hideStartScreen() {}
}

module.exports = EventHandlers;
