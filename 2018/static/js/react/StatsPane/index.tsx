import * as React from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

import GameState from 'src/gamestate';
import { BigNumber } from 'src/lib/bignum';
import { format_play_time } from 'src/lib/format_html';

import ScaleComparison from './ScaleComparison';
import './index.css';
import { FormattedMessage } from 'react-intl';
import { formatMedium } from 'src/lib/format';

interface IProps {
	game_state: GameState;
}

class StatsPaneTack {
	@observable pinned: boolean;
	@action togglePin = () => { this.pinned = !this.pinned; }
}

class StatsPaneInfo {
	@observable elapsed_time: number;
	@observable goomies: string;
	@observable total_goomies: string;
	@observable total_total_goomies: string;
	@observable goomy_exp: string;
	@observable level_cap_reached: boolean;
	@observable next_level: string;
	@observable to_next_level: string;

	@action update = (game_state: GameState) => {
		const {
			great_goomy, goomy_count
		} = game_state;

		this.goomies = formatMedium(goomy_count.goomies.integerValue(BigNumber.ROUND_DOWN));
		this.total_goomies = formatMedium(goomy_count.total_goomies.integerValue(BigNumber.ROUND_DOWN));
		this.total_total_goomies = formatMedium(goomy_count.total_total_goomies.integerValue(BigNumber.ROUND_DOWN));
		this.goomy_exp = new BigNumber(great_goomy.exp_points).toFormat(0, BigNumber.ROUND_DOWN);
		this.level_cap_reached = great_goomy.level == great_goomy.level_cap;
		this.next_level = (great_goomy.level + 1).toString();
		this.to_next_level = great_goomy.to_next_level ? `
			${new BigNumber(
				great_goomy.to_next_level -
				great_goomy.exp_points
			).toFormat(0, BigNumber.ROUND_UP)}
		 ${great_goomy.time_to_next_level}` : "";
	}
}

@observer
class StatsPane extends React.Component<IProps> {
	tack = new StatsPaneTack();
	stats = new StatsPaneInfo();

	updateInfo = () => {
		this.stats.update(this.props.game_state);
	}

	constructor(props: IProps) {
		super(props);
		window.setInterval(this.updateInfo, 100);
	}

	render() {
		const { start_time, current_time } = this.props.game_state;

		return <div
			className={"stats-pane" + (this.tack.pinned ? " pinned" : "")}
			onClick={this.tack.togglePin}
		>
			<div className="stats-label">
				<FormattedMessage
					id="stats_display"
					defaultMessage="Stats"
				/>
			</div>
			<div className="stats-content">
				<h1>
					<FormattedMessage
						id="stats_display"
						defaultMessage="Stats"
					/>
				</h1>
				<table className="stats-table">
					<tbody>
						<tr>
							<td className="key">
								<FormattedMessage
									id="stats_play_time"
									defaultMessage="Play time"
								/>
							</td>
							<td className="value">{format_play_time(
								start_time ?
									current_time.getTime() -
									start_time.getTime()
									: 0
							)}</td>
						</tr>
						{this.props.game_state.youngsterpocalypse.active ?
							<tr>
								<td className="key">
									<FormattedMessage
										id="stats_time_to_destruction"
										defaultMessage="Time to destruction"
									/>
								</td>
								<td className="value">{format_play_time(
									this.props.game_state.youngsterpocalypse.time_to_destruction
								)}</td>
							</tr>
							: null}
						<tr className="spacer" />
						<tr>
							<td className="key">
								<FormattedMessage
									id="stats_goomies"
									defaultMessage="Goomies"
								/>
							</td>
							<td className="value">{
								this.stats.goomies
							}</td>
						</tr>
						<tr>
							<td className="key">
								<FormattedMessage
									id="stats_total_goomies"
									defaultMessage="Total Goomies"
								/>
							</td>
							<td className="value">{
								this.stats.total_goomies
							}</td>
						</tr>
						<tr className="spacer" />
						<tr>
							<td className="key">
								<FormattedMessage
									id="stats_exp"
									defaultMessage="Experience points"
								/>
							</td>
							<td className="value">{
								this.stats.goomy_exp
							}</td>
						</tr>
						{!this.stats.level_cap_reached ?
							<tr>
								<td className="key">
									<FormattedMessage
										id="stats_to_next_level"
										defaultMessage="To level {level}"
										values={{ level: this.stats.next_level }}
									/>
								</td>
								<td className="value">{
									this.stats.to_next_level
								}</td>
							</tr>
							: null}
					</tbody>
				</table>
				<ScaleComparison goomy_count={this.props.game_state.goomy_count.goomies} />
			</div>
		</div>;
	}
}

export default StatsPane;



// WEBPACK FOOTER //
// ./src/react/StatsPane/index.tsx