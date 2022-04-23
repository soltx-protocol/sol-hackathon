import React from 'react';
import { storiesOf } from '@storybook/react';

import DuneChart from 'components/molecules/DuneChart';

const stories = storiesOf('molecules/DuneChart', module);

stories.add('__interactive', () => <DuneChart title="tx-pool" />);
