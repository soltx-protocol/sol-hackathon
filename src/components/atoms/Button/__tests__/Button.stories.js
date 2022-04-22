import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs/react';

import Button, { BUTTON_SIZE_TYPE } from 'components/atoms/Button';

// import ArrowRightIcon from 'images/icon/navigation-arrow-right.inline.svg';

const stories = storiesOf('atoms/Button', module);

stories.add('__interactive', () => (
	<Button
		outline={boolean('outline', false)}
		disabled={boolean('disabled', false)}
		active={boolean('active', false)}
		size={select('size', Object.keys(BUTTON_SIZE_TYPE), BUTTON_SIZE_TYPE.MEDIUM)}
	>
		瞭解更多
	</Button>
));

// stories.add('with Icon', () => <Button Icon={ArrowRightIcon}>瞭解更多</Button>);
