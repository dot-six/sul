const fs = require('fs');

const { Button, Window } = require('../dist');
const { Color, Vector2D } = require('../dist');

const WINDOW_WIDTH = 400;
const WINDOW_HEIGHT = 400;

const WINDOW_SIZE = new Vector2D(WINDOW_WIDTH, WINDOW_HEIGHT);
const WINDOW_TITLE = "Test";
const FPS_LIMIT = 30;

let win = new Window(WINDOW_SIZE, WINDOW_TITLE);

win.init();
win.set_fps_limit(FPS_LIMIT);

/////////////////////////////
// Button
/////////////////////////////
let font = fs.readFileSync("C:/Windows/Fonts/segoeui.ttf");
let button = new Button("Click Me");
button.set_font(font);
button.position = new Vector2D(50, 50);
button.foreground_color = new Color(0, 0, 0);
button.background_color = new Color(0, 255, 0);
button.font_size = 16;

let i = 0;

button.on_click((e) => {
	console.log(">>> Clicked");
	button.text = ++i % 2 ? "Clicked!" : "Click Me";
});

win.add_child(button);
win.loop();
