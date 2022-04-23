import React from 'react';
import { storiesOf } from '@storybook/react';

import Search from 'components/molecules/Search';

const stories = storiesOf('molecules/Search', module);

stories.add('__interactive', () => <Search />);
