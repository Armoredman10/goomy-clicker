import DialogState from "./DialogState";
import { observable, action } from "mobx";
import { Serializable } from "../save/Serializable";

export interface HeavenlyMeadowDict {
	transitioned: boolean;
	showing_stats: boolean;
}

export default class HeavenlyMeadow implements Serializable<HeavenlyMeadowDict> {
	dialog_state: DialogState = new DialogState();
	@observable transitioned: boolean = false;
	@observable showing_stats: boolean = false;

	serialize() {
		const { transitioned, showing_stats } = this;
		return { transitioned, showing_stats };
	}

	setData(data: HeavenlyMeadowDict) {
		this.transitioned = data.transitioned;
		if (data.showing_stats) this.showing_stats = data.showing_stats;
	}

	@action transitionFromDialog() {
		this.transitioned = true;
	}

	@action showStats() {
		this.showing_stats = true;
	}
}



// WEBPACK FOOTER //
// ./src/gamestate/HeavenlyMeadow.ts