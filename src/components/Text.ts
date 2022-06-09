import { Text as SFText, Font } from '../../sfml-js'
import type { PointType } from '../../sfml-js'

import { Vector2D, Region } from '../modules'

import { Drawable, Base } from './Base'
import { Geometry } from './basic/Geometry'

export class Text extends Geometry {
	_text: SFText;
	font: Font;
	text: string;
	font_size: number;

	constructor(text: string = "", font: string | Font | Buffer = null, fontSize: number = 30) {
		super();

		this.text = text;
		this.font_size = fontSize;

		if (typeof font === "string") {
			throw new Error("Local font loading are planned to be implemented. Consider loading from Buffer");
		} else if (font instanceof Font) {
			this.font = font;
		} else if (font instanceof Buffer) {
			let initFont = new Font();
			initFont.loadFromMemory(font);
			this.font = initFont;
		} else if (font === null) {
			this.font = undefined;
		}

		this._text = new SFText();
		this._text.setCharacterSize(this.font_size);
		this._text.setString(this.text);

		if (this.font) {
			this._text.setFont(this.font);
		}
	}

	set_font(font: string | Font | Buffer): void {
		if (typeof font === "string") {
			throw new Error("Local font loading are planned to be implemented. Consider loading from Buffer");
		} else if (font instanceof Font) {
			this.font = font;
		} else if (font instanceof Buffer) {
			let initFont = new Font();
			initFont.loadFromMemory(font);
			this.font = initFont;
		}

		if (this.font) {
			this._text.setFont(this.font);
		}
	}

	get_region(): Region {
		let bounds = this._text.getGlobalBounds();

		return new Region(
			new Vector2D(bounds.left, bounds.top),
			new Vector2D(bounds.left + bounds.width, bounds.top + bounds.height)
		);
	}

	clone(): Base {
		let t: Text = super.clone() as Text;

		// TODO: clone native objects
		t._text = this._text;
		t.font = this.font;

		t.text = this.text;
		t.font_size = this.font_size;

		return t;
	}

	render(): Drawable[] | undefined {
		this._text.setString(this.text);
		this._text.setFillColor(this.fill.toNumber());
		this._text.setCharacterSize(this.font_size);

		if (this.border_thickness > 0) {
			this._text.setOutlineColor(this.border_color.toNumber());
			this._text.setOutlineThickness(this.border_thickness);
		}

		this._text.setPosition(this.position as PointType<Vector2D>);

		return [this._text];
	}
};
