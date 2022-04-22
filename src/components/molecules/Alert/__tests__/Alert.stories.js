import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs/react';

import { AlertComponent } from 'components/molecules/Alert';

import { ALERT_TYPE } from 'models/alert';

const stories = storiesOf('molecules/Alert', module);

stories.add('__interactive', () => (
	<div style={{ padding: '20px' }}>
		<AlertComponent
			type={select('type', Object.keys(ALERT_TYPE), ALERT_TYPE.NORMAL)}
			message="Your order has been filled"
		/>
	</div>
));
