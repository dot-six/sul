import { ConvexShape } from '../../../sfml-js'

import { Drawable } from '../Base'
import { Geometry } from '../basic'

import { Vector2D, Color } from '../../modules'

// TODO: Place this to modules
export interface Radius {
	topleft: number;
	topright: number;
	bottomleft: number;
	bottomright: number;
};

export class RoundedRectangle extends Geometry {
	raw: ConvexShape = new ConvexShape(4);
	radius: Radius;

	constructor() {
		this.radius = {
			topleft: 0,
			topright: 0,
			bottomleft: 0,
			bottomright: 0
		};
	}

	constructor(radius: number) {
		this.radius = {
			topleft: radius,
			topright: radius,
			bottomleft: radius,
			bottomright: radius
		};
	}

	constructor(radius: Radius) {
		// This is reference right??
		this.radius = radius;
	}

	constructor(topleft: number, topright: number) {
		this.radius = {
			topleft, topright,
			bottomleft: topleft,
			bottomright: topright
		};
	}

	constructor(topleft: number, topright: number, bottomleft: number, bottomright: number) {
		this.radius = {
			topleft, topright,
			bottomleft, bottomright
		};
	}

	render(): Drawable[] {
		let totalPoint = Object.values(this.radius).reduce((a, b) => a + b) || 4;
		this.raw.setPointCount(totalPoint);

		// topleft
		let pi = 0;
		for (let i = 0; i < this.radius.topleft; i++ && pi++) {
			this.raw.setPoint(pi, new Vector2D());
		}
	}
};
