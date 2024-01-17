import { BigNumber } from "../bignum";

export { formatShort } from './short';
export { formatMedium } from './medium';

export function zp2(n: string) {
	return n.length == 1 ? "0" + n : n;
}

export function zp3(n: string) {
	return n.length < 3 ? ("00" + n).substr(-3) : n;
}

export function format_mmss_to(seconds: BigNumber | number) {
	if (seconds instanceof BigNumber) {
		if (seconds.isGreaterThan(3600) || seconds.isLessThanOrEqualTo(0)) return "";
		else return `(${
			zp2(seconds.dividedToIntegerBy(60).toString())
			}:${
			zp2(seconds.mod(60).toString())
			})`;
	} else {
		if (seconds > 3600 || seconds < 0) return "";
		else return `(${
			zp2("" + Math.floor(seconds / 60))
			}:${
			zp2("" + Math.floor(seconds) % 60)
			})`;
	}
}

export function format_hhmmss_to(seconds: BigNumber | number) {
	if (seconds instanceof BigNumber) {
		if (seconds.isGreaterThan(3600000) || seconds.isLessThanOrEqualTo(0)) return "";
		else return `(${
			zp2(seconds.dividedToIntegerBy(3600).toString())
			}:${
			zp2(seconds.dividedToIntegerBy(60).mod(60).toString())
			}:${
			zp2(seconds.mod(60).toString())
			})`;
	} else {
		if (seconds > 3600000 || seconds < 0) return "";
		else return `(${
			zp2("" + Math.floor(seconds / 3600))
			}:${
			zp2("" + Math.floor(seconds / 60) % 60)
			}:${
			zp2("" + Math.floor(seconds) % 60)
			})`;
	}
}



// WEBPACK FOOTER //
// ./src/lib/format/index.ts