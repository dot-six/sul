import { Event as SFEvent, MouseButtonEvent, MouseMoveEvent as SFMouseMoveEvent } from '../../sfml-js'
import { Mouse as SFMouse } from '../../sfml-js'

import { get_node_by_vector } from '../utils'

import { Vector2D } from '../modules'
import { Base } from '../components'

import { EventValues } from './callbacks'
import { MouseButton, MouseClickEvent, MouseMoveEvent } from './mouse'
import { process_input_event } from './keyboard'

export function process_user_events(event: SFEvent): EventValues {
	let retval: EventValues;

	switch (event.type) {
		case "MouseButtonPressed":
		case "MouseButtonReleased":
			// TODO: Should also handles mouse_click
			retval = process_mouse_press.call(this, event);
			break;
		case "MouseMoved":
			retval = process_mouse_move.call(this, event);
			break;
		case "KeyReleased":
			retval = process_input_event.call(this, event);
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

export function process_mouse_move({ mouseMove: delta }: SFMouseMoveEvent): MouseMoveEvent {
	let last: MouseMoveEvent = this.last_events['mouse_move'] as MouseMoveEvent;

	let prevMousePos: Vector2D = new Vector2D(last?.origin.x, last?.origin.y);

	let retval: MouseMoveEvent = {
		delta: new Vector2D(delta.x, delta.y).sub(prevMousePos),
		origin: prevMousePos
	};

	this.last_events['mouse_move'] = Object.assign(Object.assign({}, retval), {
		origin: new Vector2D(delta.x, delta.y)
	});

	let target: Base = get_node_by_vector(this.tree, prevMousePos);
	target?.ev.emit('mouse_move', retval);

	return retval;
};
