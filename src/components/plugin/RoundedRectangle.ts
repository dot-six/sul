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

	constructor(topleft: number = 0, topright: number = 0, bottomleft: number = 0, bottomright: number = 0) {
		super()
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

		return [this.raw]
	}
};
