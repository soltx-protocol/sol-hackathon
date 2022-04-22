import React from 'react';
import classnames from 'classnames';

import styles from './index.css';

const DuneTxPool = ({
	className,
	title,
	poolAccount = 'EGZ7tiLeH62TPV1gL8WwbXGzEPa9zmcpVnnkPKKnrE2U',
}) => (
	<iframe
		className={classnames(styles.duneTxPool, className)}
		src={`https://dune.com/embeds/626001/1167393/2d14ec26-c13f-483d-8093-aedc1c69ab18?pool_account=${poolAccount}`}
		title={title}
	/>
);

export default DuneTxPool;
