import crypto from 'crypto'
import EventEmitter from 'events'

import { RectangleShape, CircleShape, ConvexShape, Sprite, Text, VertexArray } from '../../sfml-js'

import * as utils from '../utils'

import { Vector2D, Region } from '../modules'

export type Drawable = RectangleShape | CircleShape | ConvexShape | Sprite | Text | VertexArray;
export type Func = (...args: any[]) => void; // Why you have to do this @types/node?

export class Base {
	id: string = crypto.randomBytes(5).toString('hex'); // 10 char
	position: Vector2D = new Vector2D(0, 0);
	size: Vector2D = new Vector2D(0, 0);
	rotation: number = 0;
	parent: Base | null = null;
	children: Base[] = [];

	/* User-defined event handlers */
	ev: InstanceType<typeof EventEmitter> = new EventEmitter();

	on_mouse_down(cb: Function): Function {
		this.ev.on('mouse_down', cb as Func);
		return cb;
	}

	on_mouse_up(cb: Function): Function {
		this.ev.on('mouse_up', cb as Func);
		return cb;
	}

	on_click(cb: Function): Function {
		this.ev.on('mouse_click', cb as Func);
		return cb;
	}

	/* Built-in methods */
	get_region(): Region {
		let a = new Vector2D(this.position.x, this.position.y);
		let b = new Vector2D(this.position.x + this.size.x, this.position.y + this.size.y);
		return new Region(a, b);
	}

	// Returns the index of the added child
	add_child(child: Base, index: number = -1): number {
		child.parent = this;

		if (index < 0) {
			return this.children.push(child) - 1;
		} else {
			utils.array_insert(this.children, child, index);
			return index;
		}
	}

	// TODO: Implment should_update to all primitives
	should_update(): boolean { return true; };

	clone(): Base {
		let b: Base = new Base();
		b.id = this.id;
		b.position = new Vector2D(this.position.x, this.position.y);
		b.size = new Vector2D(this.size.x, this.size.y);
		b.rotation = this.rotation;
		b.parent = this.parent;

		b.children = this.children.map(c => {
			let a = c.clone();
			a.parent = b;
			return a;
		});

		return b;
	}

	compare(rhand: Base): boolean {
		if (this.id !== rhand.id) return false;
		if (!this.position.eq(rhand.position)) return false;
		if (!this.size.eq(rhand.size)) return false;
		if (this.rotation !== rhand.rotation) return false;
		// ignore children.

		return true;
	}

	render(): Drawable[] | undefined { return undefined }
};
