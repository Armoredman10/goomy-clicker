import { observable, action, computed } from "mobx";

import { BigNumber } from "src/lib/bignum";
import { JSONObject, Serializable } from "../save/Serializable";

export interface GoomyCountDictionary extends JSONObject {
	goomies: string;
	total_goomies: string;
	total_total_goomies: string;
	gps: string; /* Goomies per second */
	gpc: string; /* Goomies per click */
}

export default class GoomyCount implements Serializable<GoomyCountDictionary> {

	@observable goomies: BigNumber;
	@observable total_goomies: BigNumber;
	@observable total_total_goomies: BigNumber;
	@observable gps: BigNumber;
	@observable gpc: BigNumber;
	start_callback: () => void;

	constructor(initial_data: GoomyCountDictionary) {
		this.goomies = new BigNumber(initial_data.goomies);
		this.gps = new BigNumber(initial_data.gps);
		this.gpc = new BigNumber(initial_data.gpc);
		this.total_goomies = new BigNumber(initial_data.total_goomies)
		this.total_total_goomies = new BigNumber(initial_data.total_total_goomies)
	}

	@action update = (ms: number) => {
		// this.goomies += this.gps * ms / 1000;
		this.earn(this.gps.times(new BigNumber(ms).div(1000)));
	}

	@action click = () => {
		this.earn(this.gpc);
	}

	@action setGPS(gps: BigNumber, ms: number) {
		this.update(ms);
		this.gps = gps;
	}

	@action setGPC(gpc: BigNumber) {
		this.gpc = gpc;
	}

	@action earn(goomies: BigNumber | string) {
		if (!(goomies instanceof BigNumber)) goomies = new BigNumber(goomies);

		if (goomies.isGreaterThan(0)) this.start_callback();
		this.add(goomies);
		this.total_goomies = this.total_goomies.plus(goomies);
		this.total_total_goomies = this.total_total_goomies.plus(goomies);
	}

	@action add(goomies: BigNumber) {
		this.goomies = this.goomies.plus(goomies);
	}

	@action spend(goomies: BigNumber) {
		this.goomies = this.goomies.minus(goomies);
	}

	@computed get raw_goomy_string() {
		return this.goomies.toFixed(0, BigNumber.ROUND_DOWN).toString();
	}

	@computed get raw_gps_string() {
		return this.gps.toFixed(0, BigNumber.ROUND_DOWN).toString();
	}

	timeToCost(cost: BigNumber) {
		if (cost.isLessThanOrEqualTo(this.goomies)) return new BigNumber(0);
		else return cost.minus(this.goomies).dividedBy(this.gps);
	}

	serialize() {
		var { goomies, gps, gpc, total_goomies, total_total_goomies } = this;
		return {
			goomies: goomies.toString(),
			gps: gps.toString(),
			gpc: gpc.toString(),
			total_goomies: total_goomies.toString(),
			total_total_goomies: total_total_goomies.toString(),
		};
	}
}



// WEBPACK FOOTER //
// ./src/gamestate/GoomyCount.ts