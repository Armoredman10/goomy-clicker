import * as React from "react";
import { observable, action, computed } from "mobx";

class DialogFrame {
	image_url: string;
	text: React.ReactNode;
}

type DialogFrameWithId = DialogFrame & { id: string; };

export default class DialogState {

	@observable active: boolean = false;
	@observable loaded: boolean = false;
	@observable frames: DialogFrameWithId[] = observable([]);
	onFinish: () => void;

	@action appendFrames(frames: DialogFrame[], onFinish: () => void) {
		this.active = true;
		this.loaded = false;
		this.frames = this.frames.concat(frames.map(
			(frame, i) => { return { ...frame, id: "pane" + i } })
		);
		this.onFinish = onFinish;
		Promise.all(frames.map(frame => {
			return new Promise((res, rej) => {
				var image = new Image();
				image.src = frame.image_url;
				image.onload = res;
				image.onerror = res;
			});
		}).concat([
			new Promise((res) => { setTimeout(res, 5000); })
		])).then(() => { this.loaded = true; })
	}

	@action advance = () => {
		if (this.frames.length == 0) {
			return;
		}
		this.frames.shift();
		if (this.frames.length == 0) {
			this.active = false;
			this.onFinish();
		}
	}

	@computed get image_url() {
		if (this.frames.length == 0) return "";
		return this.frames[0].image_url;
	}

	@computed get text() {
		if (this.frames.length == 0) return "";
		return this.frames[0].text;
	}

	@computed get current_frame_id() {
		if (this.frames.length == 0) return -1;
		return this.frames[0].id;
	}
}



// WEBPACK FOOTER //
// ./src/gamestate/DialogState.ts