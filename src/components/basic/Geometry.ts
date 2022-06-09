import { Color } from '../../modules'

import { Base, Drawable } from '../';

export class Geometry extends Base {
	fill: Color = new Color(255, 255, 255);
	border_color: Color = new Color(255, 255, 255);
	border_thickness: number = 0;
	opacity: number = 100;

	clone(): Base {
		let g: Geometry = super.clone() as Geometry;
		g.fill = new Color(this.fill.r, this.fill.g, this.fill.b, this.fill.a);
		g.border_color = new Color(
			this.border_color.r, this.border_color.g,
			this.border_color.b, this.border_color.a
		);
		g.border_thickness = this.border_thickness;
		g.opacity = this.opacity;

		return g;
	}
};
