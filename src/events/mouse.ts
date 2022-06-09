import { Vector2D } from '../modules'
import { Base } from '../components'

export enum MouseButton {
	LEFT,
	RIGHT,
	MIDDLE
};

export interface MouseClickEvent {
	position: Vector2D;
	button: MouseButton;
	target: Base;
};

export interface MouseMoveEvent {
	delta: Vector2D;
};
