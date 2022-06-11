export const EventNameMap: { [derived: string]: string[] } = {
	'MouseButtonPressed': ['mouse_down'],
	'MouseButtonReleased': ['mouse_up', 'mouse_click'],
	'MouseMoved': ['mouse_move'],
	// TODO: Listen to KeyPressed with threshold for input
	'KeyReleased': ['input']
};
