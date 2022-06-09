const fs = require('fs');
const { Rectangle, Window } = require('../dist');
const { Color, Vector2D } = require('../dist');

const WINDOW_WIDTH = 400;
const WINDOW_HEIGHT = 400;

const WINDOW_SIZE = new Vector2D(WINDOW_WIDTH, WINDOW_HEIGHT);
const WINDOW_TITLE = "Test";
const FPS_LIMIT = 30;

let win = new Window(WINDOW_SIZE, WINDOW_TITLE);

win.init();
win.set_fps_limit(FPS_LIMIT);

let rect = new Rectangle;
rect.fill = new Color(0, 0, 0);
rect.size = new Vector2D(50, 50);

win.add_child(rect);

/////////////////////////
// Setting interval
/////////////////////////
win.set_interval(() => {
	rect.position.x = (rect.position.x + 1) % WINDOW_WIDTH;
}, 100);

win.loop();
