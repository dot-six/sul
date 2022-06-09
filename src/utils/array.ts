export function array_insert(array: any[], item: any, index: number): number {
	let right = array.splice(index);
	array = array.concat(item, right);
	return array.length;
};
