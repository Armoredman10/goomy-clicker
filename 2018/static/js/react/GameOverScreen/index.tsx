import * as React from "react";
import { observer } from "mobx-react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import GameState from "src/gamestate";
import { BigNumber } from "src/lib/bignum";

import './index.css';

interface IProps {
	game_state: GameState;
}

@observer
class GameOverScreen extends React.Component<IProps> {
	render() {
		const { dialog_state } = this.props.game_state.heavenly_meadow;
		return <TransitionGroup className="eog-overlay">
			{this.props.game_state.over ? (
				this.props.game_state.heavenly_meadow.transitioned ?
					<CSSTransition
						key="heavenly-meadow"
						timeout={2000}
						classNames="heavenly-meadow"
					>
						<div className="heavenly-meadow" onClick={dialog_state.advance}>
							<TransitionGroup className="meadow-content">
								{dialog_state.active && dialog_state.loaded ?
									<CSSTransition
										key={dialog_state.current_frame_id}
										timeout={500}
										classNames="meadow-background"
									>
										<img className="meadow-background" src={dialog_state.image_url} />
									</CSSTransition>
									: null}
								{dialog_state.active && dialog_state.loaded ?
									<CSSTransition
										key="meadow-text"
										timeout={500}
										classNames="meadow-text"
									>
										<div className="meadow-text">
											<TransitionGroup>
												<CSSTransition
													key={dialog_state.current_frame_id}
													timeout={500}
													classNames="meadow-text-entry"
												>
													<div className="meadow-text-entry">
														{dialog_state.text}
													</div>
												</CSSTransition>
												<div className="next">▶</div>
											</TransitionGroup>
										</div>
									</CSSTransition>
									: null}
								{dialog_state.active && !dialog_state.loaded ?
									<CSSTransition
										key="dialogue-standby"
										timeout={500}
										classNames="dialogue-pane"
									>
										<div className="dialogue-screen">
											<div className="lds-ripple"><div /><div /></div>
											<p>Standby for transmission...</p>
										</div>
									</CSSTransition>
									: null}
								{this.props.game_state.heavenly_meadow.showing_stats ?
									<CSSTransition
										key="meadow-stats"
										timeout={500}
										classNames="meadow-stats"
									>
										<div className="meadow-stats">
											<p>Heavenly Sliggoo: Level {this.props.game_state.heavenly_sliggoo.level}</p>
											<p>Divine Goodra: Level {this.props.game_state.divine_goodra.level}</p>
											<button onClick={this.props.game_state.reset}>Play again?</button>
										</div>
									</CSSTransition>
									: null}
							</TransitionGroup>
						</div>
					</CSSTransition>
					:
					<CSSTransition
						key="game-over"
						timeout={2000}
						classNames="game-over-screen"
					>
						<div className="game-over">
							<p>Game over! You died.</p>
							<p>Total Goomies: {
								this.props.game_state.goomy_count.total_goomies.toFormat(
									0, BigNumber.ROUND_DOWN)
							}</p>
						</div>
					</CSSTransition>
			) : null}
		</TransitionGroup>;
	}
}

export default GameOverScreen;



// WEBPACK FOOTER //
// ./src/react/GameOverScreen/index.tsx