import { RectangleShape, Vector2F } from '../../../sfml-js'
import type { PointType } from '../../../sfml-js'

import { Drawable } from '../';
import { Geometry } from './Geometry';

export class Rectangle extends Geometry {
	render(): Drawable[] | undefined {
		let rect: RectangleShape = new RectangleShape(this.size as PointType<Vector2F>);

		rect.setFillColor(this.fill.toNumber());

		if (this.border_thickness > 0) {
			rect.setOutlineColor(this.border_color.toNumber());
			rect.setOutlineThickness(this.border_thickness);
		}

		rect.setPosition(this.position as PointType<Vector2F>);
		rect.setRotation(this.rotation);

		return [rect];
	}

	/*clone(): Base {
		let rect: Rectangle = super.clone();
		return rect;
	}*/
};
