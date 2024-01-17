import { observable, action, computed } from "mobx";
import { format_hhmmss_to } from "../lib/format";
import { Serializable, JSONObject } from "../save/Serializable";
import { BigNumber } from "src/lib/bignum";

/** Great Goomy
 * 
 * Produces Goomies when you click on it. Also levels up and triggers the
 * Youngstapocalypse.
 * 
 * Every Cursor you buy provides a fixed 0.2 exp/s, regardless of how far you've
 * upgraded it or what level you're at.
 * 
 * Every click gives you exp equal to the Goomy's level.
 * 
 * */

export interface GreatGoomyDict extends JSONObject { exp: number; }

export class GreatGoomy implements Serializable<GreatGoomyDict> {

	@observable exp_points = 0;
	@observable level = 1;
	expps: number = 0;
	recalc_callback: () => void;

	constructor(readonly level_cap: number = 100) { }

	setEXPPS = (expps: number) => {
		this.expps = expps;
	}

	@action update = (ms: number) => {
		if (this.level == this.level_cap) return;
		this.exp_points += this.expps * ms / 1000;
		this.levelUp();
	}

	@action click = () => {
		if (this.level == this.level_cap) return;
		this.exp_points += this.level + 7;
		this.levelUp();
	}

	@action levelUp = () => {
		if (!this.to_next_level) return;
		const next_level_requirement = this.to_next_level;
		if (this.exp_points >= next_level_requirement) {
			this.level += 1;
			this.recalc_callback();
			if (this.level == this.level_cap) {
				this.exp_points = next_level_requirement;
			}
		}
	}

	toLevel(level: number) {
		if (level <= 1) return 0;
		return 100 * level * level * level;
	}

	@computed get to_next_level() {
		if (this.level == this.level_cap) return undefined;
		return this.toLevel(this.level + 1);
	}

	@computed get current_level_progress() {
		return this.exp_points - this.toLevel(this.level);
	}

	@computed get next_level_increment() {
		if (this.level == this.level_cap) return undefined;
		return this.toLevel(this.level + 1) - this.toLevel(this.level);
	}

	@computed get time_to_next_level() {
		if (!this.to_next_level) return "";
		const to_next_level = this.to_next_level - this.exp_points;
		return format_hhmmss_to(Math.ceil(to_next_level / this.expps));
	}

	serialize() {
		return { exp: this.exp_points };
	}

	setExp(exp: number) {
		this.exp_points = exp;
		var level = 0;
		while (this.toLevel(level + 1) < exp) {
			level += 1;
		}
		this.level = level;
	}

}


/** The Heavenly Sliggoo
 * 
 * Raises Goomy production by a fixed percentage for the next iteration.
 * 
 * The multiplier on Goomy production is equal to: 100 + (Sliggoo level)%
 * 
 * The number of exp points required to advance the Sliggoo to the next level
 * is 100 * the Sliggoo's current level.
 * 
 * You earn an exp point for every 1 quadrillion Goomies of total production.
 * 
 * */

export interface SliggooDict extends JSONObject { exp: string; }

export class HeavenlySliggoo implements Serializable<SliggooDict> {

	@observable exp_points = new BigNumber(0);
	@observable level = 0;

	@action addExp(exp: string) {
		this.exp_points = this.exp_points.plus(exp);
		this.levelUp();
	}

	levelUp() {
		while (this.exp_points.gte(new BigNumber(50).times(this.level + 1).times(this.level + 2))) {
			this.level += 1;
		}
	}

	@computed get to_next_level() {
		return new BigNumber(50).times(this.level + 1).times(this.level + 2);
	}

	serialize() {
		return { exp: this.exp_points.toString() };
	}

}


/** The Divine Goodra
 * 
 * Raises the level cap of the Great Goomy.
 * 
 * The level cap of the Great Goomy is equal to the level of the Divine
 * Goodra plus 100. For example, if the Divine Goodra is at level 13, the
 * maximum level of the Great Goomy is 113 for that playthrough.
 * 
 * The number of exp points required to advance the Divine Goodra to the next
 * level is also 100 * the Goodra's current level.
 * 
 * You earn an exp point for the Divine Goodra for every cursor you own at the
 * end of a game.
 * 
 * */

export interface GoodraDict extends JSONObject { exp: number; }

export class DivineGoodra {

	@observable exp_points = 0;
	@observable level = 0;

	@action addExp(exp: number) {
		this.exp_points += exp;
		this.levelUp();
	}

	levelUp() {
		while (this.exp_points >= 50 * (this.level + 1) * (this.level + 2)) {
			this.level += 1;
		}
	}

	@computed get to_next_level() {
		return 50 * (this.level + 1) * (this.level + 2)
	}

	serialize() {
		return { exp: this.exp_points };
	}

}



// WEBPACK FOOTER //
// ./src/gamestate/GoomyStats.ts