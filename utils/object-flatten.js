/*
	flattens nested objects, prefixing properties according to their place in the structure
 	
 	example:

 	origin: {
		planets: {
			earth: 1,
			mars: 2,
			jupiter: 3
		},
		rocks: {
			moons: {
				luna: 4,
				deimos: 5,
				phobos: 6,
				europa: 7
			},
			asteroids: {
				gaspra: 8,
				apophis: 9,
				chiron: 10
			}
		}
 	}

 	result: {
		planets_earth: 1,
		planets_mars: 2,
		planets_jupiter: 3,
		rocks_moons_luna: 4,
		rocks_moons_deimos: 5,
		rocks_moons_phobos: 6,
		rocks_moons_europa: 7,
		rocks_asteroids_gaspra: 8,
		rocks_asteroids_apophis: 9,
		rocks_asteroids_chiron: 10
 	}
*/
export function flatten(origin) {
	return rFlatten('', origin, {});
}


function rFlatten(prefix, origin, target) {

	Object.keys(origin).forEach(key => {

		const propName = prefix ? `${prefix}_${key}` : key;

		if(typeof(origin[key]) === 'object') {
			rFlatten(propName, origin[key], target);
		} else {
			target[propName] = origin[key];
		}
	});

	return target;

}




