# sul (SFML UI Library - one guy, probably)
[![Type Check](https://github.com/dot-six/sul/actions/workflows/type-check.yml/badge.svg)](https://github.com/dot-six/sul/actions/workflows/type-check.yml)
[![Build](https://github.com/dot-six/sul/actions/workflows/build.yml/badge.svg)](https://github.com/dot-six/sul/actions/workflows/build.yml)

GUI library and framework for Node.js

## Getting Started
```js
const { Rectangle, Window } = require('sul');
const { Color, Vector2D } = require('sul');

const WINDOW_WIDTH = 400;
const WINDOW_HEIGHT = 400;
const WINDOW_TITLE = "Test";
const FPS_LIMIT = 30; // Optional
const WINDOW_SIZE = new Vector2D(WINDOW_WIDTH, WINDOW_HEIGHT);

let win = new Window(WINDOW_SIZE, WINDOW_TITLE);
win.init();
win.set_fps_limit(FPS_LIMIT);

let rect = new Rectangle();
rect.size = new Vector2D(200, 200);
rect.position = new Vector2D(100, 100);
rect.fill = new Color(0, 0, 0);

win.add_child(rect);
win.loop();
```

## How to Build
```sh
npm install
# Build .js files
npm run build
# Build .d.ts files
npm run build.declaration
```
