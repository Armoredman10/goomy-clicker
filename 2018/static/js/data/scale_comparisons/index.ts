import { BigNumber } from "src/lib/bignum";
import ScaleComparisonBasis from "./types";

import { length_comparisons } from "./length";
import { area_comparisons } from "src/data/scale_comparisons/area";
import { volume_comparisons } from "./volume";

const null_comparison: ScaleComparisonBasis = {
	unit: new BigNumber("1"),
	range: [new BigNumber("0"), new BigNumber("Infinity")],
	id: "missing",
	type: "none",
	one: "",
	other: ""
};

export const comparison_types = {
	"length": "Your swath of Goomies, laid out end to end, would {item}.",
	"area": "Your swath of Goomies, huddled against each other, would {item}.",
	"volume": "Your swath of Goomies, packed tightly, would {item}.",
	"weight": "Your swath of Goomies weighs as much as {item}.",
	"none": "Your swath of Goomies literally goes off the charts of what we can measure."
}

export const scale_comparisons: ScaleComparisonBasis[] = [
	...length_comparisons,
	...area_comparisons,
	...volume_comparisons,
];

export const getRandomScaleComparison = (count: BigNumber): ScaleComparisonBasis => {
	const suitable_comparisons = scale_comparisons.filter(
		comp => count.gte(comp.range[0]) && count.lte(comp.range[1])
	);
	if (suitable_comparisons.length === 0) {
		return null_comparison;
	}
	return suitable_comparisons[Math.floor(Math.random() * suitable_comparisons.length)];
}



// WEBPACK FOOTER //
// ./src/data/scale_comparisons/index.ts