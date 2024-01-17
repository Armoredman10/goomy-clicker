import { action, observable, computed } from "mobx";
import * as pako from "pako";
import * as base64 from "base64-js";

import { BigNumber } from "src/lib/bignum";
import { mapByKeys, forEachKey } from "src/lib/object_map";
import { JSONObject, Serializable } from "src/save/Serializable";

import DialogState from "./DialogState";
import GoomyCount, { GoomyCountDictionary } from "./GoomyCount";
import { GreatGoomy, GreatGoomyDict, HeavenlySliggoo, GoodraDict, SliggooDict, DivineGoodra } from "./GoomyStats";
import Generator, { GeneratorSerializableDictionary } from "./Generator";
import Upgrade, { UpgradeSerializableDictionary } from "./Upgrade";
import Youngsterpocalypse, { YoungsterpocalypseDictionary } from "./Youngsterpocalypse";

import generateNewGenerators from "src/data/generators";
import { generateNewUpgrades } from "src/data/upgrades";
import { game_over_dialogue, game_over_dialogue2 } from "src/data/gameover/dialogue";
import HeavenlyMeadow, { HeavenlyMeadowDict } from "./HeavenlyMeadow";

interface GameStateDictionary extends JSONObject {
	start_time: number;
	save_time: number;
	reset_count: number;
	great_goomy: GreatGoomyDict;
	heavenly_sliggoo: SliggooDict;
	divine_goodra: GoodraDict;
	heavenly_meadow: HeavenlyMeadowDict;
	goomy_count: GoomyCountDictionary;
	generators: { [id: string]: GeneratorSerializableDictionary };
	upgrades: { [id: string]: UpgradeSerializableDictionary };
	youngsterpocalypse: YoungsterpocalypseDictionary;
}

class GameState implements Serializable<GameStateDictionary> {

	@observable start_time?: Date = undefined;
	@observable current_time: Date;
	@observable reset_count: number;
	@observable over: boolean = false;
	@observable dialog_state: DialogState;

	public time_rate: number = 1;

	public generators: { [id: string]: Generator };
	public upgrades: { [id: string]: Upgrade };

	/* Can only be created from a save file or created anew. */
	private constructor(
		public goomy_count: GoomyCount,
		public great_goomy: GreatGoomy,
		public youngsterpocalypse: Youngsterpocalypse,
		public heavenly_sliggoo: HeavenlySliggoo,
		public divine_goodra: DivineGoodra,
		public heavenly_meadow: HeavenlyMeadow,
	) {
		this.current_time = new Date();
		this.youngsterpocalypse.onGameOver = this.endGame.bind(this);
		this.dialog_state = new DialogState();
	}

	static createNew(): GameState {
		// actually create new objects
		const goomy_count = new GoomyCount({
			goomies: "0",
			total_goomies: "0",
			total_total_goomies: "0",
			gps: "0",
			gpc: "1",
		});

		const generators = generateNewGenerators(0);

		generators["cursor"].unlocked = true;
		generators["cursor"].unlocked_at_start = true;
		generators["youngster"].unlocked = true;
		generators["youngster"].unlocked_at_start = true;

		const upgrades = generateNewUpgrades();

		const great_goomy = new GreatGoomy();
		const heavenly_sliggoo = new HeavenlySliggoo();
		const divine_goodra = new DivineGoodra();
		const heavenly_meadow = new HeavenlyMeadow();
		const youngsterpocalypse = new Youngsterpocalypse();

		const game_state = new GameState(
			goomy_count, great_goomy, youngsterpocalypse,
			heavenly_sliggoo, divine_goodra, heavenly_meadow
		);

		game_state.generators = generators;
		game_state.upgrades = upgrades;

		game_state.reset_count = 0;

		// set recalc callbacks in their own step
		const recalc = game_state.recalc.bind(game_state);
		goomy_count.start_callback = game_state.start.bind(game_state);
		great_goomy.recalc_callback = recalc;

		forEachKey(generators, (_, generator) => {
			generator.recalc_callback = recalc;
		});

		forEachKey(upgrades, (_, upgrade) => {
			upgrade.recalc_callback = recalc;
		});

		youngsterpocalypse.recalc_callback = recalc;

		recalc();

		(window as any).gameState = game_state;

		return game_state;
	}

	serialize() {
		if (!this.start_time) return {} as GameStateDictionary;
		return {
			start_time: this.start_time.getTime(),
			save_time: this.current_time.getTime(),
			reset_count: this.reset_count,
			goomy_count: this.goomy_count.serialize(),
			great_goomy: this.great_goomy.serialize(),
			heavenly_sliggoo: this.heavenly_sliggoo.serialize(),
			divine_goodra: this.divine_goodra.serialize(),
			heavenly_meadow: this.heavenly_meadow.serialize(),
			upgrades: mapByKeys(this.upgrades, (upgrade => upgrade.serialize())),
			generators: mapByKeys(this.generators, (generator => generator.serialize())),
			youngsterpocalypse: this.youngsterpocalypse.serialize(),
		};
	}

