import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs/react';

import Modal, { InlineModal } from 'components/molecules/Modal';

const stories = storiesOf('COMMON|molecules/Modal', module);

stories.add('__interactive', () => (
	<Modal active={boolean('active', true)}>
		<div style={{ backgroundColor: 'black', width: '100px', height: '50px', color: 'white' }}>
			測試
		</div>
	</Modal>
));

stories.add('with inline', () => (
	<InlineModal active={boolean('active', true)}>
		<div style={{ backgroundColor: 'black', width: '100px', height: '50px', color: 'white' }}>
			測試
		</div>
	</InlineModal>
));
