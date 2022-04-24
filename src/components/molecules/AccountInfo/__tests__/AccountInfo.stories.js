import React from 'react';
import { storiesOf } from '@storybook/react';

import AccountInfo from 'components/molecules/AccountInfo';

const stories = storiesOf('molecules/AccountInfo', module);

stories.add('__interactive', () => <AccountInfo />, {
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
