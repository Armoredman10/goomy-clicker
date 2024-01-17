import Generator, { GeneratorDefinitionDictionary } from "src/gamestate/Generator";
import { BigNumber } from "src/lib/bignum";
import GameState from "src/gamestate";

/* eaib: Exists And Is Bought */
function eaib(game_state: GameState, key: string) {
	return game_state.upgrades[key] && game_state.upgrades[key].bought;
}

const generator_data: { [id: string]: GeneratorDefinitionDictionary } = {
	"cursor": {
		base_cost: "20",
		base_upgrade_cost: "2000",
		base_gps_fn: (game_state) => {
			let gps = new BigNumber("0.2").times(game_state.great_goomy.level);
			return gps;
		},
		unlock_level: 0,
	}, // replacement time: 100 seconds
	"youngster": {
		base_cost: "100",
		base_upgrade_cost: "10000",
		base_gps_fn: (game_state) => {
			let gps = new BigNumber("1.0");
			if (eaib(game_state, "youngster_great")) gps = gps.plus("0.5");
			if (eaib(game_state, "youngster_ultra")) gps = gps.plus("3.5");
			if (eaib(game_state, "youngster_final")) gps = gps.plus("100.0");
			if (eaib(game_state, "youngster1")) gps = gps.times(2);
			if (eaib(game_state, "youngster2")) gps = gps.times(2);
			if (eaib(game_state, "youngster3")) gps = gps.times(2);
			if (eaib(game_state, "youngster4")) gps = gps.times(2);
			if (eaib(game_state, "youngster5")) gps = gps.times(2);
			if (eaib(game_state, "youngster6")) gps = gps.times(2);
			if (eaib(game_state, "youngster7")) gps = gps.times(2);
			if (eaib(game_state, "youngster8")) gps = gps.times(2);
			if (eaib(game_state, "youngster9")) gps = gps.times(2);
			if (eaib(game_state, "youngster10")) gps = gps.times(2);
			if (eaib(game_state, "youngster11")) gps = gps.times(2);
			if (eaib(game_state, "youngster12")) gps = gps.times(2);
			if (eaib(game_state, "daycare_youngster")) gps = gps.times(2);
			if (eaib(game_state, "reserve_youngster")) gps = gps.times(2);
			if (eaib(game_state, "farm_youngster")) gps = gps.times(2);
			if (eaib(game_state, "fountain_youngster")) gps = gps.times(2);
			if (eaib(game_state, "cave_youngster")) gps = gps.times(2);
			if (eaib(game_state, "trench_youngster")) gps = gps.times(2);
			if (eaib(game_state, "arceus_youngster")) gps = gps.times(2);
			if (eaib(game_state, "cloning_lab_youngster")) gps = gps.times(2);
			if (eaib(game_state, "church_of_goomy_youngster")) gps = gps.times(2);
			if (eaib(game_state, "rng_abuser_youngster")) gps = gps.times(2);
			if (eaib(game_state, "photon_collider_youngster")) gps = gps.times(2);
			gps = gps.times(new BigNumber(0.5).exponentiatedBy(game_state.youngsterpocalypse.appease_count));
			return gps;
		},
		unlock_level: 0,
	}, // replacement time: 100 seconds
	"daycare": {
		base_cost: "1000",
		base_upgrade_cost: "100000",
		base_gps_fn: (game_state) => {
			let gps = new BigNumber("8.0");
			if (eaib(game_state, "daycare1")) gps = gps.plus(4);
			if (eaib(game_state, "daycare2")) gps = gps.times(2);
			if (eaib(game_state, "daycare3")) gps = gps.times(2);
			if (eaib(game_state, "daycare4")) gps = gps.times(2);
			if (eaib(game_state, "daycare5")) gps = gps.times(2);
			if (eaib(game_state, "daycare_youngster")) gps = gps.times(2);
			return gps;
		},
		unlock_level: 0,
	}, // replacement time: 125 seconds
	"reserve": {
		base_cost: "15000",
		base_upgrade_cost: "1500000",
		base_gps_fn: (game_state) => {
			let gps = new BigNumber("75");
			if (eaib(game_state, "reserve1")) gps = gps.plus(50);
			if (eaib(game_state, "reserve2")) gps = gps.times(2);
			if (eaib(game_state, "reserve3")) gps = gps.times(2);
			if (eaib(game_state, "reserve4")) gps = gps.times(2);
			if (eaib(game_state, "reserve5")) gps = gps.times(2);
			if (eaib(game_state, "reserve_youngster")) gps = gps.times(2);
			return gps;
		},
		unlock_level: 0,
	}, // replacement time: 200 seconds
	"farm": {
		base_cost: "200000",
		base_upgrade_cost: "20000000",
		base_gps_fn: (game_state) => {
			let gps = new BigNumber("500");
			if (eaib(game_state, "farm1")) gps = gps.plus(300);
			if (eaib(game_state, "farm2")) gps = gps.times(2);
			if (eaib(game_state, "farm3")) gps = gps.times(2);
			if (eaib(game_state, "farm4")) gps = gps.times(2);
			if (eaib(game_state, "farm5")) gps = gps.times(2);
			if (eaib(game_state, "farm_youngster")) gps = gps.times(2);
			return gps;
		},
		unlock_level: 0,
	}, // replacement time: 400 seconds
	"goopy_fountain": {
		base_cost: "2500000",
		base_upgrade_cost: "250000000",
		base_gps_fn: (game_state) => {
			let gps = new BigNumber("2500");
			if (eaib(game_state, "fountain1")) gps = gps.plus(1500);
			if (eaib(game_state, "fountain2")) gps = gps.times(2);
			if (eaib(game_state, "fountain3")) gps = gps.times(2);
			if (eaib(game_state, "fountain4")) gps = gps.times(2);
			if (eaib(game_state, "fountain5")) gps = gps.times(2);
			if (eaib(game_state, "fountain_youngster")) gps = gps.times(2);
			return gps;
		},
		unlock_level: 0,
	}, // replacement time: 1,000 seconds
	"geothermal_cave": {
		base_cost: "30000000",
		base_upgrade_cost: "3000000000",
		base_gps_fn: (game_state) => {
			let gps = new BigNumber("15000");
			if (eaib(game_state, "cave1")) gps = gps.plus(10000);
			if (eaib(game_state, "cave2")) gps = gps.times(2);
			if (eaib(game_state, "cave3")) gps = gps.times(2);
			if (eaib(game_state, "cave4")) gps = gps.times(2);
			if (eaib(game_state, "cave5")) gps = gps.times(2);
			if (eaib(game_state, "cave_youngster")) gps = gps.times(2);
			return gps;
		},
		unlock_level: 0,
	}, // replacement time: 2,000 seconds
	"oceanic_trench": {
		base_cost: "400000000",
		base_upgrade_cost: "40000000000",
		base_gps_fn: (game_state) => {
			let gps = new BigNumber("100000");
			if (eaib(game_state, "trench1")) gps = gps.plus(50000);
			if (eaib(game_state, "trench2")) gps = gps.times(2);
			if (eaib(game_state, "trench3")) gps = gps.times(2);
			if (eaib(game_state, "trench4")) gps = gps.times(2);
			if (eaib(game_state, "trench5")) gps = gps.times(2);
			if (eaib(game_state, "trench_youngster")) gps = gps.times(2);
			return gps;
		},
		unlock_level: 0,
	}, // replacement time: 4,000 seconds
	"enslaved_arceus": {
		base_cost: "6000000000",
		base_upgrade_cost: "600000000000",
		base_gps_fn: (game_state) => {
			let gps = new BigNumber("600000");
			if (eaib(game_state, "arceus1")) gps = gps.plus(400000);
			if (eaib(game_state, "arceus2")) gps = gps.times(2);
			if (eaib(game_state, "arceus3")) gps = gps.times(2);
			if (eaib(game_state, "arceus4")) gps = gps.times(2);
			if (eaib(game_state, "arceus5")) gps = gps.times(2);
			if (eaib(game_state, "arceus_youngster")) gps = gps.times(2);
			return gps;
		},
		unlock_level: 0,
	}, // replacement time: 10,000 seconds
	"cloning_lab": {
		base_cost: "90000000000",
		base_upgrade_cost: "9000000000000",
		base_gps_fn: (game_state) => {
			let gps = new BigNumber("5000000");
			if (eaib(game_state, "cloning_lab1")) gps = gps.plus(3000000);
			if (eaib(game_state, "cloning_lab2")) gps = gps.times(2);
			if (eaib(game_state, "cloning_lab3")) gps = gps.times(2);
			if (eaib(game_state, "cloning_lab4")) gps = gps.times(2);
			if (eaib(game_state, "cloning_lab5")) gps = gps.times(2);
			if (eaib(game_state, "cloning_lab_youngster")) gps = gps.times(2);
			return gps;
		},
		unlock_level: 0,
	}, // replacement time: 18,000 seconds
	"church_of_goomy": {
		base_cost: "704000000000",
		base_upgrade_cost: "70400000000000",
		base_gps_fn: (game_state) => {
			let gps = new BigNumber("20000000");
			if (eaib(game_state, "church_of_goomy1")) gps = gps.plus(10000000);
			if (eaib(game_state, "church_of_goomy2")) gps = gps.times(2);
			if (eaib(game_state, "church_of_goomy3")) gps = gps.times(2);
			if (eaib(game_state, "church_of_goomy4")) gps = gps.times(2);
			if (eaib(game_state, "church_of_goomy5")) gps = gps.times(2);
			if (eaib(game_state, "church_of_goomy6")) gps = gps.times(2);
			if (eaib(game_state, "church_of_goomy_youngster")) gps = gps.times(2);
			if (eaib(game_state, "church_of_goomy7")) gps = new BigNumber("0");
			return gps;
		},
		unlock_level: 0,
	}, // replacement time: 35,200 seconds
	"rng_abuser": {
		base_cost: "17592186044416",
		base_upgrade_cost: "1759218604441600",
		base_gps_fn: (game_state) => {
			let gps = new BigNumber("268535456");
			if (eaib(game_state, "rng_abuser1")) gps = gps.times(2);
			if (eaib(game_state, "rng_abuser2")) gps = gps.times(2);
			if (eaib(game_state, "rng_abuser3")) gps = gps.times(2);
			if (eaib(game_state, "rng_abuser4")) gps = gps.times(2);
			if (eaib(game_state, "rng_abuser5")) gps = gps.times(2);
			if (eaib(game_state, "rng_abuser_youngster")) gps = gps.times(2);
			return gps;
		},
		unlock_level: 0,
	}, // replacement time: 65,536 seconds
	"photon_collider": {
		base_cost: "3e+14",
		base_upgrade_cost: "3e+16",
		base_gps_fn: (game_state) => {
			let gps = new BigNumber("2997924580");
			if (eaib(game_state, "photon_collider1")) gps = gps.plus(2002075420);
			if (eaib(game_state, "photon_collider2")) gps = gps.times(2);
			if (eaib(game_state, "photon_collider3")) gps = gps.times(2);
			if (eaib(game_state, "photon_collider4")) gps = gps.times(2);
			if (eaib(game_state, "photon_collider5")) gps = gps.times(2);
			if (eaib(game_state, "photon_collider_youngster")) gps = gps.times(2);
			return gps;
		},
		unlock_level: 0,
	}, // replacement time: 100,069 seconds
	"goothulhu": {
		base_cost: "2.3e+15",
		base_upgrade_cost: "2.3e+17",
		base_gps_fn: () => new BigNumber("5.75e+10"),
		unlock_level: 1,
	}, // replacement time: 40,000 seconds
	"cryptogoomies_server_farm": {
		base_cost: "1e18",
		base_upgrade_cost: "1e20",
		base_gps_fn: () => new BigNumber("5e12"),
		unlock_level: 1,
	}, // replacement time: 200,000 seconds
	"ecosystem_simulator": {
		base_cost: "525600e14",
		base_upgrade_cost: "525600e14",
		base_gps_fn: () => new BigNumber("1e14"),
		unlock_level: 1,
	}, // replacement time: 525,600 seconds
	"repopulated_planet": {
		base_cost: "",
		base_upgrade_cost: "",
		base_gps_fn: () => new BigNumber(""),
		unlock_level: 2,
	}, // replacement time: 31,556,926 seconds
	"stellar_nursery": {
		base_cost: "",
		base_upgrade_cost: "",
		base_gps_fn: () => new BigNumber(""),
		unlock_level: 2,
	}, // replacement time: 5,000,000,000 seconds
	"galactic_nursery": {
		base_cost: "",
		base_upgrade_cost: "",
		base_gps_fn: () => new BigNumber(""),
		unlock_level: 2,
	}, // replacement time: 1,000,000,000,000 seconds
	"ultimate": {
		base_cost: "",
		base_upgrade_cost: "",
		base_gps_fn: () => new BigNumber(""),
		unlock_level: 3,
	}, // replacement time: 4.354855788e+17 seconds (13.8 billion years)
};

export default function generateNewGenerators(level: number) {
	const generators: { [id: string]: Generator } = {};
	for (let id in generator_data) {
		let data = generator_data[id];
		if (data.unlock_level <= level) {
			const { unlock_level, ...base_data } = data;
			generators[id] = new Generator({
				...base_data,
				count: 0,
				level: 1,
				unlocked: false,
			});
		}
	}
	return generators;
};



// WEBPACK FOOTER //
// ./src/data/generators/index.ts