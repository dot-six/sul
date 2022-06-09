import { CircleShape, Vector2F } from '../../../sfml-js'
import type { PointType } from '../../../sfml-js'

import { Vector2D } from '../../modules'
import { Drawable, Base } from '../'
import { Geometry } from './Geometry'

export class Circle extends Geometry {
	point_count: number = 30;

	constructor(radius: number = 0, point_count: number = 30) {
		super();

		this.size = new Vector2D(radius, radius);
		this.point_count = point_count;
	}

	render(): Drawable[] | undefined {
		let c: CircleShape = new CircleShape(this.size.x, this.point_count);

		c.setFillColor(this.fill.toNumber());

		if (this.border_thickness > 0) {
			c.setOutlineColor(this.border_color.toNumber());
			c.setOutlineThickness(this.border_thickness);
		}

		c.setPosition(this.position as PointType<Vector2F>);
		c.setRotation(this.rotation);

		return [c];
	}

	clone(): Base {
		let c: Circle = super.clone() as Circle;
		c.point_count = this.point_count;

		return c;
	}
};
