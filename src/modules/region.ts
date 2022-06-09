import { Vector2D } from './vector2d'

export class Region {
	start: Vector2D;
	end: Vector2D;

	constructor(start: Vector2D, end: Vector2D) {
		this.start = start;
		this.end = end;
	}

	contains(point: Vector2D): boolean {
		if (point.x < this.start.x) return false;
		if (point.y < this.start.y) return false;

		if (point.x > this.end.x) return false;
		if (point.y > this.end.y) return false;

		return true;
	}

	[Symbol.iterator]() {
		return [this.start, this.end][Symbol.iterator]();
	}
};
