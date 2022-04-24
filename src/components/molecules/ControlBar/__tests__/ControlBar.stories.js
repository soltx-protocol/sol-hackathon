import React from 'react';
import { storiesOf } from '@storybook/react';

import ControlBar from 'components/molecules/ControlBar';

const stories = storiesOf('molecules/ControlBar', module);

stories.add('__interactive', () => <ControlBar />, {
	redux: {
		data: {
			account: {
				address: '',
				pools: [],
			},
			routing: {
				pathname: '/',
			},
		},
	},
});
