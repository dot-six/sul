const fs = require('fs');

const { Text, Window } = require('../dist');
const { Color, Vector2D } = require('../dist');

const WINDOW_WIDTH = 400;
const WINDOW_HEIGHT = 400;

const WINDOW_SIZE = new Vector2D(WINDOW_WIDTH, WINDOW_HEIGHT);
const WINDOW_TITLE = "Test";
const FPS_LIMIT = 30;

let win = new Window(WINDOW_SIZE, WINDOW_TITLE);

win.init();
win.set_fps_limit(FPS_LIMIT);

let font = fs.readFileSync("C:/Windows/Fonts/segoeui.ttf");
let text = new Text("Hello world", font);
text.fill = new Color(0, 0, 0);

// TODO: We have issue with text initialization usage like this:
//let text = new Text("Hello world", fs.readFileSync("C:/Windows/Fonts/segoeui.ttf"));

win.add_child(text);

win.loop();
