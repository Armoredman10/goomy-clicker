import BigNumber from "./hoisted/bignumber";

import locale from "./locale";

function getLocaleNumberFormat() {
	if (locale.substr(0, 2) == "fr") {
		return {
			decimalSeparator: ",",
			groupSeparator: " ",
			groupSize: 3,
			secondaryGroupSize: 0,
			fractionGroupSeparator: " ",
			fractionGroupSize: 0,
		};
	} else {
		return {
			decimalSeparator: ".",
			groupSeparator: ",",
			groupSize: 3,
			secondaryGroupSize: 0,
			fractionGroupSeparator: " ",
			fractionGroupSize: 0,
		};
	}
}

/*
	This file literally only exists to have a unified place to
	set the bignum library configuration.
*/

BigNumber.config({
	DECIMAL_PLACES: 8,
	ROUNDING_MODE: BigNumber.ROUND_HALF_EVEN,
	EXPONENTIAL_AT: [-1e9, 1e9],
	FORMAT: getLocaleNumberFormat(),
})

export {
	BigNumber
}



// WEBPACK FOOTER //
// ./src/lib/bignum.ts