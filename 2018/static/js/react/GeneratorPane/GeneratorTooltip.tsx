import * as React from 'react';
import { observer } from 'mobx-react';

import Generator from 'src/gamestate/Generator';
import GoomyCount from 'src/gamestate/GoomyCount';
import { BigNumber } from 'src/lib/bignum';
import { format_mmss_to, formatShort } from '../../lib/format';
import { generator_flavour_text } from 'src/data/generators/flavour_text';
import { addFloater } from 'src/jquery/floater_text';
import { InjectedIntl, FormattedMessage } from 'react-intl';
import { object } from 'prop-types';
import { NotEnoughGoomies } from '../../lib/errors';
import { GoomyIcon } from '../icons';

interface IProps {
	id: string;
	generator: Generator;
	goomies: GoomyCount;
	onClick: () => void;
	onMouseEnter: () => void;
	onMouseLeave: () => void;
}

@observer
class GeneratorTooltip extends React.Component<IProps> {

	static contextTypes = {
		intl: object.isRequired,
	};

	buy = (quantity: number) => {
		return (event: React.MouseEvent<HTMLButtonElement>) => {
			event.stopPropagation();
			try {
				this.props.generator.buy(quantity, this.props.goomies);
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
		};
	}

	buyMax = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		this.props.generator.buyMax(this.props.goomies);
	}

	sell = (quantity: number) => {
		return (event: React.MouseEvent<HTMLButtonElement>) => {
			event.stopPropagation();
			try {
				this.props.generator.sell(quantity, this.props.goomies);
			} catch (e) {
				addFloater(
					event.clientX, event.clientY,
					(this.context.intl as InjectedIntl).formatMessage({
						id: "error_nothing_to_sell",
						defaultMessage: "Nothing to sell!"
					}),
					x => x / 1000
				);
			}
		};
	}

	sellAll = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		this.props.generator.sellAll(this.props.goomies);
	}

	upgrade = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		try {
			this.props.generator.upgrade(this.props.goomies);
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

	getTimeToNext = () => {
		const seconds = this.props.goomies
			.timeToCost(this.props.generator.cost)
			.integerValue(BigNumber.ROUND_CEIL);
		return format_mmss_to(seconds);
	}

	render() {
		return <div className="tooltip"
			onClick={this.props.onClick}
			onMouseEnter={this.props.onMouseEnter}
			onMouseLeave={this.props.onMouseLeave}
		>
			<h1>
				<FormattedMessage
					id={`generator_${this.props.id}_name`}
					defaultMessage={generator_flavour_text[this.props.id].name}
				/>
			</h1>
			<p>
				<FormattedMessage
					id="tooltip_you_own"
					defaultMessage={"You own {count} of these"}
					values={{
						count: <b>{this.props.generator.count.toLocaleString()}</b>
					}}
				/>
			</p>
			<p>
				<FormattedMessage
					id="tooltip_each_one_produces"
					defaultMessage={"Each one produces {gps} GpS"}
					values={{
						gps: <b>{this.props.generator.gps.toFormat(1, BigNumber.ROUND_DOWN)}</b>
					}}
				/>
			</p>
			<p>
				<FormattedMessage
					id="tooltip_cost"
					defaultMessage={"Cost: {cost} Goomies"}
					values={{
						cost: <b>
							{this.props.generator.cost.toFormat(0, BigNumber.ROUND_DOWN)}
							<GoomyIcon size={12} />
						</b>
					}}
				/>
				{' '}
				{this.getTimeToNext()}
			</p>
			<hr />
			<div className="flex-flavour">
				<FormattedMessage
					id={`generator_${this.props.id}_description`}
					defaultMessage={generator_flavour_text[this.props.id].description}
				/>
			</div>
			<hr />
			<div className="controls">
				<div className="controls-margin">
					<div className="button-row">
						<button onClick={this.buy(1)}>
							<FormattedMessage
								id="buttons_buy_1"
								defaultMessage="Buy 1"
							/>
						</button>
						<button onClick={this.buy(10)}>
							<FormattedMessage
								id="buttons_buy_10"
								defaultMessage="Buy 10"
							/>
						</button>
						<button onClick={this.buy(100)}>
							<FormattedMessage
								id="buttons_buy_100"
								defaultMessage="Buy 100"
							/>
						</button>
						<button onClick={this.buyMax}>
							<FormattedMessage
								id="buttons_buy_max"
								defaultMessage="Buy Max"
							/>
						</button>
					</div>
					<div className="button-row">
						<button onClick={this.sell(1)}>
							<FormattedMessage
								id="buttons_sell_1"
								defaultMessage="Sell 1"
							/>
						</button>
						<button onClick={this.sell(10)}>
							<FormattedMessage
								id="buttons_sell_10"
								defaultMessage="Sell 10"
							/>
						</button>
						<button onClick={this.sell(100)}>
							<FormattedMessage
								id="buttons_sell_100"
								defaultMessage="Sell 100"
							/>
						</button>
						<button onClick={this.sellAll}>
							<FormattedMessage
								id="buttons_sell_all"
								defaultMessage="Sell All"
							/>
						</button>
					</div>
					<div className="button-row">
						<span className="generator-level">
							<FormattedMessage
								id="level"
								defaultMessage="Level {level}"
								values={{
									level: <b>{this.props.generator.level}</b>
								}}
							/>
						</span>
						<button onClick={this.upgrade}>
							<FormattedMessage
								id="buttons_level_up_for"
								defaultMessage="Level up for {cost}"
								values={{
									cost: <span>
										{formatShort(this.props.generator.upgrade_cost)}
										<GoomyIcon size={12} />
									</span>
								}}
							/>
						</button>
					</div>
				</div>
			</div>
		</div>;
	}
}

export default GeneratorTooltip;



// WEBPACK FOOTER //
// ./src/react/GeneratorPane/GeneratorTooltip.tsx