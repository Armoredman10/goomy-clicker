import { addLocaleData } from 'react-intl';
import * as en from 'react-intl/locale-data/en';
import * as fr from 'react-intl/locale-data/fr';
import * as ja from 'react-intl/locale-data/ja';

addLocaleData([...en, ...fr, ...ja]);

function flatten(dict: {}) {
	let new_dict = {};
	for (var key in dict) {
		if (typeof (dict[key]) == "object") {
			let flattened_dict = flatten(dict[key]);
			for (var flat_key in flattened_dict) {
				new_dict[key + "_" + flat_key] = flattened_dict[flat_key];
			}
		} else {
			new_dict[key] = dict[key];
		}
	}
	return new_dict;
}

export default {
	"en-CA": flatten(require("./en-CA").default),
	"en-US": flatten(require("./en-CA").default),
	"fr-CA": flatten(require("./fr-CA").default),
};



// WEBPACK FOOTER //
// ./src/intl/index.ts