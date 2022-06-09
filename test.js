const { Region, Vector2D } = require('./dist');

let a = new Vector2D(10, 10);
let b = new Vector2D(20, 20);
let reg = new Region(a, b);

let [c, d] = reg;
console.log(c, d);