	get save_file(): string {
		const save_file = JSON.stringify(this.serialize());
		const zip = pako.deflate(save_file);
		return base64.fromByteArray(zip);
	}

	static createFromSaveFile(save_file: string) {

		const unzip = pako.inflate(base64.toByteArray(save_file));
		const dict: GameStateDictionary = JSON.parse(new TextDecoder().decode(unzip));

		if (Object.keys(dict).length == 0) return GameState.createNew();

		// actually create new objects
		const goomy_count = new GoomyCount(dict.goomy_count);
		const youngsterpocalypse = new Youngsterpocalypse();
		youngsterpocalypse.setData(dict.youngsterpocalypse);

		const great_goomy = new GreatGoomy();
		const heavenly_sliggoo = new HeavenlySliggoo();
		const divine_goodra = new DivineGoodra();
		const heavenly_meadow = new HeavenlyMeadow();

		great_goomy.setExp(dict.great_goomy.exp);
		if (dict.heavenly_sliggoo) heavenly_sliggoo.addExp(dict.heavenly_sliggoo.exp);
		if (dict.divine_goodra) divine_goodra.addExp(dict.divine_goodra.exp);
		if (dict.heavenly_meadow) heavenly_meadow.setData(dict.heavenly_meadow);

		const game_state = new GameState(
			goomy_count, great_goomy, youngsterpocalypse,
			heavenly_sliggoo, divine_goodra, heavenly_meadow
		);

		game_state.start_time = new Date(dict.start_time);
		game_state.reset_count = dict.reset_count;

		game_state.generators = generateNewGenerators(game_state.reset_level);
		forEachKey(game_state.generators, (id, generator) => {
			if (dict.generators.hasOwnProperty(id)) {
				generator.setData(dict.generators[id]);
				if (dict.generators[id].unlocked) {
					generator.unlocked_at_start = true;
				}
			}
		})

		game_state.generators["cursor"].unlocked = true;
		game_state.generators["cursor"].unlocked_at_start = true;
		game_state.generators["youngster"].unlocked = true;
		game_state.generators["youngster"].unlocked_at_start = true;

		game_state.upgrades = generateNewUpgrades();
		forEachKey(game_state.upgrades, (id, upgrade) => {
			if (dict.upgrades.hasOwnProperty(id))
				upgrade.setData(dict.upgrades[id]);
		})

		// Y16E procedures
		if (game_state.upgrades["youngster_final"].bought && !youngsterpocalypse.active) {
			game_state.youngsterpocalypse.popUpDialog(game_state);
		}

		// set recalc callbacks in their own step
		const recalc = game_state.recalc.bind(game_state);

		goomy_count.start_callback = game_state.start.bind(game_state);
		great_goomy.recalc_callback = recalc;
		forEachKey(game_state.generators, (_, generator) => { generator.recalc_callback = recalc; });
		forEachKey(game_state.upgrades, (_, upgrade) => { upgrade.recalc_callback = recalc; });

		youngsterpocalypse.recalc_callback = recalc;

		(window as any).gameState = game_state;

		var ms = new Date().getTime() - dict.save_time;
		game_state.recalc();
		game_state.update(ms);
		game_state.recalc();

		return game_state;
	}

	@action start() {
		if (!this.start_time) {
			this.start_time = new Date();
		}
	}

	@action update(ms: number) {
		ms *= this.time_rate;
		this.youngsterpocalypse.update(ms);
		if (this.over) return;
		this.current_time = new Date();
		this.goomy_count.update(ms);
		this.great_goomy.update(ms);
		this.unlockUpgrades();
		this.unlockGenerators();
		if ((window as any).autobuy) {
			this.autoBuy(); // technically cheating, but debug only!
		}
		if ((window as any).autolevel) {
			this.autoLevel();
		}
	}

	@action autoBuy() {
		let generator_to_buy: Generator | null = null;
		let replenishment_time: BigNumber = new BigNumber("Infinity");
		forEachKey(this.generators, (_, generator) => {
			if (generator.cost.dividedBy(generator.gps).isLessThan(replenishment_time)) {
				replenishment_time = generator.cost.dividedBy(generator.gps);
				generator_to_buy = generator;
			}
		})
		if (generator_to_buy != null && (generator_to_buy as Generator).cost.isLessThan(this.goomy_count.goomies)) {
			(generator_to_buy as Generator).buy(1, this.goomy_count);
		}
	}

	@action autoLevel() {
		let generator_to_upgrade: Generator | null = null;
		let replenishment_time: BigNumber = new BigNumber("Infinity");
		forEachKey(this.generators, (_, generator) => {
			if (generator.upgrade_cost.isLessThan(this.goomy_count.goomies) &&
				generator.upgrade_cost.isLessThan(this.goomy_count.gps.times(replenishment_time))) {
				replenishment_time = generator.upgrade_cost.dividedBy(this.goomy_count.gps);
				generator_to_upgrade = generator;
			}
		})
		if (generator_to_upgrade != null) {
			(generator_to_upgrade as Generator).upgrade(this.goomy_count);
		}
	}

