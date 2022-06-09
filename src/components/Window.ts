import EventEmitter from 'events'

import { RenderWindow, VideoMode, Event as SFEvent } from '../../sfml-js'
import { Clock } from '../../sfml-js'

import { Vector2D } from '../modules'
import { EventNameMap, MouseClickEvent, EventValues } from '../events'
import { process_user_events } from '../events'

import { Base, Drawable } from './Base'

// XXX: Move IntervalEntry somewhere
export interface IntervalEntry {
	callback: Function;
	ms: number;
	timer: number;
};

export class Window {
	tree: Base = new Base();
	win: RenderWindow;
	vid: VideoMode;
	_clock: Clock = new Clock();
	last_events: { [eventName: string]: EventValues } = {};

	size: Vector2D = new Vector2D(200, 200);
	position: Vector2D = new Vector2D(50, 50);
	fps_limit: number = 0;
	title: string;

	intervals: IntervalEntry[] = [];

	constructor(size: Vector2D, title: string = "App") {
		this.size = size;
		this.title = title;
	}

	init() {
		// TODO: Add modeBitsPerPixel option
		this.vid = new VideoMode(this.size.x, this.size.y);
		this.win = new RenderWindow(this.vid, this.title);

		this.win.setActive(true);
	}

	add_child(node: Base) {
		this.tree.add_child(node);
	}

	set_fps_limit(newLimit: number) {
		this.fps_limit = newLimit;
		this.win.setFramerateLimit(this.fps_limit);
	}

	set_interval(callback: Function, intervalMs: number): number {
		// Returns interval "id" inside array
		return this.intervals.push({
			callback,
			ms: intervalMs,
			timer: intervalMs
		}) - 1;
	}

	clear_interval(id: number) {
		return (delete this.intervals[id]);
	}

	loop() {
		let walk = (node: Base) => {
			let data: Drawable[] = node.render();
			if (data?.length) {
				for (const each of data) {
					this.win.draw(each);
				}
			}

			// Loop through children
			for (const each of node.children) {
				walk(each);
			}
		};

		// Main loop
		while (this.win.isOpen) {
			// Clock
			let delta: number = this._clock.restart().asMilliseconds();

			// Poll internal events
			let event: SFEvent;
			while ((event = this.win.pollEvent())) {
				if (event.type == "Closed") {
					// Window has been closed by user
					return;
				}

				// TODO: User events
				if (Object.keys(EventNameMap).includes(event.type)) {
					let processed: EventValues = process_user_events.call(this, event);
					this.process_internal_events(event, processed);
				}
			}

			// Intervals
			for (const interval of this.intervals) {
				interval.timer -= delta;
				if (interval.timer > 0) continue

				// Calculates the missed calls amount
				let total: number = Math.abs(interval.timer) + interval.ms;
				let turns: number = Math.floor(total / interval.ms);
				for (let i = 0; i < turns; i++) {
					// Then, call all of them at once
					// lol
					interval.callback();
				}

				interval.timer = interval.ms;
			}

			// TODO: Update only whenever necessary
			this.win.clear(-1);
			walk(this.tree);
			this.win.display();
		}
	}

	process_internal_events(raw: SFEvent, event: EventValues) {
		// Assigns last events
		if (raw.type === "MouseButtonPressed") {
			// mouse_down
			this.last_events['mouse_down'] = Object.assign({}, event);
		} else if (raw.type === "MouseButtonReleased") {
			// mouse_up
			this.last_events['mouse_up'] = Object.assign({}, event);
		}

		// Call effects
		// Handles mouse_click
		if (raw.type === "MouseButtonReleased") {
			let md: MouseClickEvent = this.last_events['mouse_down'] as MouseClickEvent;
			let e: MouseClickEvent = event as MouseClickEvent;

			if (md?.target === e.target) {
				e.target.ev.emit('mouse_click', e);
			}
		}

		// Post effects
		if (raw.type === "MouseButtonReleased") {
			// Clears mouse_down and mouse_up
			delete this.last_events['mouse_down'];
			delete this.last_events['mouse_up'];
		}
	}
};
