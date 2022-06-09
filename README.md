# sul (SFML UI Library - one guy, probably)
GUI library and framework for Node.js

## Getting Started
```js
const { Rectangle, Window } = require('izagi');
const { Color, Vector2D } = require('izagi');

const WINDOW_WIDTH = 400;
const WINDOW_HEIGHT = 400;
const WINDOW_TITLE = "Test";
const FPS_LIMIT = 30; // Optional

let win = new Window(WINDOW_WIDTH, WINDOW_HEIGHT, WINDOW_TITLE, FPS_LIMIT);

let rect = new Rectangle();
rect.size = new Vector2D(200, 200);
rect.position = new Vector2D(100, 100);
rect.fill = new Color(0, 0, 0);

win.add_child(rect);
```
