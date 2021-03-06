import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs/react';

import Input from 'components/atoms/Input';

const stories = storiesOf('COMMON|atoms/Input', module);

stories.add('__interactive', () => (
	<Input
		disabled={boolean('disabled', false)}
		error={boolean('error', false)}
		placeholder="請輸入"
	/>
));
