import { Event as SFEvent, KeyEvent } from '../../sfml-js'
import { Keyboard } from '../../sfml-js'

const { Keys } = Keyboard;

import { EventValues } from './callbacks'

export interface InputEvent {
	key: string;
};

export const CodeMap: Record<number, string> = {
	[Keys.Num0]: '0',
	[Keys.Num1]: '1',
	[Keys.Num2]: '2',
	[Keys.Num3]: '3',
	[Keys.Num4]: '4',
	[Keys.Num5]: '5',
	[Keys.Num6]: '6',
	[Keys.Num7]: '7',
	[Keys.Num8]: '8',
	[Keys.Num9]: '9'
};

export function process_input_event(e: KeyEvent): EventValues {
	let processed: InputEvent = {
		key: convert_keys_to_char(e)
	};

	this.focus?.ev.emit('input', processed);
	return processed;
};

export function convert_keys_to_char({ key }: KeyEvent): string {
	let { alt, control, shift, system, codeStr, code } = key;
	let retval: string;
	// XXX: Only handles A-Z
	if (code >= Keys.A && code <= Keys.Z) {
		retval = codeStr.toLowerCase();
	}

	if (code >= Keys.Num0 && code <= Keys.Num9) {
		retval = CodeMap[code];
	}

	// TODO: Handle caps lock too
	if (shift) {
		retval = retval.toUpperCase();
	}

	return retval;
};
