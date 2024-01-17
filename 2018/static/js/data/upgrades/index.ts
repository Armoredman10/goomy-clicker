import Upgrade, { UpgradeBaseDictionary } from "src/gamestate/Upgrade";
import GameState from "src/gamestate";

function getGeneratorCount(game_state: GameState, generator_id: string): number {
	if (!game_state.generators.hasOwnProperty(generator_id)) return 0;
	return game_state.generators[generator_id].count;
}

/*
	Upgrade cost formula for generators:

	youngster: 50 generator + 50 youngster, 20000 times base cost

	upgrade1: 5 generator,   20 times base cost
	upgrade2: 10 generator,  200 times base cost
	upgrade3: 25 generator,  2000 times base cost
	upgrade4: 100 generator, 200000 times base cost
	upgrade5: 250 generator, 200000000 times base cost
	--- future upgrades ---
	upgrade6: 1000 generator, 200000000000
	upgrade7: 5000 generator, 2000000000000000

	(target base is 15, can vary from 10 to 20)
*/

const upgrade_data: { [id: string]: UpgradeBaseDictionary } = {
	"gcm1": {
		cost: '1e+4',
		unlock_fn: (game_state) => game_state.great_goomy.level >= 5,
	},
	"gcm2": {
		cost: '1e+5',
		unlock_fn: (game_state) => game_state.great_goomy.level >= 10,
	},
	"gcm3": {
		cost: '1e+7',
		unlock_fn: (game_state) => game_state.great_goomy.level >= 20,
	},
	"gcm4": {
		cost: '1e+10',
		unlock_fn: (game_state) => game_state.great_goomy.level >= 40,
	},
	"gcm5": {
		cost: '1e+13',
		unlock_fn: (game_state) => game_state.great_goomy.level >= 80,
	},
	"click_bonus": {
		cost: '1e+15',
		unlock_fn: (game_state) => game_state.great_goomy.level > 100,
	},
	// youngsters
	"youngster_great": {
		cost: '2000',
		unlock_fn: (game_state) => game_state.great_goomy.level >= 5
	},
	"youngster1": {
		cost: '50000',
		unlock_fn: (game_state) => game_state.great_goomy.level >= 10
	},
	"youngster2": {
		cost: '250000',
		unlock_fn: (game_state) => game_state.great_goomy.level >= 15
	},
	"youngster3": {
		cost: '1000000',
		unlock_fn: (game_state) => game_state.great_goomy.level >= 20
	},
	"youngster_ultra": {
		cost: '2000000',
		unlock_fn: (game_state) => game_state.great_goomy.level >= 25
	},
	"youngster4": {
		cost: '5000000',
		unlock_fn: (game_state) => game_state.great_goomy.level >= 30
	},
	"youngster5": {
		cost: '24000000',
		unlock_fn: (game_state) => game_state.great_goomy.level >= 35
	},
	"youngster6": {
		cost: '120000000',
		unlock_fn: (game_state) => game_state.great_goomy.level >= 40
	},
	"youngster7": {
		cost: '1e+9',
		unlock_fn: (game_state) => game_state.great_goomy.level >= 45
	},
	"youngster8": {
		cost: '1e+10',
		unlock_fn: (game_state) => game_state.great_goomy.level >= 50
	},
	"youngster9": {
		cost: '1e+11',
		unlock_fn: (game_state) => game_state.great_goomy.level >= 60
	},
	"youngster10": {
		cost: '1e+12',
		unlock_fn: (game_state) => game_state.great_goomy.level >= 70
	},
	"youngster11": {
		cost: '1e+13',
		unlock_fn: (game_state) => game_state.great_goomy.level >= 80
	},
	"youngster12": {
		cost: '1e+14',
		unlock_fn: (game_state) => game_state.great_goomy.level >= 90
	},
	"youngster_final": {
		cost: '1e+15',
		unlock_fn: (game_state) => game_state.great_goomy.level >= 100,
		onBuy: (game_state) => {
			game_state.youngsterpocalypse.popUpDialog(game_state);
		}
	},
	// Daycare
	"daycare1": {
		cost: '20000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "daycare") >= 5
	},
	"daycare2": {
		cost: '200000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "daycare") >= 10
	},
	"daycare3": {
		cost: '2000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "daycare") >= 25
	},
	"daycare_youngster": {
		cost: '20000000',
		unlock_fn: (game_state) =>
			getGeneratorCount(game_state, "daycare") >= 50 &&
			getGeneratorCount(game_state, "youngster") >= 50
	},
	"daycare4": {
		cost: '200000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "daycare") >= 100
	},
	"daycare5": {
		cost: '200000000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "daycare") >= 250
	},
	// Reserve
	"reserve1": {
		cost: '300000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "reserve") >= 5
	},
	"reserve2": {
		cost: '3000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "reserve") >= 10
	},
	"reserve3": {
		cost: '30000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "reserve") >= 25
	},
	"reserve_youngster": {
		cost: '300000000',
		unlock_fn: (game_state) =>
			getGeneratorCount(game_state, "reserve") >= 50 &&
			getGeneratorCount(game_state, "youngster") >= 100
	},
	"reserve4": {
		cost: '3000000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "reserve") >= 100
	},
	"reserve5": {
		cost: '3000000000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "reserve") >= 250
	},
	// Farm
	"farm1": {
		cost: '4000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "farm") >= 5
	},
	"farm2": {
		cost: '40000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "farm") >= 10
	},
	"farm3": {
		cost: '400000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "farm") >= 25
	},
	"farm_youngster": {
		cost: '4000000000',
		unlock_fn: (game_state) =>
			getGeneratorCount(game_state, "farm") >= 50 &&
			getGeneratorCount(game_state, "youngster") >= 150
	},
	"farm4": {
		cost: '40000000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "farm") >= 100
	},
	"farm5": {
		cost: '40000000000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "farm") >= 250
	},
	// Goopy Fountain
	"fountain1": {
		cost: '50000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "goopy_fountain") >= 5
	},
	"fountain2": {
		cost: '500000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "goopy_fountain") >= 10
	},
	"fountain3": {
		cost: '5000000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "goopy_fountain") >= 25
	},
	"fountain_youngster": {
		cost: '50000000000',
		unlock_fn: (game_state) =>
			getGeneratorCount(game_state, "goopy_fountain") >= 50 &&
			getGeneratorCount(game_state, "youngster") >= 200
	},
	"fountain4": {
		cost: '500000000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "goopy_fountain") >= 100
	},
	"fountain5": {
		cost: '500000000000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "goopy_fountain") >= 250
	},
	// Geothermal Cave
	"cave1": {
		cost: '600000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "geothermal_cave") >= 5
	},
	"cave2": {
		cost: '6000000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "geothermal_cave") >= 10
	},
	"cave3": {
		cost: '60000000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "geothermal_cave") >= 25
	},
	"cave_youngster": {
		cost: '600000000000',
		unlock_fn: (game_state) =>
			getGeneratorCount(game_state, "geothermal_cave") >= 50 &&
			getGeneratorCount(game_state, "youngster") >= 250
	},
	"cave4": {
		cost: '6000000000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "geothermal_cave") >= 100
	},
	"cave5": {
		cost: '6000000000000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "geothermal_cave") >= 250
	},
	// Oceanic Trench
	"trench1": {
		cost: '8000000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "oceanic_trench") >= 5
	},
	"trench2": {
		cost: '80000000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "oceanic_trench") >= 10
	},
	"trench3": {
		cost: '800000000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "oceanic_trench") >= 25
	},
	"trench_youngster": {
		cost: '8000000000000',
		unlock_fn: (game_state) =>
			getGeneratorCount(game_state, "oceanic_trench") >= 50 &&
			getGeneratorCount(game_state, "youngster") >= 300
	},
	"trench4": {
		cost: '80000000000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "oceanic_trench") >= 100
	},
	"trench5": {
		cost: '80000000000000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "oceanic_trench") >= 250
	},
	// Enslaved Arceus
	"arceus1": {
		cost: '120000000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "enslaved_arceus") >= 5
	},
	"arceus2": {
		cost: '1200000000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "enslaved_arceus") >= 10
	},
	"arceus3": {
		cost: '12000000000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "enslaved_arceus") >= 25
	},
	"arceus_youngster": {
		cost: '120000000000000',
		unlock_fn: (game_state) =>
			getGeneratorCount(game_state, "enslaved_arceus") >= 50 &&
			getGeneratorCount(game_state, "youngster") >= 350
	},
	"arceus4": {
		cost: '1200000000000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "enslaved_arceus") >= 100
	},
	"arceus5": {
		cost: '1200000000000000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "enslaved_arceus") >= 250
	},
	// Cloning Lab
	"cloning_lab1": {
		cost: '180000000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "cloning_lab") >= 5
	},
	"cloning_lab2": {
		cost: '1800000000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "cloning_lab") >= 10
	},
	"cloning_lab3": {
		cost: '18000000000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "cloning_lab") >= 25
	},
	"cloning_lab_youngster": {
		cost: '180000000000000',
		unlock_fn: (game_state) =>
			getGeneratorCount(game_state, "cloning_lab") >= 50 &&
			getGeneratorCount(game_state, "youngster") >= 400
	},
	"cloning_lab4": {
		cost: '1800000000000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "cloning_lab") >= 100
	},
	"cloning_lab5": {
		cost: '1800000000000000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "cloning_lab") >= 250
	},
	// Church of Goomy
	"church_of_goomy1": {
		cost: '14080000000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "church_of_goomy") >= 5
	},
	"church_of_goomy2": {
		cost: '140800000000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "church_of_goomy") >= 10
	},
	"church_of_goomy3": {
		cost: '1408000000000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "church_of_goomy") >= 25
	},
	"church_of_goomy_youngster": {
		cost: '14080000000000000',
		unlock_fn: (game_state) =>
			getGeneratorCount(game_state, "church_of_goomy") >= 50 &&
			getGeneratorCount(game_state, "youngster") >= 500
	},
	"church_of_goomy4": {
		cost: '140800000000000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "church_of_goomy") >= 100
	},
	"church_of_goomy5": {
		cost: '140800000000000000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "church_of_goomy") >= 250
	},
	"church_of_goomy6": {
		cost: '704000000000000000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "church_of_goomy") >= 1000
	},
	"church_of_goomy7": {
		cost: '7040000000000000000000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "church_of_goomy") >= 5000
	},
	// RNG Abuser
	"rng_abuser1": {
		cost: '3.5184372088832e14',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "rng_abuser") >= 5
	},
	"rng_abuser2": {
		cost: '3.5184372088832e15',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "rng_abuser") >= 10
	},
	"rng_abuser3": {
		cost: '3.5184372088832e16',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "rng_abuser") >= 25
	},
	"rng_abuser_youngster": {
		cost: '3.5184372088832e17',
		unlock_fn: (game_state) =>
			getGeneratorCount(game_state, "rng_abuser") >= 50 &&
			getGeneratorCount(game_state, "youngster") >= 750
	},
	"rng_abuser4": {
		cost: '3.5184372088832e18',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "rng_abuser") >= 100
	},
	"rng_abuser5": {
		cost: '3.5184372088832e21',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "rng_abuser") >= 250
	},
	// Photon Collider
	"photon_collider1": {
		cost: '6e+15',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "photon_collider") >= 5
	},
	"photon_collider2": {
		cost: '6e+16',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "photon_collider") >= 10
	},
	"photon_collider3": {
		cost: '6e+17',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "photon_collider") >= 25
	},
	"photon_collider_youngster": {
		cost: '6e+18',
		unlock_fn: (game_state) =>
			getGeneratorCount(game_state, "photon_collider") >= 50 &&
			getGeneratorCount(game_state, "youngster") >= 250
	},
	"photon_collider4": {
		cost: '6e+19',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "photon_collider") >= 100
	},
	"photon_collider5": {
		cost: '6e+22',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "photon_collider") >= 250
	},
	// Repopulated Planet
	"repopulated_planet1": {
		cost: '90000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "repopulated_planet") >= 5
	},
	"repopulated_planet2": {
		cost: '700000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "repopulated_planet") >= 10
	},
	"repopulated_planet3": {
		cost: '8000000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "repopulated_planet") >= 25
	},
	"repopulated_planet4": {
		cost: '200000000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "repopulated_planet") >= 100
	},
	"repopulated_planet5": {
		cost: '2100000000000',
		unlock_fn: (game_state) => getGeneratorCount(game_state, "repopulated_planet") >= 250
	},
};

export default upgrade_data;

export function generateNewUpgrades() {
	const upgrades: { [id: string]: Upgrade } = {};
	for (let id in upgrade_data) {
		let data = upgrade_data[id];
		upgrades[id] = new Upgrade({
			...data,
			unlocked: false,
			bought: false,
		});
	}
	return upgrades;
};



// WEBPACK FOOTER //
// ./src/data/upgrades/index.ts