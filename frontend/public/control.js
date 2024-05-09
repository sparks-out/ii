const robot = require("robotjs");
const { keyboard } = require("@nut-tree/nut-js");

const move = 40;
let keyboardListener = null;
let listenerActive = false;

class MouseController {
  constructor() {}

  start() {
    keyboardListener = keyboard.addListener(async (key) => {
      switch (key) {
        case keyboard.Key.Up:
          robot.moveMouse(robot.getMousePos().x, robot.getMousePos().y - move);
          break;
        case keyboard.Key.Down:
          robot.moveMouse(robot.getMousePos().x, robot.getMousePos().y + move);
          break;
        case keyboard.Key.Left:
          robot.moveMouse(robot.getMousePos().x - move, robot.getMousePos().y);
          break;
        case keyboard.Key.Right:
          robot.moveMouse(robot.getMousePos().x + move, robot.getMousePos().y);
          break;
        case keyboard.Key.Enter:
          robot.mouseClick();
          break;
        case keyboard.Key.Esc:
          await this.stop();
          console.log("Program terminated.");
          break;
        default:
          break;
      }
    });
  }

  async stop() {
    await keyboardListener.stop();
    listenerActive = false;
  }
}

console.log("Listener not started yet.");

export function startListener() {
  console.log("Starting listener");
  const controller = new MouseController();
  controller.start();
  listenerActive = true;
}

export function stopListener() {
  if (keyboardListener) {
    keyboardListener.stop();
    console.log("Listener stopped.");
    listenerActive = false;
  }
}

function toggleListener() {
  if (listenerActive) {
    stopListener();
  } else {
    startListener();
  }
}

function startListener() {
  console.log("Starting listener");
  const controller = new MouseController();
  controller.start();
  listenerActive = true;
}

function stopListener() {
  if (keyboardListener) {
    keyboardListener.stop();
    console.log("Listener stopped.");
    listenerActive = false;
  }
}

keyboard.addShortcuts({
  'F5': toggleListener
});
