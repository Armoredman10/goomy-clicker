import * as React from "react";
import { observer } from "mobx-react";

import { getRandomScaleComparison, comparison_types } from "src/data/scale_comparisons";
import ScaleComparisonBasis from "src/data/scale_comparisons/types";

import { FormattedMessage } from 'react-intl';
import { BigNumber } from "src/lib/bignum";
import { observable, action } from "mobx";

interface IProps {
	goomy_count: BigNumber;
}

class ScaleComparisonState {
	@observable basis: ScaleComparisonBasis;
	@observable comparison_change_timer: number;

	constructor(readonly getRandomComparison: () => ScaleComparisonBasis) {
		this.changeComparison();
	}

	@action changeComparison = () => {
		window.clearTimeout(this.comparison_change_timer);
		this.basis = this.getRandomComparison();
		this.comparison_change_timer = window.setTimeout(this.changeComparison, 5000);
	}
}

@observer
export default class ScaleComparison extends React.Component<IProps> {

	scale_comparison_state = new ScaleComparisonState(
		() => getRandomScaleComparison(this.props.goomy_count)
	);

	componentDidUpdate(prevProps: IProps) {
		// if comparison just went out of range, update the scale comparison immediately
		if (
			this.props.goomy_count.gt(this.scale_comparison_state.basis.range[1]) ||
			this.props.goomy_count.lt(this.scale_comparison_state.basis.range[0])
		) {
			this.scale_comparison_state.changeComparison();
		}
	}

	render() {
		const count = this.props.goomy_count.dividedBy(
			new BigNumber(this.scale_comparison_state.basis.unit)
		);

		let item = null;
		if (count.isEqualTo(0) && this.scale_comparison_state.basis.zero) {
			item = <b><FormattedMessage
				id={"scale_comparison_" + this.scale_comparison_state.basis.id + "_zero"}
				defaultMessage={this.scale_comparison_state.basis.zero}
			/></b>;
		} else if (count.isGreaterThanOrEqualTo(0.95) && count.isLessThan(1.05)) {
			item = <b><FormattedMessage
				id={"scale_comparison_" + this.scale_comparison_state.basis.id + "_one"}
				defaultMessage={this.scale_comparison_state.basis.one}
			/></b>;
		} else {
			let formatted_count;
			if (count.gte(1000)) formatted_count = count.toFormat(0);
			else formatted_count = count.toFormat(1);
			item = <b><FormattedMessage
				id={"scale_comparison_" + this.scale_comparison_state.basis.id + "_other"}
				defaultMessage={this.scale_comparison_state.basis.other}
				values={{ count: formatted_count }}
			/></b>
		}

		return <p>
			<FormattedMessage
				id={"comparison_type_" + this.scale_comparison_state.basis.type}
				defaultMessage={comparison_types[this.scale_comparison_state.basis.type]}
				values={{ item }}
			/>
		</p>
	}
}



// WEBPACK FOOTER //
// ./src/react/StatsPane/ScaleComparison.tsx