import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs/react';

import Dropdown from 'components/atoms/Dropdown';

const options = [
	{ value: 'black', label: '黑色' },
	{ value: 'red', label: '紅色' },
	{ value: 'blue', label: '藍色' },
];

const stories = storiesOf('COMMON|atoms/Dropdown', module);

stories.addDecorator(withKnobs);

const selectedOptions = [{ value: 'black', label: '黑色' }];

stories.add('__interactive', () => (
	<Dropdown
		placeholder="請選擇顏色"
		options={object('list', options)}
		initialValue={object('selected value', selectedOptions)}
	/>
));

stories.add('with placeholder', () => (
	<Dropdown placeholder="請選擇顏色" options={options} initialValue={[]} />
));
