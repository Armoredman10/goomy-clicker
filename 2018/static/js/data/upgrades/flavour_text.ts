interface UpgradeFlavourText {
	name: string;
	description: {
		text: string,
		value: string,
	}
	caption: string;
}

export const upgrade_flavour_text: { [id: string]: UpgradeFlavourText } = {
	"gcm1": {
		name: "Genuine Parts Company",
		description: {
			text: "The mouse and cursors gain {value} Goomies per generator per level above 5.",
			value: "0.5"
		},
		caption: "I know we produce automotive parts as our company function, but Goomies help with lubricant."
	},
	"gcm2": {
		name: "Georgia Perimeter College",
		description: {
			text: "The mouse and cursors gain {value} Goomies per generator per level above 10.",
			value: "2"
		},
		caption: "We've allocated 10% of our college's tuition revenue to Goomy research."
	},
	"gcm3": {
		name: "Green Party of Canada",
		description: {
			text: "The mouse and cursors gain {value} Goomies per generator per level above 20.",
			value: "10"
		},
		caption: "Hi, I'm Elizabeth May and I promise to offer free, environmentally certified Goomies to anyone who needs them."
	},
	"gcm4": {
		name: "Gigaparsec",
		description: {
			text: "The mouse and cursors gain {value} Goomies per generator per level above 40.",
			value: "100"
		},
		caption: "I heard that your swath of Goomies laid end to end is up to a gigaparsec now. No? Sure seems like it from here."
	},
	"gcm5": {
		name: "Giant Papillary Conjunctivitis",
		description: {
			text: "The mouse and cursors gain {value} Goomies per generator per level above 80.",
			value: "1000"
		},
		caption: "With this many Goomies being produced, I'm surprised your eyes aren't already allergic."
	},
	// youngsters
	"youngster_great": {
		name: "Great Ball",
		description: {
			text: "Youngsters gain {value} base GpS.",
			value: "0.5"
		},
		caption: "Great Balls have a higher catch rate.",
	},
	"youngster_ultra": {
		name: "Ultra Ball",
		description: {
			text: "Youngsters gain {value} base GpS.",
			value: "3.5"
		},
		caption: "Ultra Balls have a much higher catch rate.",
	},
	"youngster_final": {
		name: "Master Ball",
		description: {
			text: "Youngsters gain {value} base GpS.",
			value: "100"
		},
		caption: "With this, I can catch every Goomy in the universe without fail.",
	},
	"youngster1": {
		name: "Comfy Shorts",
		description: {
			text: "Youngsters become {value} as efficient.",
			value: "twice"
		},
		caption: "These shorts are easy to wear and make catching Goomies easier too!",
	},
	"youngster2": {
		name: "Sweet Scent",
		description: {
			text: "Youngsters become {value} as efficient.",
			value: "twice"
		},
		caption: "With Sweet Scent, I can attract more Goomies to my present location.",
	},
	"youngster3": {
		name: "Honey Tree",
		description: {
			text: "Youngsters become {value} as efficient.",
			value: "twice"
		},
		caption: "If I slather honey on this tree, Goomies will be attracted to it",
	},
	"youngster4": {
		name: "Ace Trainer",
		description: {
			text: "Youngsters become {value} as efficient.",
			value: "twice"
		},
		caption: "I have my own team of Pokémon! What am I still doing catching Goomies?",
	},
	"youngster5": {
		name: "Team Rocket",
		description: {
			text: "Youngsters become {value} as efficient.",
			value: "twice"
		},
		caption: "Steal Goomies for profit. Exploit Goomies for profit. All Goomies exist for the sake of Team Rocket.",
	},
	"youngster6": {
		name: "Gym Leader",
		description: {
			text: "Youngsters become {value} as efficient.",
			value: "twice"
		},
		caption: "I love Goomies so much, my whole team is made of Goomies!",
	},
	"youngster7": {
		name: "Elite Four",
		description: {
			text: "Youngsters become {value} as efficient.",
			value: "twice"
		},
		caption: "Goomy is love, Goomy is life. Can you withstand the power of my Goomies?",
	},
	"youngster8": {
		name: "Champion",
		description: {
			text: "Youngsters become {value} as efficient.",
			value: "twice"
		},
		caption: "I've come a long way from just catching one Goomy at a time.",
	},
	"youngster9": {
		name: "Professor Oak",
		description: {
			text: "Youngsters become {value} as efficient.",
			value: "twice"
		},
		caption: "I sent you out there. Now it's time you faced me.",
	},
	"youngster10": {
		name: "Snag Machine",
		description: {
			text: "Youngsters become {value} as efficient.",
			value: "twice"
		},
		caption: "All your Goomies are belong to me! ALL! HAHA! MINE!",
	},
	"youngster11": {
		name: "World Champion",
		description: {
			text: "Youngsters become {value} as efficient.",
			value: "twice"
		},
		caption: "I'm the best Pokémon Trainer in the world now, and it's all thanks to Goomy.",
	},
	"youngster12": {
		name: "Legendary Champion",
		description: {
			text: "Youngsters become {value} as efficient.",
			value: "twice"
		},
		caption: "My Goomy helped me through catching Mewtwo, Ho-oh, Lugia, Groudon, Kyogre, Rayquaza, Dialga, Palkia, Giratina, Reshiram and Zekrom, Xerneas and Yveltal, and every other legendary Pokémon on the planet.",
	},
	// Daycare
	"daycare1": {
		name: "Baby Bonus",
		description: {
			text: "Daycares gain {value} base GpS.",
			value: "4"
		},
		caption: "The daycare is offering a 100-pyen rebate for Pokémon that produce eggs.",
	},
	"daycare2": {
		name: "Ditto Camp",
		description: {
			text: "Daycares become {value} as efficient.",
			value: "twice"
		},
		caption: "Looks like somebody's trying to breed for six perfect IV's.",
	},
	"daycare3": {
		name: "Level Rate Discount",
		description: {
			text: "Daycares become {value} as efficient.",
			value: "twice"
		},
		caption: "The daycare is changing their rates. Only 50 pyen per level now.",
	},
	"daycare4": {
		name: "Four Slots",
		description: {
			text: "Daycares become {value} as efficient.",
			value: "twice"
		},
		caption: "Woohoo, now we can put four Pokémon in instead of just two!",
	},
	"daycare5": {
		name: "Three-perfect-IV guarantee",
		description: {
			text: "Daycares become {value} as efficient.",
			value: "twice"
		},
		caption: "Looks like everyone's trying for six perfect IV's now.",
	},
	"daycare_youngster": {
		name: "Volunteer Interns",
		description: {
			text: "Daycares and youngsters both become {value} as efficient.",
			value: "twice"
		},
		caption: "Don't tell anyone, but we're paying them 50% of minimum wage under the table.",
	},
	// Reserve
	"reserve1": {
		name: "Breeding Program",
		description: {
			text: "Reserves gain {value} base GpS.",
			value: "50"
		},
		caption: "If we induce more active breeding in the Goomies, they'll reproduce a little faster.",
	},
	"reserve2": {
		name: "Pollution Removal",
		description: {
			text: "Reserves become {value} as efficient.",
			value: "twice"
		},
		caption: "These Goomies need the freshest air we can give them.",
	},
	"reserve3": {
		name: "National Park Status",
		description: {
			text: "Reserves become {value} as efficient.",
			value: "twice"
		},
		caption: "Now that our Goomies are no longer threatened by private interests, they're free to live without a care.",
	},
	"reserve4": {
		name: "Expansion Program",
		description: {
			text: "Reserves become {value} as efficient.",
			value: "twice"
		},
		caption: "We've petitioned the government to expand the area of our national park. If they disagree, we'll send all the Goomies they aren't giving a home straight to the national capital in protest.",
	},
	"reserve5": {
		name: "Reintroduction",
		description: {
			text: "Reserves become {value} as efficient.",
			value: "twice"
		},
		caption: "Our Goomy population in the reserve is stable enough that we can let them bleed out into the zones outside of the National Park and they won't be in danger.",
	},
	"reserve_youngster": {
		name: "Park Rangers",
		description: {
			text: "Reserves and youngsters both become {value} as efficient.",
			value: "twice"
		},
		caption: "It's not the most exciting of jobs, but at least they're paying us minimum wage now.",
	},
	// Farm
	"farm1": {
		name: "Steroids",
		description: {
			text: "Farms gain {value} base GpS.",
			value: "300"
		},
		caption: "They may be illegal for sports, but we're making a killing off of them.",
	},
	"farm2": {
		name: "Growth Hormone",
		description: {
			text: "Farms become {value} as efficient.",
			value: "twice"
		},
		caption: "If they grow faster, they can breed faster.",
	},
	"farm3": {
		name: "Feedlot",
		description: {
			text: "Farms become {value} as efficient.",
			value: "twice"
		},
		caption: "Machines make everything easier.",
	},
	"farm4": {
		name: "Genetic Modification",
		description: {
			text: "Farms become {value} as efficient.",
			value: "twice"
		},
		caption: "Our genetically modified Goomies are virtually identical to organically grown ones.",
	},
	"farm5": {
		name: "Hormonal Therapy",
		description: {
			text: "Farms become {value} as efficient.",
			value: "twice"
		},
		caption: "Apparently growth hormone wasn't enough. We're introducing even more stimulants.",
	},
	"farm_youngster": {
		name: "Hired Hands",
		description: {
			text: "Farms and youngsters both become {value} as efficient.",
			value: "twice"
		},
		caption: "They're paying us 1500 pyen an hour! Who knew Goomy farming was so lucrative?",
	},
	// Goopy Fountain
	"fountain1": {
		name: "Waterfall Source",
		description: {
			text: "Goopy fountains gain {value} base GpS.",
			value: "1500"
		},
		caption: "Goomies that have fresh water in them are healthier in general. Or just plumper, I can't tell.",
	},
	"fountain2": {
		name: "Geyser",
		description: {
			text: "Goopy fountains become {value} as efficient.",
			value: "twice"
		},
		caption: "Agitating the water makes it more prone to inducing the chemical reactions required to create and sustain life.",
	},
	"fountain3": {
		name: "Old Faithful",
		description: {
			text: "Goopy fountains become {value} as efficient.",
			value: "twice"
		},
		caption: "Agitating the water even more gives it even more energy.",
	},
	"fountain4": {
		name: "Fountain of Youth",
		description: {
			text: "Goopy fountains become {value} as efficient.",
			value: "twice"
		},
		caption: "Our research shows that Goomies that stay youthful stay sexually active.",
	},
	"fountain5": {
		name: "Volcanic Spring",
		description: {
			text: "Goopy fountains become {value} as efficient.",
			value: "twice"
		},
		caption: "Creating a warm, moist environment for Goomies to live in like those geothermal trenches is more conducive to successful production than anything else you can do.",
	},
	"fountain_youngster": {
		name: "Janitors",
		description: {
			text: "Goopy fountains and youngsters both become {value} as efficient.",
			value: "twice"
		},
		caption: "The best perk of this job is that we get to bathe in the fountain after work. It makes up for the abysmal wages.",
	},
	// Geothermal Cave
	"cave1": {
		name: "Gelatinous stalagmites",
		description: {
			text: "Geothermal caves gain {value} base GpS.",
			value: "10,000"
		},
		caption: "I don't know how we did it, but Goomies love this stuff growing on the ground of the caves.",
	},
	"cave2": {
		name: "Underground hot springs",
		description: {
			text: "Geothermal caves become {value} as efficient.",
			value: "twice"
		},
		caption: "By linking the caves up to the goopy fountains, they can feed off each other's processes.",
	},
	"cave3": {
		name: "Flash floods",
		description: {
			text: "Geothermal caves become {value} as efficient.",
			value: "twice"
		},
		caption: "A flash flood makes water enter the cave, which erodes more rock, which creates more caverns for the water table to seep into, which produces more Goomies.",
	},
	"cave4": {
		name: "Mining expeditions",
		description: {
			text: "Geothermal caves become {value} as efficient.",
			value: "twice"
		},
		caption: "The flash floods created a lot of new veins for us to look at.",
	},
	"cave5": {
		name: "Unknown Dungeon",
		description: {
			text: "Geothermal caves become {value} as efficient.",
			value: "twice"
		},
		caption: "So we found a place where you can just \"farm\" Level 1 Goomies eternally because they keep cropping up in the cave like Zubats every two steps you take.",
	},
	"cave_youngster": {
		name: "Spelunkers",
		description: {
			text: "Geothermal caves and youngsters both become {value} as efficient.",
			value: "twice"
		},
		caption: "As long as they have a Rattata that knows Flash, kids are great surveyors of caves because they can get into those tight spaces adults can't reach. And we don't have to pay them as much!",
	},
	// Oceanic Trench
	"trench1": {
		name: "Deep Sea Exploration",
		description: {
			text: "Oceanic trenches gain {value} base GpS.",
			value: "50,000"
		},
		caption: "We're navigating the sea floor, ten thousand metres deep, to find better places to extract Goomy-making material.",
	},
	"trench2": {
		name: "Fracking",
		description: {
			text: "Oceanic trenches become {value} as efficient.",
			value: "twice"
		},
		caption: "It turns out that this big petroleum company is interested in investing with us. And one of the layers in the oil distillation process is perfect for creating Goomies!",
	},
	"trench3": {
		name: "Offshore Drilling",
		description: {
			text: "Oceanic trenches become {value} as efficient.",
			value: "twice"
		},
		caption: "The further out in the ocean we drill, the more proven reserves we find of all sorts.",
	},
	"trench4": {
		name: "Seismic Generators",
		description: {
			text: "Oceanic trenches become {value} as efficient.",
			value: "twice"
		},
		caption: "It turns out if we create our own fissures, it's just as good for creating Goomies as natural formations. Maybe terrible for the ecosystem, though.",
	},
	"trench5": {
		name: "Company Buyout",
		description: {
			text: "Oceanic trenches become {value} as efficient.",
			value: "twice"
		},
		caption: "So it turns out the that petroleum company mostly wanted the oil, but they're happy to let us keep producing Goomies if it means more oil for them.",
	},
	"trench_youngster": {
		name: "Rig Operators",
		description: {
			text: "Oceanic trenches and youngsters both become {value} as efficient.",
			value: "twice"
		},
		caption: "When I signed up to operate a trench, I thought I was going to be exploring the sea floor, looking for good places to plant underwater Goomies. But who cares, I'm raking it in on this rig!",
	},
	// Enslaved Arceus
	"arceus1": {
		name: "Dragon Plate",
		description: {
			text: "Enslaved Arceus gain {value} base GpS.",
			value: "400,000"
		},
		caption: "A Dragon-type Arceus produces Dragon-type Goomies more easily.",
	},
	"arceus2": {
		name: "EV Training",
		description: {
			text: "Enslaved Arceus become {value} as efficient.",
			value: "twice"
		},
		caption: "We need to train Arceus' EVs in... childbirth?",
	},
	"arceus3": {
		name: "Thousand Arms",
		description: {
			text: "Enslaved Arceus become {value} as efficient.",
			value: "twice"
		},
		caption: "It created the universe with a thousand arms, and now we're making it create Goomies.",
	},
	"arceus4": {
		name: "Giratina",
		description: {
			text: "Enslaved Arceus become {value} as efficient.",
			value: "twice"
		},
		caption: "We found that showing Giratina to Arceus stimulated it to go faster.",
	},
	"arceus5": {
		name: "Meta-breeding",
		description: {
			text: "Enslaved Arceus become {value} as efficient.",
			value: "twice"
		},
		caption: "Who knew that breeding the Arceus themselves would speed up Goomy production?",
	},
	"arceus_youngster": {
		name: "Slave Drivers",
		description: {
			text: "Oceanic trenches and youngsters both become {value} as efficient.",
			value: "twice"
		},
		caption: "They're not fit for this job, they said. It's irresponsible to put such power in the hands of little children, they said. Well I don't care! *whip* MAKE THOSE GOOMIES!",
	},
	// Cloning Lab
	"cloning_lab1": {
		name: "Government Grant",
		description: {
			text: "Cloning labs gain {value} base GpS.",
			value: "3,000,000"
		},
		caption: "We'll use 50 million pyen to research DNA implantation techniques, and another 50 million to appease our supervisors.",
	},
	"cloning_lab2": {
		name: "Asexual Reproduction",
		description: {
			text: "Cloning labs become {value} as efficient.",
			value: "twice"
		},
		caption: "Taking sex out of the equation altogether really speeds things up.",
	},
	"cloning_lab3": {
		name: "Genome Sequencer",
		description: {
			text: "Cloning labs become {value} as efficient.",
			value: "twice"
		},
		caption: "The Human Genome Project's got nothing on this.",
	},
	"cloning_lab4": {
		name: "Second Government Grant",
		description: {
			text: "Cloning labs become {value} as efficient.",
			value: "twice"
		},
		caption: "That research grant really flew by quickly. We need ten times as much money now.",
	},
	"cloning_lab5": {
		name: "Molecular Synthesizer",
		description: {
			text: "Cloning labs become {value} as efficient.",
			value: "twice"
		},
		caption: "Let's just hope it doesn't create a black hole on us.",
	},
	"cloning_lab_youngster": {
		name: "Grad Students",
		description: {
			text: "Cloning labs and youngsters both become {value} as efficient.",
			value: "twice"
		},
		caption: "They're not paying us at all in here! But if we unionize, they're threatening to just cancel the whole program.",
	},
	// Church of Goomy
	"church_of_goomy1": {
		name: "Let there be light!",
		description: {
			text: "Church buildings gain {value} base GpS.",
			value: "10,000,000"
		},
		caption: "The Great Goomy separated the light from the darkness, calling them day and night. And there was evening, and there was morning - the first day.",
	},
	"church_of_goomy2": {
		name: "Let there be sky!",
		description: {
			text: "Church buildings become {value} as efficient.",
			value: "twice"
		},
		caption: "And the Great Goomy created an expanse that separated the waters from each other. And there was evening, and there was morning - the second day.",
	},
	"church_of_goomy3": {
		name: "Let there be ground!",
		description: {
			text: "Church buildings become {value} as efficient.",
			value: "twice"
		},
		caption: "And the Great Goomy made dry ground appear, and it called the ground land, and the water sea. And it made plants and trees that bore seed according to their kinds. And there was evening, and there was morning - the third day.",
	},
	"church_of_goomy4": {
		name: "Let there be stars!",
		description: {
			text: "Church buildings become {value} as efficient.",
			value: "twice"
		},
		caption: "And the Great Goomy created lights in the sky to mark the seasons, and two great lights - the greater light to rule the day and the lesser light to rule the night. And there was evening, and there was morning - the fourth day.",
	},
	"church_of_goomy5": {
		name: "Let there be animals!",
		description: {
			text: "Church buildings become {value} as efficient.",
			value: "twice"
		},
		caption: "And the Great Goomy let the waters teem with creatures, each according to its kind, and every winged bird in the sky according to its kind. And there was evening and there was morning - the fifth day.",
	},
	"church_of_goomy6": {
		name: "Let there be livestock!",
		description: {
			text: "Church buildings become {value} as efficient.",
			value: "twice"
		},
		caption: "And the Great Goomy made the beasts of the Earth according to their kinds, and the livestock and the creatures that crawl on the Earth, each according to its kind. And there was evening and there was morning - the sixth day.",
	},
	"church_of_goomy7": {
		name: "Let there be rest!",
		description: {
			text: "Drops church buildings' GpS to {value}. Every other generator becomes twice as efficient as a result.",
			value: "zero"
		},
		caption: "And the Great Goomy rested on the seventh day.",
	},
	"church_of_goomy_youngster": {
		name: "High Priests",
		description: {
			text: "Church buildings and youngsters both become {value} as efficient.",
			value: "twice"
		},
		caption: "By the power of the Great Goomy, the Heavenly Sliggoo, and the Divine Goodra, I declare you saved by His Squishiness. Also, please give alms, this job doesn't have a salary.",
	},
	// RNG Abuser
	"rng_abuser1": {
		name: "32-bit processor",
		description: {
			text: "RNG abusers become {value} as efficient.",
			value: "twice"
		},
		caption: "It's 2018. What am I doing still using an 8086?",
	},
	"rng_abuser2": {
		name: "64-bit processor",
		description: {
			text: "RNG abusers become {value} as efficient.",
			value: "twice"
		},
		caption: "It's 2018. What am I doing still using a Pentium III?",
	},
	"rng_abuser3": {
		name: "Dual-core processor",
		description: {
			text: "RNG abusers become {value} as efficient.",
			value: "twice"
		},
		caption: "It's 2018. What am I doing still using an Athlon 64?",
	},
	"rng_abuser4": {
		name: "Quad-core processor",
		description: {
			text: "RNG abusers become {value} as efficient.",
			value: "twice"
		},
		caption: "It's 2018. What am I doing still using a Core 2 Duo?",
	},
	"rng_abuser5": {
		name: "Server cloud",
		description: {
			text: "RNG abusers become {value} as efficient.",
			value: "twice"
		},
		caption: "It's 2018. What am I doing still using a standalone computer?",
	},
	"rng_abuser_youngster": {
		name: "Idealistic Hackers",
		description: {
			text: "RNG abusers and youngsters both become {value} as efficient.",
			value: "twice"
		},
		caption: "It's always the young ones that go further than you expect. We mostly pay them in equity because they have dreams of being billionaires when our business grows.",
	},
	// Photon Collider
	"photon_collider1": {
		name: "",
		description: {
			text: "Photon colliders gain {value} base GpS.",
			value: "2,002,075,420"
		},
		caption: "",
	},
	"photon_collider2": {
		name: "Wormhole",
		description: {
			text: "Photon colliders become {value} as efficient.",
			value: "twice"
		},
		caption: "If we make the photons collide twice as fast, they'll produce twice the Goomies.",
	},
	"photon_collider3": {
		name: "Warp Drive 2",
		description: {
			text: "Photon colliders become {value} as efficient.",
			value: "twice"
		},
		caption: "We miscalculated. That last upgrade only made them collide sqrt(2) times as fast.",
	},
	"photon_collider4": {
		name: "Reissner-Nordström Anomaly",
		description: {
			text: "Photon colliders become {value} as efficient.",
			value: "twice"
		},
		caption: "If we collide photons through electrically charged black holes, the Goomy-producing portion gets filtered out and we can isolate that to produce more of them!",
	},
	"photon_collider5": {
		name: "Quantum Goomies",
		description: {
			text: "Photon colliders become {value} as efficient.",
			value: "twice"
		},
		caption: "The photons we're using now are in superstate of producing Goomies and not producing Goomies. Collapsing them into a state of always producing Goomies makes them more useful.",
	},
	"photon_collider_youngster": {
		name: "Defense Lobbyists",
		description: {
			text: "Photon colliders and youngsters both become {value} as efficient.",
			value: "twice"
		},
		caption: "You thought it was going to be more grad students, didn't you? Well this time around we're just lobbying for the US government to give us funding into... particle physics research.",
	},
	/*
	"goothulhu_youngster": {
		name: "Suicide Cultists",
		description: {
			text: "Goothulhu and youngsters both become {value} as efficient.",
			value: "twice"
		},
		caption: "None of us want to be here. Their only pay to us is the sweet release of death as we sacrifice our bodies, minds, and livelihoods to promote Goothulhu.",
	},
	"cryptogoomies_server_farm_youngster": {
		name: "Idealistic Hackers",
		description: {
			text: "Cryptogoomies server farms and youngsters both become {value} as efficient.",
			value: "twice"
		},
		caption: "Unlike those RNG abuser assholes who only pay in that worthless equity, we pay our workers with Ether on the blockchain, which is a type of money that's even more real than money itself.",
	},
	"ecosystem_simulator_youngster": {
		name: "Tech Support",
		description: {
			text: "Ecosystem simulators and youngsters both become {value} as efficient.",
			value: "twice"
		},
		caption: "Every ecosystem simulator has a dedicated tech support line that people within the interface can call to have outside help with any difficulties. We're essentially the tiny gods of these universes.",
	},
	// Repopulated Planet
	"repopulated_planet1": {
		name: "Search Algorithm",
		description: {
			text: "Repopulated planets gain {value} base GpS.",
			value: "3,160"
		},
		caption: "We weren't looking in the right places for good planets to repopulate.",
	},
	"repopulated_planet2": {
		name: "Dry Farming",
		description: {
			text: "Repopulated planets become {value} as efficient.",
			value: "twice"
		},
		caption: "The Goomies didn't make optimal use of the surface area given to them. Hopefully making the land artificially arable will help with production.",
	},
	"repopulated_planet3": {
		name: "Terraforming",
		description: {
			text: "Repopulated planets become {value} as efficient.",
			value: "twice"
		},
		caption: "The answer was to make other planets like Earth all along!",
	},
	"repopulated_planet4": {
		name: "Gas Giant",
		description: {
			text: "Repopulated planets become {value} as efficient.",
			value: "twice"
		},
		caption: "Goomies are 97% water anyway. We can put them on bigger planets.",
	},
	"repopulated_planet5": {
		name: "Dyson Sphere",
		description: {
			text: "Repopulated planets become {value} as efficient.",
			value: "twice"
		},
		caption: "If we use a whole star to raise them, they've got to produce more quickly!",
	},
	"repopulated_planet_youngster": {
		name: "Adam and Eve",
		description: {
			text: "Repopulated planets and youngsters both become {value} as efficient.",
			value: "twice"
		},
		caption: "Just in case the Goomies needed tending to, they sent seven pairs of humans to each planet on a spaceship. Two by two they came, as the waters flooded each planet they left.",
	},
	"stellar_nursery_youngster": {
		name: "Star Children",
		description: {
			text: "Stellar nurseries and youngsters both become {value} as efficient.",
			value: "twice"
		},
		caption: "There before him, a glittering toy no Star Child could resist, floated the remains of a distant star with all the Goomies it could create. They knew exactly what they wanted to do with it.",
	},
	"galactic_nursery_youngster": {
		name: "Monolithic Children",
		description: {
			text: "Galactic nurseries and youngsters both become {value} as efficient.",
			value: "twice"
		},
		caption: "ALL THESE WORLDS ARE YOURS EXCEPT THE REPOPULATED PLANETS WE OWN. ATTEMPT NO LANDINGS THERE.",
	},
	*/
};



// WEBPACK FOOTER //
// ./src/data/upgrades/flavour_text.ts