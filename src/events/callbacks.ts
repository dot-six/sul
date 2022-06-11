import { MouseClickEvent, MouseMoveEvent } from './mouse'
import { InputEvent } from './keyboard'

export type OnMouseDownCallback = (e: MouseClickEvent) => void;
export type OnClickCallback = (e: MouseClickEvent) => void;
export type OnMouseUpCallback = (e: MouseClickEvent) => void;

export type OnMouseMoveCallback = (e: MouseMoveEvent) => void;

export type EventCallbacks = OnClickCallback | OnMouseMoveCallback;
export type EventValues = MouseClickEvent | MouseMoveEvent | InputEvent;
export type EventNames = 'mouse_click' | 'mouse_move' | 'mouse_down' | 'mouse_up' | 'input';
