import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs/react';

import DropdownBasic from 'components/atoms/DropdownBasic';

const stories = storiesOf('COMMON|atoms/DropdownBasic', module);

stories.addDecorator(withKnobs);

stories.add('__interactive', () => (
	<DropdownBasic
		valueComponent={() => 'Hi'}
		panelComponent={() => 'This is example'}
		valid={boolean('valid', true)}
	/>
));
