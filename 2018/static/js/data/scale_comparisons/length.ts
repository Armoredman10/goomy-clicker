import { BigNumber } from "src/lib/bignum";
import ScaleComparisonBasis from "./types";

export const length_comparisons: ScaleComparisonBasis[] = [
	{
		unit: new BigNumber("9.5415"),
		range: [new BigNumber("0"), new BigNumber("250")],
		id: "parking_space_length",
		zero: "span the width of a human hair",
		one: "stretch across a parking space",
		other: "stretch across {count} parking spaces",
	},
	{
		unit: new BigNumber("86.9565"),
		range: [new BigNumber("87"), new BigNumber("250")],
		id: "olympic_pool_length",
		one: "stretch across an Olympic-sized swimming pool",
		other: "stretch across {count} Olympic-sized swimming pools",
	},
	{
		unit: new BigNumber("365.217"),
		range: [new BigNumber("365"), new BigNumber("36500")],
		id: "football_field_length",
		one: "stretch across a football field",
		other: "stretch across {count} football fields",
	},
	{
		unit: new BigNumber("1924.62"),
		range: [new BigNumber("1924"), new BigNumber("192400")],
		id: "cn_tower_height",
		one: "stack up as high as the CN Tower",
		other: "stack up {count} times as high as the CN Tower",
	},
	{
		unit: new BigNumber("15652.2"),
		range: [new BigNumber("15625"), new BigNumber("1000000")],
		id: "walk_1_hour",
		one: "reach the distance a person can walk in 1 hour",
		other: "reach the distance a person can walk in {count} hours",
	},
	{
		unit: new BigNumber("51460.9"),
		range: [new BigNumber("51460"), new BigNumber("51460e+2")],
		id: "gibraltar_strait",
		one: "stretch across the Gibraltar Strait",
		other: "stretch across the Gibraltar Strait {count} times",
	},
	{
		unit: new BigNumber("115130"),
		range: [new BigNumber("115130"), new BigNumber("115130e+2")],
		id: "english_channel",
		one: "stretch across the English Channel",
		other: "stretch across the English Channel {count} times",
	},
	{
		unit: new BigNumber("347826"),
		range: [new BigNumber("347826"), new BigNumber("8347826")],
		id: "drive_1_hour",
		one: "reach the distance a car can drive in 1 hour",
		other: "reach the distance a car can drive in {count} hours",
	},
	{
		unit: new BigNumber("68730000"),
		range: [new BigNumber("68730000"), new BigNumber("68730000e+3")],
		id: "pacific_ocean",
		one: "stretch across the Pacific Ocean",
		other: "stretch across the Pacific Ocean {count} times",
	},
	{
		unit: new BigNumber("139130000"),
		range: [new BigNumber("139130000"), new BigNumber("139130000e+6")],
		id: "around_the_world",
		one: "circle the Earth",
		other: "circle the Earth {count} times",
	},
	{
		unit: new BigNumber("1042756375"),
		range: [new BigNumber("1042756375"), new BigNumber("62565382500")],
		id: "light_second",
		one: "span the distance that light travels in a second",
		other: "span the distance that light travels in {count} seconds",
	},
	{
		unit: new BigNumber("62565382500"),
		range: [new BigNumber("62565382500"), new BigNumber("3753922950000")],
		id: "light_minute",
		one: "span the distance that light travels in a minute",
		other: "span the distance that light travels in {count} minutes",
	},
	{
		unit: new BigNumber("3753922950000"),
		range: [new BigNumber("3753922950000"), new BigNumber("3753922950000e+2")],
		id: "light_hour",
		one: "span the distance that light travels in an hour",
		other: "span the distance that light travels in {count} hours",
	},
	{
		unit: new BigNumber("90094150800000"),
		range: [new BigNumber("90094150800000"), new BigNumber("90094150800000e+6")],
		id: "light_day",
		one: "span the distance that light travels in a day",
		other: "span the distance that light travels in {count} days",
	},
	{
		unit: new BigNumber("3.290782608695651e16"),
		range: [new BigNumber("3.290782608695651e16"), new BigNumber("3.290782608695651e24")],
		id: "light_year",
		one: "span the distance that light travels in a year",
		other: "span the distance that light travels in {count} years",
	},
].map(comp => { return { ...comp, type: "length" } as ScaleComparisonBasis; });



// WEBPACK FOOTER //
// ./src/data/scale_comparisons/length.ts