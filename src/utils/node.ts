import { Base } from '../components'
import { Vector2D } from '../modules'

export function get_node_by_vector(root: Base, pos: Vector2D): Base {
	let retval: Base;
	let walk = (n: Base) => {
		let clone: Base = n.clone();
		let parent: Base = clone.parent;

		// Apply offset relative to parent
		while (parent) {
			clone.position.add(parent.position);
			parent = parent.parent;
		}

		if (clone.get_region().contains(pos)) retval = n;

		for (const each of n.children) walk(each);
	};

	walk(root);
	return retval;
}
