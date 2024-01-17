import { BigNumber } from "src/lib/bignum";
import ScaleComparisonBasis from "./types";

export const area_comparisons: ScaleComparisonBasis[] = [
	{
		unit: new BigNumber("213.026"),
		range: [new BigNumber("0"), new BigNumber("213.026e+3")],
		id: "parking_space_area",
		zero: "cover a postage stamp",
		one: "cover a parking space",
		other: "cover {count} parking spaces",
	},
	{
		unit: new BigNumber("17692"),
		range: [new BigNumber("0"), new BigNumber("17692e+3")],
		id: "olympic_pool_area",
		zero: "cover a postage stamp",
		one: "cover the surface of an Olympic-sized swimming pool",
		other: "cover the surface of {count} Olympic-sized swimming pools",
	},
	{
		unit: new BigNumber("66816"),
		range: [new BigNumber("66816"), new BigNumber("66816e+6")],
		id: "football_field_area",
		one: "cover a football field",
		other: "cover {count} football fields",
	},
	{
		unit: new BigNumber("72197027600849.26"),
		range: [new BigNumber("72197027600849.26"), new BigNumber("72197027600849260")],
		id: "earth_surface_percent",
		one: "cover 1.0% of the Earth's surface",
		other: "cover {count}% of the Earth's surface",
	},
	{
		unit: new BigNumber("7219702760084926"),
		range: [new BigNumber("72197027600849260"), new BigNumber("7219702760084926e+6")],
		id: "earth_surface",
		one: "cover the Earth's surface",
		other: "cover the Earth's surface {count} layers deep",
	},
	/*
		{
			unit: new BigNumber(""),
			range: [new BigNumber(""), new BigNumber("")],
			id: "",
			one: "",
			other: "",
		},
	*/
].map(comp => { return { ...comp, type: "area" } as ScaleComparisonBasis; });



// WEBPACK FOOTER //
// ./src/data/scale_comparisons/area.ts