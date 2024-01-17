import * as React from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import GameState from 'src/gamestate';
import Upgrade from 'src/gamestate/Upgrade';
import Generator from 'src/gamestate/Generator';

import GeneratorEntry from './GeneratorEntry';
import GeneratorTooltip from './GeneratorTooltip';

import './index.css';

import { mapToArray } from 'src/lib/object_map';
import { addFloater } from 'src/jquery/floater_text';
import { InjectedIntl } from 'react-intl';
import { object } from 'prop-types';
import { NotEnoughGoomies } from 'src/lib/errors';
import { formatShort } from 'src/lib/format/short';

interface IProps {
	game_state: GameState;
}

class TooltipState {
	@observable generator_id: string | null;
	toggled_id: string | null;
	debounce_timer: number;

	changeTooltipState(generator_id: string | null) {
		// debounce to about 50 ms, the time it takes to render.
		return () => {
			if (this.debounce_timer) {
				this.cancelTooltipChange();
			}
			this.debounce_timer = window.setInterval(() => {
				this.setTooltip(generator_id);
			}, 50);
		}
	}

	cancelTooltipChange = () => {
		clearInterval(this.debounce_timer);
	}

	@action setTooltip = (id: string | null) => {
		this.generator_id = id;
		this.toggled_id = null;
	}

	@action toggleTooltip = () => {
		var toggled_id = this.generator_id;
		this.generator_id = this.toggled_id;
		this.toggled_id = toggled_id;
	}
}

@observer
class GeneratorPane extends React.Component<IProps> {
	tooltip_state: TooltipState = new TooltipState();

	static contextTypes = {
		intl: object.isRequired,
	};

	buyUpgrade(upgrade: Upgrade) {
		return () => {
			upgrade.buy(this.props.game_state);
		}
	}

	buyGenerator(generator: Generator) {
		return (event: React.MouseEvent<HTMLDivElement>) => {
			try {
				generator.buy(1, this.props.game_state.goomy_count);
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
		return <div className="generator-pane" onMouseEnter={this.tooltip_state.changeTooltipState(null)}>
			{this.tooltip_state.generator_id != null ?
				<GeneratorTooltip
					key="tooltip"
					id={this.tooltip_state.generator_id}
					generator={this.props.game_state.generators[this.tooltip_state.generator_id]}
					goomies={this.props.game_state.goomy_count}
					onClick={this.tooltip_state.changeTooltipState(null)}
					onMouseEnter={this.tooltip_state.cancelTooltipChange}
					onMouseLeave={this.tooltip_state.changeTooltipState(null)}
				/>
				: null}
			<TransitionGroup className="generators">
				{mapToArray(this.props.game_state.generators, (id, generator) => {
					if (generator.unlocked)
						return <CSSTransition
							key={id}
							timeout={500}
							classNames="generator"
						>
							<GeneratorEntry
								id={id}
								new={!generator.unlocked_at_start}
								generator={generator}
								goomies={this.props.game_state.goomy_count}
								onMouseEnter={this.tooltip_state.changeTooltipState(id)}
								onMouseLeave={this.tooltip_state.changeTooltipState(null)}
								onClick={this.buyGenerator(generator)}
							/>
						</CSSTransition>
				})}
			</TransitionGroup>
		</div>;
	}
}

export default GeneratorPane;



// WEBPACK FOOTER //
// ./src/react/GeneratorPane/index.tsx