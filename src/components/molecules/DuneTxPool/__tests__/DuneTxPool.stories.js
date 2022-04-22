import React from 'react';
import { storiesOf } from '@storybook/react';

import DuneTxPool from 'components/molecules/DuneTxPool';

const stories = storiesOf('molecules/DuneTxPool', module);

stories.add('__interactive', () => <DuneTxPool title="tx-pool" />);
