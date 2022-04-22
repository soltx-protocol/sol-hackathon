import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs/react';

import Navbar, { NAV_SELECT } from 'components/molecules/Navbar';

const stories = storiesOf('molecules/Navbar', module);

stories.add('__interactive', () => (
	<Navbar select={select('select', Object.keys(NAV_SELECT), NAV_SELECT.NONE)} />
));
