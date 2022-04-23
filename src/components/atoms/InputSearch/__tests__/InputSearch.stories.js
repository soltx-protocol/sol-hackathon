import React from 'react';
import { storiesOf } from '@storybook/react';

import InputSearch from 'components/atoms/InputSearch';

const stories = storiesOf('atoms/InputSearch', module);

const options = [
	{ value: 'black', label: 'black' },
	{ value: 'red', label: 'red' },
	{ value: 'blue', label: 'blue' },
];

stories.add('__interactive', () => <InputSearch options={options} />);
