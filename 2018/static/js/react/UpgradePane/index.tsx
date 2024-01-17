import * as React from 'react';
import { observable, action } from 'mobx';
import { object } from 'prop-types';
import { observer } from 'mobx-react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import GameState from 'src/gamestate';

import UpgradeEntry from './UpgradeEntry';

import './index.css';
import { mapToArray } from 'src/lib/object_map';
import Upgrade from 'src/gamestate/Upgrade';
import { addFloater } from 'src/jquery/floater_text';
import { InjectedIntl } from 'react-intl';
import { NotEnoughGoomies } from 'src/lib/errors';
import { formatShort } from 'src/lib/format';

interface IProps {
	game_state: GameState;
}

class TooltipState {
	@observable upgrade_id: string | null;
	toggled_id: string | null;
	debounce_timer: number;

	changeTooltipState(upgrade_id: string | null) {
		// debounce to about 50 ms, the time it takes to render.
		return () => {
			if (this.debounce_timer) {
				this.cancelTooltipChange();
			}
			this.debounce_timer = window.setInterval(() => {
				this.setTooltip(upgrade_id);
			}, 50);
		}
	}

	cancelTooltipChange = () => {
		clearInterval(this.debounce_timer);
	}

	@action setTooltip = (id: string | null) => {
		this.upgrade_id = id;
		this.toggled_id = null;
	}

	@action toggleTooltip = () => {
		var toggled_id = this.upgrade_id;
		this.upgrade_id = this.toggled_id;
		this.toggled_id = toggled_id;
	}
}

@observer
class UpgradePane extends React.Component<IProps> {
	tooltip_state: TooltipState = new TooltipState();

	static contextTypes = {
		intl: object.isRequired,
	};

	buyUpgrade(upgrade: Upgrade) {
		return (event: React.MouseEvent<HTMLDivElement>) => {
			event.stopPropagation();
			try {
				upgrade.buy(this.props.game_state);
			} catch (e) {
				if (e instanceof NotEnoughGoomies)
					addFloater(
						event.clientX, event.clientY,
						(this.context.intl as InjectedIntl).formatMessage(
							{
								id: "error_need_more_goomies",
							}, {
								shortfall: formatShort(e.shortfall)
							}),
						x => x / 1000
					);
			}
		}
	}

	render() {
		return <div className="upgrade-pane" onMouseEnter={this.tooltip_state.changeTooltipState(null)}>
			{this.tooltip_state.upgrade_id != null ? null
				/*<UpgradeTooltip
					key="tooltip"
					id={this.tooltip_state.upgrade_id}
					upgrade={this.props.game_state.upgrades[this.tooltip_state.upgrade_id]}
				/>*/
				: null}
			<div className="upgrade-pane-label">
				Upgrades
			</div>
			<div className="upgrade-pane-content">
				<TransitionGroup className="upgrades">
					{mapToArray(this.props.game_state.upgrades, (id, upgrade) => {
						if (upgrade.unlocked && !upgrade.bought)
							return <CSSTransition
								key={id}
								timeout={500}
								classNames="upgrade"
							>
								<UpgradeEntry
									id={id}
									upgrade={upgrade}
									goomies={this.props.game_state.goomy_count}
									onMouseEnter={this.tooltip_state.changeTooltipState(id)}
									onMouseLeave={this.tooltip_state.changeTooltipState(null)}
									onClick={this.buyUpgrade(upgrade)}
								/>
							</CSSTransition>
					})}
				</TransitionGroup>
			</div>
		</div>;
	}
}

export default UpgradePane;



// WEBPACK FOOTER //
// ./src/react/UpgradePane/index.tsx