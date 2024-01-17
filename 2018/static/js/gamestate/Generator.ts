import { observable, action, computed } from "mobx";
import { BigNumber } from "src/lib/bignum";
import GoomyCount from "./GoomyCount";
import { NotEnoughGoomies, NothingToSell } from "src/lib/errors";
import { Serializable, JSONObject } from "../save/Serializable";
import GameState from "src/gamestate";
import Upgrade from "./Upgrade";

interface GeneratorBaseDictionary {
	base_cost: string;
	base_upgrade_cost: string;
	base_gps_fn: (game_state: GameState) => BigNumber;
}

export interface GeneratorSerializableDictionary extends JSONObject {
	count: number;
	level: number;
	unlocked: boolean;
}

export type GeneratorDefinitionDictionary = GeneratorBaseDictionary & {
	unlock_level: number;
}

export type GeneratorDictionary = GeneratorBaseDictionary & GeneratorSerializableDictionary;

export function exponential_multiplier(count: number) {
	/* 
		use the Javascript for speed; using an approximated multiplier for
		price scaling is okay as long as the _adding_ is precise
	*/
	let mult = 1;
	if (count < 10) {
		mult = Math.pow(10, count * 0.115 - count * count * 0.0015);
	} else {
		const log_count = Math.log10(count);
		mult = Math.pow(10, (log_count) * (log_count));
	}
	if (mult === Infinity) {
		// only happens at 1e+17 generators, shouldn't be a problem
		return new BigNumber(count).multipliedBy(new BigNumber("5e+289"))
	}
	return new BigNumber(mult);
}

export default class Generator implements Serializable<GeneratorSerializableDictionary> {
	base_cost: BigNumber;
	base_upgrade_cost: BigNumber;
	@observable base_gps: BigNumber;
	@observable gps_bonus: BigNumber;
	@observable level: number = 1;
	@observable count: number = 0;
	@observable unlocked: boolean;
	base_gps_fn: (game_state: GameState) => BigNumber;

	recalc_callback: () => void;
	unlocked_at_start: boolean = false;

	constructor(
		initial_data: GeneratorDictionary,
	) {
		this.base_cost = new BigNumber(initial_data.base_cost);
		this.base_upgrade_cost = new BigNumber(initial_data.base_upgrade_cost);
		this.level = initial_data.level;
		this.count = initial_data.count;
		this.base_gps_fn = initial_data.base_gps_fn;
		this.gps_bonus = new BigNumber(0);
	}

	@computed get gps() {
		// return this.base_gps * this.level;
		return this.base_gps.times(this.level).plus(this.gps_bonus);
	}

	@computed get total_gps() {
		// return this.gps * this.count;
		return this.gps.times(this.count);
	}

	@computed get cost() {
		return this.costForNumber(this.count);
	}

	@computed get upgrade_cost() {
		return this.base_upgrade_cost.times(new BigNumber(1.5).exponentiatedBy(this.level - 1));
	}

	costForNumber(count: number) {
		const mult = exponential_multiplier(count);
		return this.base_cost.times(mult).integerValue(BigNumber.ROUND_DOWN);
	}

	@action recalcBaseGPS(game_state: GameState) {
		this.base_gps = new BigNumber(this.base_gps_fn(game_state));
	}

	@action buy(n: number = 1, goomies: GoomyCount) {
		let total_cost = new BigNumber(0);
		for (var a = 0; a < n; ++a) {
			total_cost = total_cost.plus(new BigNumber(this.costForNumber(this.count + a)));
		}
		if (total_cost.isGreaterThan(goomies.goomies)) {
			throw new NotEnoughGoomies(total_cost.minus(goomies.goomies));
		} else {
			goomies.spend(total_cost);
			this.count += n;
			this.recalc_callback();
		}
	}

	@action buyMax(goomies: GoomyCount) {
		while (this.cost.isLessThan(goomies.goomies)) {
			goomies.spend(this.cost);
			this.count += 1;
		}
		this.recalc_callback();
	}

	@action sell(n: number = 1, goomies: GoomyCount) {
		if (this.count < n) {
			throw new NothingToSell();
		}
		for (var a = 0; a < n; ++a) {
			this.count -= 1;
			goomies.add(this.cost.dividedBy(4));
			this.recalc_callback();
		}
	}

	@action sellAll(goomies: GoomyCount) {
		while (this.count > 0) {
			this.count -= 1;
			goomies.add(this.cost.dividedBy(4));
		}
		this.recalc_callback();
	}

	@action upgrade(goomies: GoomyCount) {
		if (this.upgrade_cost.isGreaterThan(goomies.goomies)) {
			throw new NotEnoughGoomies(this.upgrade_cost.minus(goomies.goomies));
		} else {
			goomies.spend(this.upgrade_cost);
			this.level += 1;
			this.recalc_callback();
		}
	}

	@action unlock(game_state: GameState) {
		if (game_state.goomy_count.total_goomies.isGreaterThan(this.base_cost)) {
			this.unlocked = true;
		}
	}

	serialize() {
		var { level, count, unlocked } = this;
		return { level, count, unlocked };
	}

	setData(dict: GeneratorSerializableDictionary) {
		this.level = dict.level;
		this.count = dict.count;
	}
}



// WEBPACK FOOTER //
// ./src/gamestate/Generator.ts