import * as React from 'react';

import { BigNumber } from 'src/lib/bignum';
import { observer } from 'mobx-react';

import GameState from 'src/gamestate';

import './index.css';
import { FormattedMessage } from 'react-intl';
import { addFloater } from '../../jquery/floater_text';

interface IProps {
	game_state: GameState
}

@observer
class GoomyIndicator extends React.Component<IProps> {

	touched: boolean = false;

	constructor(props: IProps) {
		super(props);
	}

	onClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (this.touched) return; this.touched = true;
		const { great_goomy, goomy_count } = this.props.game_state;

		goomy_count.click();
		great_goomy.click();
		addFloater(
			event.clientX, event.clientY,
			"+" + goomy_count.gpc.toFormat(0, BigNumber.ROUND_DOWN) +
			"<div class='goomy-icon' style='width: 20px; height: 20px;' />",
			x => x / 1000
		);
	}

	onRightClick = (event: any) => {
		event.preventDefault();
		event.stopPropagation();
	}

	onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
		if (this.touched) return; this.touched = true;
		const { great_goomy, goomy_count } = this.props.game_state;

		for (let a = 0; a < event.touches.length; ++a) {
			const touch = event.touches[0];
			goomy_count.click();
			great_goomy.click();
			addFloater(
				touch.clientX, touch.clientY,
				"+" + goomy_count.gpc.toFormat(0, BigNumber.ROUND_DOWN) +
				"<div class='goomy-icon' style='width: 20px; height: 20px;' />",
				x => x / 1000
			);
		}
	}

	onMouseUp = () => { this.touched = false; }

	getFormattedGoomyCount() {
		// can't rely on FormatJS for this because it truncates the numbers.
		const { goomy_count } = this.props.game_state;
		if (goomy_count.goomies.integerValue(BigNumber.ROUND_DOWN).isEqualTo(1)) {
			return <FormattedMessage
				id="goomy_count_one"
				defaultMessage="{goomies} Goomy"
				values={{ goomies: goomy_count.goomies.toFormat(0, BigNumber.ROUND_DOWN) }}
			/>;
		} else if (goomy_count.goomies.isGreaterThanOrEqualTo(2) && goomy_count.goomies.isLessThan(5)) {
			return <FormattedMessage
				id="goomy_count_few"
				defaultMessage="{goomies} Goomies"
				values={{ goomies: goomy_count.goomies.toFormat(0, BigNumber.ROUND_DOWN) }}
			/>;
		}
		return <FormattedMessage
			id="goomy_count_other"
			defaultMessage="{goomies} Goomies"
			values={{ goomies: goomy_count.goomies.toFormat(0, BigNumber.ROUND_DOWN) }}
		/>;
	}

	getFormattedGPSCount() {
		// can't rely on FormatJS for this because it truncates the numbers.
		const { goomy_count } = this.props.game_state;
		if (goomy_count.gps.isEqualTo(1)) {
			return <FormattedMessage
				id="gps_count_one"
				defaultMessage="{goomies} Goomy per second"
				values={{ goomies: goomy_count.gps.toFormat(1, BigNumber.ROUND_DOWN) }}
			/>;
		} else if (goomy_count.gps.isGreaterThanOrEqualTo(2) && goomy_count.gps.isLessThan(5)) {
			return <FormattedMessage
				id="gps_count_few"
				defaultMessage="{goomies} Goomies per second"
				values={{ goomies: goomy_count.gps.toFormat(1, BigNumber.ROUND_DOWN) }}
			/>;
		}
		return <FormattedMessage
			id="gps_count_other"
			defaultMessage="{goomies} Goomies per second"
			values={{ goomies: goomy_count.gps.toFormat(1, BigNumber.ROUND_DOWN) }}
		/>;
	}

	render() {
		const { great_goomy, goomy_count } = this.props.game_state;

		return <div className="goomy-indicator">
			<p className="goomy-count">
				{this.getFormattedGoomyCount()}
			</p>
			<p className="gps-count">
				{this.getFormattedGPSCount()}
			</p>
			<div
				className="great-goomy"
				onTouchStart={this.onTouchStart}
				onMouseDown={this.onClick}
				onMouseUp={this.onMouseUp}
				onContextMenu={this.onRightClick}
			/>
			<div className="goomy-stats">
				<span>Level {great_goomy.level}</span>
				<progress
					max={great_goomy.next_level_increment}
					value={great_goomy.current_level_progress}
				/>
			</div>
		</div>;
	}
}

export default GoomyIndicator;



// WEBPACK FOOTER //
// ./src/react/GoomyIndicator/index.tsx