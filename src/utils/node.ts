import { Base } from '../components'
import { Vector2D, Region } from '../modules'

export function get_node_by_vector(root: Base, pos: Vector2D): Base {
	let retval: Base;
	let walk = (n: Base) => {
		let reg: Region = n.get_region();
		if (reg.contains(pos)) retval = n;

		for (const each of n.children) walk(each);
	};

	walk(root);
	return retval;
}
