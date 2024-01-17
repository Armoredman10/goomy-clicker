import * as React from 'react';
import { observer } from 'mobx-react';

import { upgrade_flavour_text } from 'src/data/upgrades/flavour_text';
import { formatShort } from '../../lib/format';
import { FormattedMessage } from 'react-intl';

import Upgrade from 'src/gamestate/Upgrade';
import GoomyCount from 'src/gamestate/GoomyCount';

interface IProps {
	id: string;
	upgrade: Upgrade;
	goomies: GoomyCount;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
	onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

@observer
class UpgradeEntry extends React.Component<IProps> {
	render() {
		return <div
			className="upgrade"
			onMouseEnter={this.props.onMouseEnter}
			onMouseLeave={this.props.onMouseLeave}
			onClick={this.props.onClick}
		>
			<div className="header">
				<div className="name">
					<FormattedMessage
						id={`upgrade_${this.props.id}_name`}
						defaultMessage={upgrade_flavour_text[this.props.id].name}
					/>
				</div>
				<div className="next-cost">Cost: {formatShort(this.props.upgrade.cost)}</div>
			</div>
			<div className="text">
				<p>
					<FormattedMessage
						id={`upgrade_${this.props.id}_description_text`}
						defaultMessage={upgrade_flavour_text[this.props.id].description.text}
						values={{
							value: <b>
								<FormattedMessage
									id={`upgrade_${this.props.id}_description_value`}
									defaultMessage={upgrade_flavour_text[this.props.id].description.value}
								/>
							</b>
						}}
					/>
				</p>
				<p style={{ fontStyle: "italic" }}>
					<FormattedMessage
						id={`upgrade_${this.props.id}_description_caption`}
						defaultMessage={upgrade_flavour_text[this.props.id].caption}
					/>
				</p>
			</div>
		</div>
	};
}

export default UpgradeEntry;



// WEBPACK FOOTER //
// ./src/react/UpgradePane/UpgradeEntry.tsx