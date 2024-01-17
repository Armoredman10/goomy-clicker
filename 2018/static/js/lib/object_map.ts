export function mapByKeys<T>(obj: { [id: string]: T }, fn: (t: T) => any) {
	const new_obj: { [id: string]: T } = {};
	const keys = Object.keys(obj);
	for (var a = 0; a < keys.length; ++a) {
		new_obj[keys[a]] = fn(obj[keys[a]]);
	}
	return new_obj;
}

export function forEachKey<T>(obj: { [id: string]: T }, fn: (key: string, t: T) => void) {
	const keys = Object.keys(obj);
	for (var a = 0; a < keys.length; ++a) {
		fn(keys[a], obj[keys[a]]);
	}
}

export function mapToArray<T>(obj: { [id: string]: T }, fn: (key: string, t: T) => any) {
	const arr: T[] = [];
	const keys = Object.keys(obj);
	for (var a = 0; a < keys.length; ++a) {
		arr.push(fn(keys[a], obj[keys[a]]));
	}
	return arr;
}



// WEBPACK FOOTER //
// ./src/lib/object_map.ts