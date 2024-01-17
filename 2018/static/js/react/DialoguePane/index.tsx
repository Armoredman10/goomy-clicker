import * as React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import GameState from "src/gamestate";
import { observer } from "mobx-react";

import "./index.css";
import "./spinner.css";

interface IProps {
	game_state: GameState;
}

@observer
class DialoguePane extends React.Component<IProps> {
	render() {
		const { dialog_state } = this.props.game_state;
		return <TransitionGroup className="dialogue-pane-centering">
			{dialog_state.active ?
				<CSSTransition
					key="dialogue-pane"
					timeout={500}
					classNames="dialogue-pane"
				>
					<div className="dialogue-pane" onClick={dialog_state.advance}>
						<TransitionGroup>
							{dialog_state.loaded ?
								<CSSTransition
									key="dialogue-content"
									timeout={500}
									classNames="dialogue-pane"
								>
									<div className="dialogue-screen">
										<TransitionGroup className="dialogue-image">
											<CSSTransition
												key={dialog_state.current_frame_id}
												timeout={500}
												classNames="dialogue-image-entry"
											>
												<img className="dialogue-image-entry" src={dialog_state.image_url} />
											</CSSTransition>
										</TransitionGroup>
										<TransitionGroup className="dialogue-text">
											<CSSTransition
												key={dialog_state.current_frame_id}
												timeout={500}
												classNames="dialogue-text-entry"
											>
												<div className="dialogue-text-entry">
													{dialog_state.text}
												</div>
											</CSSTransition>
										</TransitionGroup>
										<div className="next">▶</div>
									</div>
								</CSSTransition>
								:
								<CSSTransition
									key="dialogue-standby"
									timeout={500}
									classNames="dialogue-pane"
								>
									<div className="dialogue-screen">
										<div className="lds-ripple"><div /><div /></div>
										<p>Standby for transmission...</p>
									</div>
								</CSSTransition>}
						</TransitionGroup>
					</div>
				</CSSTransition>
				: null}
		</TransitionGroup>;
	}
}

export default DialoguePane;



// WEBPACK FOOTER //
// ./src/react/DialoguePane/index.tsx