// import node module libraries
import { Link } from 'react-router-dom';

// import sub components
import LevelIcon from './LevelIcon';

// import tippy tooltip
import Tippy from '@tippyjs/react';

const LevelIconWithTooltip = ({ level }) => {
	if (level === 'Beginner' || level === 'Intermediate' || level === 'Advance') {
		return (
			<Tippy content={level}>
				<Link to="#">
					<LevelIcon level={level} />
				</Link>
			</Tippy>
		);
	} else {
		return '';
	}
};
export default LevelIconWithTooltip;
