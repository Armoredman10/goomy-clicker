import { Serializable } from "src/save/Serializable";
import { observable, action, when } from "mobx";

import FlipClock from '../jquery/flip_clock';

import * as $ from 'jquery';
import * as React from 'react';
import GameState from "src/gamestate";

export interface YoungsterpocalypseDictionary {
	time_to_destruction: number;
	appease_count: number;
	active: boolean;
}

export default class Youngsterpocalypse implements Serializable<YoungsterpocalypseDictionary> {
	@observable time_to_destruction: number;
	@observable time_to_activation: number;
	@observable appease_count: number;
	@observable active: boolean;
	@observable countdown_speed: number = 1;

	flip_clock: FlipClock;
	onGameOver: () => void;
	recalc_callback: () => void;

	constructor() {
		this.flip_clock = new FlipClock(704, 0, this.onEnterCode.bind(this));
		this.reset();
	}

	@action reset = () => {
		this.time_to_destruction = 704 * 60 * 1000;
		this.appease_count = 0;
		this.active = false;
		$('#flip_clock').css({
			transition: "none",
			transform: "translateY(-50vh) translateY(-200px)"
		});
	}

	setData = (data: YoungsterpocalypseDictionary) => {
		this.time_to_destruction = data.time_to_destruction;
		this.appease_count = data.appease_count;
		this.active = data.active;
		if (this.active) {
			$('#flip_clock').css({
				transition: "all 1s ease",
				transform: "none"
			});
		}
	}

	serialize = () => {
		var { time_to_destruction, appease_count, active } = this;
		return { time_to_destruction, appease_count, active };
	}

	setFlipClock() {
		const seconds = Math.floor(this.time_to_destruction / 1000 + 0.7);
		this.flip_clock.set(Math.floor(seconds / 60), seconds % 60);
	}

	@action activate() {
		this.active = false;
		this.time_to_activation = 5000;
		this.flip_clock.scramble();
		this.setFlipClock();
		$('#flip_clock').css({
			transition: "all 1s ease",
			transform: "none",
		});
	}

	@action deactivate() {
		this.active = false;
		$('.game-content').css({ transform: "none" });
		$('#flip_clock').css({
			transition: "none",
			transform: "translateY(-50vh) translateY(-200px)"
		});
	}

	@action onEnterCode(code: string | null) {
		if (code == "4 8 15 16 23 42") {
			this.lost();
		} else if (code == "10 19 21 32 129 493") {
			this.appease();
		} else {
			this.guessWrong();
		}
	}

	@action appease() {
		this.appease_count += 1;
		this.time_to_destruction = 704 * 60 * 1000;
		this.activate();
		this.recalc_callback();
		$('.game-content').css({ transform: "none" });
	}

	@action lost() {
		if (this.time_to_destruction >= 108 * 60 * 1000) {
			this.time_to_destruction = 108 * 60 * 1000;
			this.activate();
		}
	}

	@action guessWrong() {
		if (!this.active) return;
		this.time_to_destruction /= 2; // cut remaining time in half
	}

	@action popUpDialog(game_state: GameState) {
		game_state.dialog_state.appendFrames([
			{
				image_url: "img/yp01.png",
				text: <p>We've been following your work.</p>
			},
			{
				image_url: "img/yp01.png",
				text: <p>powijerpaisjfpoasidjf poawijf poawij asoidfj aosjdf</p>
			},
			{
				image_url: "img/yp01.png",
				text: <p>
					But the truth is, we're mad about one thing: You just don't pay us enough.
				</p>
			},
			{
				image_url: "img/yp01.png",
				text: <p>
					Starting now, the Goomies we've amassed for you are
					charging up the biggest Draco Meteor of all time. It will
					reach your location in exactly 704 minutes.
				</p>
			},
			{
				image_url: "img/yp01.png",
				text: <p>
					If you let us keep half of what we catch, we won't bother
					you for a while again.
				</p>
			},
		],
			() => {
				this.activate();
			}
		)
	}

	@action update(ms: number) {

		if (!this.active) {
			if (this.time_to_activation > 0) {
				this.time_to_activation -= ms;
				if (this.time_to_activation <= 0) {
					this.time_to_destruction -= ms + this.time_to_activation;
					this.time_to_activation = 0;
					this.active = true;
				}
			}
			this.flip_clock.update(ms);
			return;
		}

		if (ms > 1000) {
			this.time_to_destruction = Math.min(
				this.time_to_destruction - 1000,
				Math.max(
					this.time_to_destruction - ms * this.countdown_speed,
					240000 // 4 minutes
				)
			);
		} else {
			this.time_to_destruction -= ms * this.countdown_speed;
		}

		this.setFlipClock();
		this.flip_clock.update(ms);

		if (this.time_to_destruction <= 0) {
			this.onGameOver();
		}

		const radius = (1 - Math.random() * Math.random()) * (2000000 / this.time_to_destruction);
		const theta = Math.PI * 2 * Math.random();

		$('.game-content').css({
			transform: this.active && this.time_to_destruction > 0 ? `
				translateX(${radius * Math.cos(theta)}px)
				translateY(${radius * Math.sin(theta)}px)
			` : "none",
		})
	}
}



// WEBPACK FOOTER //
// ./src/gamestate/Youngsterpocalypse.tsx