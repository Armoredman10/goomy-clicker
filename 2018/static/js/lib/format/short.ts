import { BigNumber } from "../bignum";
import locale from "../locale";

const short_suffixes = [
	"",
	"k", "M", "B", "T", "Q", "Qt", "Sx", "Sp", "Oc", "No",
	"Dc", "UDc", "DDc", "TDc", "QDc", "Qtc", "SDc", "Spc", "ODc", "NDc"
];

const long_suffixes = [
	"",
	"k", "Mn", "Md", "Bn", "Bd", "Tn", "Td", "Qn", "Qd", "Qt",
	"Qtd", "Sx", "Sxd", "Sp", "Spd", "Oc", "Ocd", "No", "Nod"
];

const chinese_suffixes = ["", "万", "億", "兆", "京", "垓", "秭", "穰", "溝", "澗", "正", "載"]

function formatShortChineseExtended(n: BigNumber) {
	function getSuffixForMagnitude(n: number) {
		if (n >= 2048) return `万<sup>${n}</sup>`;
		let order = 1;
		let suffix = "";
		while (n > 0) {
			if (n % 2 == 1) {
				suffix += chinese_suffixes[order];
			}
			n = Math.floor(n / 2);
			order += 1;
		}
		return suffix;
	}

	if (n.isLessThan(10000)) return n.toFixed(0);
	for (var a = 1; a < 4096; ++a) {
		if (n.isLessThan(new BigNumber("1e+" + (4 + a * 4)))) {
			let string = n.dividedBy(new BigNumber("1e+" + (a * 4))).toPrecision(4);
			return (string + getSuffixForMagnitude(a));
		}
	}
	return n.toExponential(3);
}

function formatShortChinese(n: BigNumber) {
	function getSuffixForMagnitude(n: number) {
		if (n < 12) return chinese_suffixes[n];
		else return `万<sup>${n}</sup>`;
	}

	if (n.isLessThan(10000)) return n.toFixed(0);
	for (var a = 1; a < 12; ++a) {
		if (n.isLessThan(new BigNumber("1e+" + (4 + a * 4)))) {
			let string = n.dividedBy(new BigNumber("1e+" + (a * 4))).toPrecision(4);
			return (string + getSuffixForMagnitude(a));
		}
	}
	return n.toExponential(3);
}

function formatShortLong(n: BigNumber) {
	function getSuffixForMagnitude(n: number) {
		if (n < 20) return long_suffixes[n];
		else return `K<sup>${n}</sup>`;
	}

	if (n.isLessThan(10000)) return n.toFormat(0);
	for (var a = 1; a < 20; ++a) {
		if (n.isLessThan(new BigNumber("1e+" + (3 + a * 3)))) {
			let string = n.dividedBy(new BigNumber("1e+" + (a * 3))).toPrecisionFormat(4);
			return (string + getSuffixForMagnitude(a));
		}
	}
	return n.toExponential(3);
}

function formatShortDefault(n: BigNumber) {
	function getSuffixForMagnitude(n: number) {
		if (n < 20) return short_suffixes[n];
		else return `K<sup>${n}</sup>`;
	}

	if (n.isLessThan(10000)) return n.toFormat(0);
	for (var a = 1; a < 10; ++a) {
		if (n.isLessThan(new BigNumber("1e+" + (3 + a * 3)))) {
			let string = n.dividedBy(new BigNumber("1e+" + (a * 3))).toPrecision(4);
			return (string + getSuffixForMagnitude(a));
		}
	}
	return n.toExponential(3);
}


export function formatShort(n: BigNumber) {
	if (locale.substr(0, 2) == "fr") {
		return formatShortLong(n);
	}
	return formatShortDefault(n);
}



// WEBPACK FOOTER //
// ./src/lib/format/short.ts