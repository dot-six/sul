import { Event as SFEvent, MouseButtonEvent } from '../../sfml-js'

import { get_node_by_vector } from '../utils'

import { Vector2D } from '../modules'
import { Base } from '../components'

import { MouseButton, MouseClickEvent } from './mouse'
import { EventValues } from './callbacks'

export function process_user_events(event: SFEvent): EventValues {
	let retval: EventValues;

	switch (event.type) {
		case "MouseButtonPressed":
		case "MouseButtonReleased":
			// TODO: Should also handles mouse_click
			retval = process_mouse_press.call(this, event);
			break;
	}

	return retval;
};

export function process_mouse_press({ mouseButton: event, type }: MouseButtonEvent): MouseClickEvent {
	let button: MouseButton = event.button;
	let pos: Vector2D = new Vector2D(event.x, event.y);
	let node: Base = get_node_by_vector(this.tree, pos);

	// Call callback
	let evName: string;
	let retval: MouseClickEvent = {
		button,
		position: pos,
		target: node
	};

	// XXX: Should've narrow down, because this function only called between these two.
	// WARN: mouse_click cannot be handled here, we decided to handle them on `Windows` internal handler
	if (type === "MouseButtonPressed") {
		evName = 'mouse_down';
	} else if (type === "MouseButtonReleased") {
		evName = 'mouse_up';
	}

	if (evName) {
		node?.ev.emit(evName, retval);
	}

	return retval;
}
