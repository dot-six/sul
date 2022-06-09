export class Color {
	r: number;
	g: number;
	b: number;
	a: number;

	constructor(r: number = 0, g: number = 0, b: number = 0, a: number = 255) {
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
	}

	toNumber() {
		return (this.r << 24) | (this.g << 16) | (this.b << 8) | this.a;
	}
};
