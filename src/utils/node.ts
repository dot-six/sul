import { Base } from '../components'
import { Vector2D, Region } from '../modules'

export function get_node_by_vector(root: Base, pos: Vector2D): Base {
	let retval: Base;
	let walk = (n: Base) => {
		let gpos: Vector2D = n.get_global_position();
		let gposs: Vector2D = new Vector2D(gpos.x + n.size.x, gpos.y + n.size.y);
		let reg: Region = new Region(gpos, gposs);
		if (reg.contains(pos)) retval = n;

		for (const each of n.children) walk(each);
	};

	walk(root);
	return retval;
}
