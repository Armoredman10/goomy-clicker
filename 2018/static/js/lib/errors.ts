import BigNumber from "./hoisted/bignumber";

export class NotEnoughGoomies {
	constructor(public shortfall: BigNumber) { }
}

export class NothingToSell extends Error { }
export class AlreadyBought extends Error { }



// WEBPACK FOOTER //
// ./src/lib/errors.ts