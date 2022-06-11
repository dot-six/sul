const { readFileSync } = require('fs');

const { TextInput, Window } = require('../dist');
const { Color, Vector2D } = require('../dist');

const WINDOW_WIDTH = 400;
const WINDOW_HEIGHT = 400;

const WINDOW_SIZE = new Vector2D(WINDOW_WIDTH, WINDOW_HEIGHT);
const WINDOW_TITLE = "Test";
const FPS_LIMIT = 30;

let win = new Window(WINDOW_SIZE, WINDOW_TITLE);

win.init();
win.set_fps_limit(FPS_LIMIT);

const Fonts = {
	SegoeUI: readFileSync("C:/Windows/Fonts/segoeui.ttf")
};

let input = new TextInput();
input.set_font(Fonts.SegoeUI);
input.position = new Vector2D(50, 50);
input.border_color = new Color(0, 0, 0);
input.size = new Vector2D(100, -1);

//input.on_click(console.log);
input.on_input(console.log);
console.log(input.get_region());

win.add_child(input);

win.loop();
