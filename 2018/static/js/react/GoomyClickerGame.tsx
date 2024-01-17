import * as React from 'react';
import { observer } from 'mobx-react';

import './index.css';
import GameState from 'src/gamestate';
import { updateFloaters } from 'src/jquery/floater_text';
import GoomyIndicator from './GoomyIndicator';
import GeneratorPane from './GeneratorPane';
import GameOverScreen from './GameOverScreen';
import StatsPane from './StatsPane';
import UpgradePane from './UpgradePane';
import DialoguePane from './DialoguePane';
import { BigNumber } from 'src/lib/bignum';
import { zp2, zp3 } from 'src/lib/format';

@observer
class GoomyClickerGame extends React.Component {
	game_state: GameState;
	last_update_time = new Date();

	constructor(props: {}) {
		super(props);

		requestAnimationFrame(this.updatePerFrame);
		setInterval(this.updateWindowTitle, 1000); // for background processing
		setInterval(this.saveGame, 10000);

		var save_file = localStorage.getItem("goomy_clicker.savefile");
		if (save_file) {
			this.game_state = GameState.createFromSaveFile(save_file);
		} else {
			this.game_state = GameState.createNew();
		}
	}

	updatePerFrame = () => {
		this.update();
		requestAnimationFrame(this.updatePerFrame);
	}

	updateWindowTitle = () => {
		this.update();
		if (this.game_state.over) {
			document.title = `Game over - Goomy Clicker`
		} else if (this.game_state.youngsterpocalypse.active) {
			let ttd = Math.ceil(this.game_state.youngsterpocalypse.time_to_destruction / 1000);
			document.title = `[${
				zp3("" + Math.floor(ttd / 60))
				}|${
				zp2("" + (Math.floor(ttd) % 60))
				}] - Goomy Clicker`;
		} else {
			document.title = `${
				this.game_state.goomy_count.goomies.toFormat(0, BigNumber.ROUND_DOWN)
				} - Goomy Clicker`;
		}
	}

	update = () => {
		const update_time = new Date();
		const ms = update_time.getTime() - this.last_update_time.getTime();
		this.last_update_time = update_time;
		this.game_state.update(ms);
		updateFloaters(ms);
	}

	saveGame = () => {
		window.localStorage.setItem("goomy_clicker.savefile", this.game_state.save_file)
	}

	render() {
		return <div className="goomy-clicker-game">
			<div className="game-content" style={{ display: this.game_state.over ? "none" : "flex" }}>
				<GoomyIndicator game_state={this.game_state} />
				<GeneratorPane game_state={this.game_state} />
				<UpgradePane game_state={this.game_state} />
				<StatsPane game_state={this.game_state} />
			</div>
			<GameOverScreen game_state={this.game_state} />
			<DialoguePane game_state={this.game_state} />
			<p className="copyright-notice">
				<span><a href="/">Back to the Doodle Pile</a></span>
				<br />
				<span className="sentence">Goomy Clicker &copy; 2013-2018 Joe Zeng.</span>{' '}
				<span className="sentence">Pokémon &copy; 1995-2018 Game Freak, Creatures Inc, Nintendo.</span>
			</p>
		</div>
	}
}

export default GoomyClickerGame;



// WEBPACK FOOTER //
// ./src/react/GoomyClickerGame.tsx