import { BigNumber } from "../bignum";
import locale from "../locale";

const short_suffixes = {
	"en-CA": [
		"", "", "", "",
		"trillion", "quadrillion", "quintillion", "sextillion", "septillion",
		"octillion", "nonillion", "decillion", "undecillion", "dodecillion",
		"tredeceillion", "quattuordecillion", "quindecillion", "sexdecillion",
		"septendecillion", "octodecillion", "novemdecillion", "vigintillion"
	]
};

const short_abbr_suffixes = { // that will fit onto the stats pane
	"en-CA": [
		"", "", "", "",
		"trillion", "quad'n", "quint'n", "sext'n", "sept'n",
		"oct'n", "non'n", "dec'n", "undec'n", "duodec'n",
		"tredec'n", "qua'dec'n", "quindec'n", "sexdec'n",
		"sep'dec'n", "octodec'n", "nov'dec'n", "vigint'n"
	]
};

const long_suffixes = {
	"fr-CA": [
		"", "", "", "",
		"billion", "billiard",
		"trillion", "trilliard",
		"quadrillion", "quadrilliard",
		"quintillion", "quintilliard",
		"sextillion", "sextilliard",
		"septillion", "septilliard",
		"octillion", "octilliard",
		"nonillion", "nonilliard",
		"décillion", "décilliard",
	]
};

function formatMediumLong(n: BigNumber, l: string) {
	function getSuffixForMagnitude(n: number) {
		if (n < 20) return long_suffixes[l][n];
		else return `K<sup>${n}</sup>`;
	}

	if (n.isLessThan("1e12")) return n.toFormat(0);
	for (var a = 1; a < 20; ++a) {
		if (n.isLessThan(new BigNumber("1e+" + (3 + a * 3)))) {
			let string = n.dividedBy(new BigNumber("1e+" + (a * 3))).toPrecisionFormat(7);
			return (string + " " + getSuffixForMagnitude(a));
		}
	}
	return n.toExponential(6);
}

function formatMediumDefault(n: BigNumber, l: string) {
	function getSuffixForMagnitude(n: number) {
		if (n < 20) return short_abbr_suffixes[l][n];
		else return `K<sup>${n}</sup>`;
	}

	if (n.isLessThan("1e12")) return n.toFormat(0);
	for (var a = 1; a < 20; ++a) {
		if (n.isLessThan(new BigNumber("1e+" + (3 + a * 3)))) {
			let string = n.dividedBy(new BigNumber("1e+" + (a * 3))).toPrecision(7);
			return (string + " " + getSuffixForMagnitude(a));
		}
	}
	return n.toExponential(6);
}

export function formatMedium(n: BigNumber) {
	if (locale.substr(0, 2) == "fr") {
		return formatMediumLong(n, locale);
	}
	return formatMediumDefault(n, locale);
}



// WEBPACK FOOTER //
// ./src/lib/format/medium.ts