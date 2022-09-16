const Tone = require("./node_modules/tone");

const EventBinders = require("./eventBinders");
const EventHandlers = require("./eventHandlers");
const HarpSoundControl = require("./harpSoundControl");
const CssManager = require("./cssManager");

const eventBinders = new EventBinders();
const harpSoundControl = new HarpSoundControl(Tone);
const cssManager = new CssManager();
const eventHandlers = new EventHandlers(
  eventBinders,
  harpSoundControl,
  cssManager
);