	@action recalcGPS() {
		var gps = new BigNumber(0);
		forEachKey(this.generators, (_, generator) => {
			generator.recalcBaseGPS(this);
			gps = gps.plus(generator.total_gps);
		})
		this.goomy_count.setGPS(gps, 0);
	}

	@computed get total_generator_count() {
		var count = 0;
		forEachKey(this.generators, (_, generator) => {
			count += generator.count;
		})
		return count;
	}

	@action recalcEXPPS() {
		this.great_goomy.setEXPPS(this.generators['cursor'].count);
	}

	@action recalcGPC() {
		var gpc = new BigNumber(this.great_goomy.level);

		if (this.upgrades["gcm1"].bought) {
			gpc = gpc.plus(
				new BigNumber(0.5)
					.times(this.total_generator_count)
					.times(this.great_goomy.level - 5)
			);
		}
		if (this.upgrades["gcm2"].bought) {
			gpc = gpc.plus(
				new BigNumber(2)
					.times(this.total_generator_count)
					.times(this.great_goomy.level - 10)
			);
		}
		if (this.upgrades["gcm3"].bought) {
			gpc = gpc.plus(
				new BigNumber(10)
					.times(this.total_generator_count)
					.times(this.great_goomy.level - 20)
			);
		}
		if (this.upgrades["gcm4"].bought) {
			gpc = gpc.plus(
				new BigNumber(100)
					.times(this.total_generator_count)
					.times(this.great_goomy.level - 40)
			);
		}
		if (this.upgrades["gcm5"].bought) {
			gpc = gpc.plus(
				new BigNumber(1000)
					.times(this.total_generator_count)
					.times(this.great_goomy.level - 80)
			);
		}

		if (this.upgrades["click_bonus"].bought) {
			gpc = gpc.plus(
				new BigNumber(0.01)
					.times(this.goomy_count.gps)
					.times(this.great_goomy.level - 100)
			);
		}

		this.goomy_count.setGPC(gpc);
	}

	@action unlockGenerators() {
		forEachKey(this.generators, (_, generator) => {
			generator.unlock(this);
		})
	}

	@action unlockUpgrades() {
		forEachKey(this.upgrades, (_, upgrade) => {
			upgrade.unlock(this);
		})
	}

	@action recalc() {
		this.recalcEXPPS();
		this.recalcGPS();
		this.recalcGPC();
	}

	@action endGame() {
		if (this.over) return;
		this.over = true;

		if (!this.heavenly_meadow.transitioned) {
			setTimeout(() => {
				this.dialog_state.appendFrames(game_over_dialogue, () => {
					this.heavenly_meadow.transitionFromDialog();
					this.heavenly_meadow.dialog_state.appendFrames(
						game_over_dialogue2
						, () => {
							this.heavenly_meadow.showStats();
						});
				});
			}, 0);
		} else if (!this.heavenly_meadow.showing_stats) {
			// just do the second set
			this.heavenly_meadow.dialog_state.appendFrames(
				game_over_dialogue2
				, () => {
					this.heavenly_meadow.showStats();
				});
		}

		this.heavenly_sliggoo.addExp(
			this.goomy_count.total_goomies.dividedBy("1e15").toString()
		);
		this.divine_goodra.addExp(this.generators["cursor"].count);
	}

	@computed get reset_level() {
		var level = 0;
		if (this.reset_count > 0) {
			level = 1;
		}
		return level;
	}

	@action reset = () => {

		this.over = false;
		this.start_time = undefined;

		this.reset_count += 1;

		this.goomy_count.goomies = new BigNumber("0");
		this.goomy_count.total_goomies = new BigNumber("0");

		this.generators = generateNewGenerators(this.reset_level);

		this.generators["cursor"].unlocked = true;
		this.generators["cursor"].unlocked_at_start = true;
		this.generators["youngster"].unlocked = true;
		this.generators["youngster"].unlocked_at_start = true;

		this.upgrades = generateNewUpgrades();
		this.great_goomy = new GreatGoomy(100);

		this.youngsterpocalypse.reset();
		this.youngsterpocalypse.onGameOver = this.endGame.bind(this);

		this.heavenly_meadow.showing_stats = false;
		this.heavenly_meadow.transitioned = false;

		// set recalc callbacks
		const recalc = this.recalc.bind(this);
		this.great_goomy.recalc_callback = recalc;
		this.youngsterpocalypse.recalc_callback = recalc;

		forEachKey(this.generators, (_, generator) => { generator.recalc_callback = recalc; });
		forEachKey(this.upgrades, (_, upgrade) => { upgrade.recalc_callback = recalc; });

		recalc();

	}

}

export default GameState;



// WEBPACK FOOTER //
// ./src/gamestate/index.ts