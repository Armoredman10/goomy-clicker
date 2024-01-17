import { BigNumber } from "src/lib/bignum";
import { observable, action } from "mobx";
import { NotEnoughGoomies, AlreadyBought } from "src/lib/errors";
import GameState from ".";
import { Serializable, JSONObject } from "../save/Serializable";

export interface UpgradeBaseDictionary {
	cost: string;
	unlock_fn: (game_state: GameState) => boolean;
	onBuy?: (game_state: GameState) => void;
}

export interface UpgradeSerializableDictionary extends JSONObject {
	unlocked: boolean;
	bought: boolean;
}

export type UpgradeDictionary = UpgradeBaseDictionary & UpgradeSerializableDictionary;

export default class Upgrade implements Serializable<UpgradeSerializableDictionary> {
	cost: BigNumber;
	@observable unlocked: boolean = false;
	@observable bought: boolean = false;
	unlock_fn: (game_state: GameState) => boolean;
	onBuy?: (game_state: GameState) => void;

	recalc_callback: () => void;

	constructor(initial_data: UpgradeDictionary) {
		this.cost = new BigNumber(initial_data.cost);
		this.bought = initial_data.bought;
		this.unlock_fn = initial_data.unlock_fn;
		this.onBuy = initial_data.onBuy;
	}

	@action unlock(game_state: GameState) {
		if (this.unlock_fn(game_state)) {
			this.unlocked = true;
		} // don't relock again if the condition turns false at any point
	}

	@action buy(game_state: GameState) {
		if (this.cost.isGreaterThan(game_state.goomy_count.goomies)) {
			throw new NotEnoughGoomies(this.cost.minus(game_state.goomy_count.goomies));
		} else if (this.bought) {
			throw new AlreadyBought();
		} else {
			game_state.goomy_count.spend(this.cost);
			this.bought = true;
			if (this.onBuy) this.onBuy(game_state);
			this.recalc_callback();
		}
	}

	serialize() {
		const { unlocked, bought } = this;
		return { unlocked, bought };
	}

	setData(data: UpgradeSerializableDictionary) {
		this.unlocked = data.unlocked;
		this.bought = data.bought;
	}

}



// WEBPACK FOOTER //
// ./src/gamestate/Upgrade.ts