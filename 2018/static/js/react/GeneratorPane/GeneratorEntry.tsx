import * as React from 'react';
import { observer } from 'mobx-react';

import Generator from 'src/gamestate/Generator';
import { generator_flavour_text } from 'src/data/generators/flavour_text';
import GoomyCount from 'src/gamestate/GoomyCount';
import { formatShort } from '../../lib/format';
import { FormattedMessage } from 'react-intl';
import { GoomyIcon } from '../icons';

interface IProps {
	id: string;
	new: boolean;
	generator: Generator;
	goomies: GoomyCount;
	onMouseEnter: () => void;
	onMouseLeave: () => void;
	onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

@observer
class GeneratorEntry extends React.Component<IProps> {
	render() {
		return <div
			className="generator"
			onMouseEnter={this.props.onMouseEnter}
			onMouseLeave={this.props.onMouseLeave}
			onClick={this.props.onClick}
		>
			<div className={`cover ${this.props.new ? "new" : ""}`} />
			<div className="header">
				<div className="count">{this.props.generator.count}</div>
				<div className="name">
					<FormattedMessage
						id={`generator_${this.props.id}_name`}
						defaultMessage={generator_flavour_text[this.props.id].name}
					/>
				</div>
				<div className="next-cost">
					{formatShort(this.props.generator.cost)}
					<GoomyIcon size={16} />
				</div>
			</div>
		</div>
	};
}

export default GeneratorEntry;



// WEBPACK FOOTER //
// ./src/react/GeneratorPane/GeneratorEntry.tsx