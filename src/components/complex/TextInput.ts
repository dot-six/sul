import { Font, Keyboard } from '../../../sfml-js'
const { Keys } = Keyboard;

import { Color, Vector2D, Region } from '../../modules'

import type { InputEvent } from '../../events'

import { Base, Drawable } from '../Base'
import { Rectangle, Geometry } from '../basic'
import { Text } from '../Text'

export const PrintableMap: Record<string, string> = {
	Space: ' '
};

export class TextInput extends Geometry {
	raw: Record<string, Geometry> = {
		text: new Text(),
		background: new Rectangle()
	};

	text: string = "";
	font_size: number = 16;
	// TODO: Use Padding type
	padding: Record<string, number> = { top: 5, bottom: 5, left: 5, right: 5 };
	background_color: Color = new Color(150, 150, 150);
	text_color: Color = new Color(0, 0, 0);
	// TODO: Placeholder text

	constructor() {
		super();
		this.border_color = new Color(0, 0, 0);
		this.border_thickness = 1;

		// Init events
		// on_input only applies to focused object
		// if you want all input from global, use .on_all_input
		this.on_input(this.process_input.bind(this));
	}

	set_font(font: Font | string | Buffer) {
		(this.raw.text as Text).set_font(font);
	}

	process_input(e: InputEvent) {
		// Don't handle new line
		if (e.key === "Enter") return;

		// Handle special keys
		if (e.key === "Backspace") {
			// Backspace
			this.text = this.text.substr(0, this.text.length - 1);

		} else if (PrintableMap[e.key]) {
			this.text += PrintableMap[e.key];

		// TODO: Handle printable chars
		// XXX: Only handles a-z A-Z 0-9
		} else if (/[a-zA-Z0-9]/.test(e.key)) {
			this.text += e.key;
		}

		// TODO: Handle Arrow keys
	}

	get_region(): Region {
		let a: Vector2D = new Vector2D();
		let b: Vector2D = new Vector2D();

		a.add(this.get_global_position());
		b.add(a).add(this.size);
		if (this.size.y == -1) {
			// Auto sizing
			b.y = 0;
			b.add(a);

			b.x += this.size.x;
			b.y += this.padding.top + this.padding.bottom + this.font_size;
		}

		return new Region(a, b);
	}

	render(): Drawable[] {
		this.raw.background.fill = this.background_color;
		this.raw.text.fill = this.text_color;

		this.raw.background.position = this.position;
		this.raw.background.size = (new Vector2D()).add(this.size);
		if (this.size.y == -1) {
			// Auto sizing
			this.raw.background.size.y = this.padding.top + this.padding.bottom + this.font_size;
		}

		(this.raw.text as Text).text = this.text;
		(this.raw.text as Text).font_size = this.font_size;
		this.raw.text.position = new Vector2D(
			this.padding.top + this.position.x,
			this.padding.bottom + this.position.y
		);

		if (this.border_thickness > 0) {
			this.raw.background.border_thickness = this.border_thickness;
			this.raw.background.border_color = this.border_color;
		}

		return [...this.raw.background.render(), ...this.raw.text.render()];
	}
}
