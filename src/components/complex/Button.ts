import { RectangleShape, Font } from '../../../sfml-js'

import { Color, Vector2D } from '../../modules'

import { Drawable } from '../Base'
import { Rectangle } from '../basic'
import { Text } from '../Text'

// TODO: This wouldn't work if we don't do effective update
// TODO: Effective update might be tomorrow!
export class Button extends Rectangle {
	text: string;
	_text: Text;
	background_color: Color = new Color(0, 0, 0);
	foreground_color: Color = new Color(255, 255, 255);
	padding: number[] = [5, 5, 10, 10]; // t, b, l, r
	firstTime: boolean = true; // TODO: Tree copy and comparison
	font_size: number = 30;

	constructor(text: string = "Button") {
		super();

		this.text = text;
		this._text = new Text(this.text);
	}

	set_font(font: string | Font | Buffer): void {
		this._text.set_font(font);
	}

	should_update(): boolean { return true };

	render(): Drawable[] | undefined {
		if (this._text.font === null) return undefined;

		let text: Text = this._text;

		// Post process
		text.fill = this.foreground_color;
		text.text = this.text;
		text.font_size = this.font_size;

		// Set position
		let [regA, regB] = text.get_region();
		text.position = new Vector2D(
			this.position.x + this.padding[2],
			this.position.y + this.padding[0] - (this.font_size - (regB.y - regA.y))
		);

		let [offset, textSize] = this._text.get_region();
		// Add padding
		textSize.sub(offset);

		textSize.add(new Vector2D(
			// TODO: get exact width of a text
			// Ref: https://stackoverflow.com/a/13245216/11841762
			this.padding[2] + (this.padding[3] * 2),
			this.padding[0] + this.padding[1]
		));

		super.position = this.position;
		super.size = textSize;
		// Add fill color to rectangle
		super.fill = this.background_color;

		// Render container
		let container: Drawable = super.render()[0];

		return [container, text.render()[0]];
	};
};
