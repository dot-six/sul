export class Vector2D {
	x: number;
	y: number;

	constructor(x: number = 0, y: number = 0) {
		this.x = x;
		this.y = y;
	}

	add(rhand: Vector2D): Vector2D {
		this.x += rhand.x;
		this.y += rhand.y;

		return this;
	}

	sub(rhand: Vector2D): Vector2D {
		this.x -= rhand.x;
		this.y -= rhand.y;

		return this;
	}

	eq(rhand: Vector2D): boolean {
		return this.x === rhand.x && this.y === rhand.y;
	}
};
