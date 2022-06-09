const fs = require('fs');

const { Rectangle, Text, Window } = require('../dist');
const { Color, Vector2D } = require('../dist');

const WINDOW_WIDTH = 400;
const WINDOW_HEIGHT = 400;

const WINDOW_SIZE = new Vector2D(WINDOW_WIDTH, WINDOW_HEIGHT);
const WINDOW_TITLE = "Test";
const FPS_LIMIT = 30;

let win = new Window(WINDOW_SIZE, WINDOW_TITLE);

win.init();
win.set_fps_limit(FPS_LIMIT);

let i = 0;

function createRect(posX, posY) {
	let rect = new Rectangle();
	rect.size = new Vector2D(200, 200);
	rect.fill = new Color(100 * i, 0, 0);
	rect.position = new Vector2D(posX, posY);

	win.add_child(rect);
	i++;
}

function createText(posX, posY) {
	let font = fs.readFileSync('C:/Windows/Fonts/segoeui.ttf');
	let text = new Text();
	text.text = "Testing";
	text.fill = new Color(0, 0, 100 * i);
	text.position = new Vector2D(posX, posY);
	text.set_font(font);

	win.add_child(text);
	i++;
}

createRect(90, 90);
createRect(100, 100);

createText(150, 150);

win.loop();
