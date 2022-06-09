import { MouseClickEvent, MouseMoveEvent } from './mouse'

export type OnMouseDownCallback = (e: MouseClickEvent) => void;
export type OnClickCallback = (e: MouseClickEvent) => void;
export type OnMouseUpCallback = (e: MouseClickEvent) => void;

export type OnMouseMoveCallback = (e: MouseMoveEvent) => void;

export type EventCallbacks = OnClickCallback | OnMouseMoveCallback;
export type EventValues = MouseClickEvent | MouseMoveEvent;
export type EventNames = 'mouse_click' | 'mouse_move';
