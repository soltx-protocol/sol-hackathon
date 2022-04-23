import React from 'react';
import classnames from 'classnames';

import InputSearch from 'components/atoms/InputSearch';

import PoolConfig from 'defi/configs.json';

import styles from './index.css';

const options = Object.keys(PoolConfig.pools)
	.filter(pool => PoolConfig.pools[pool].deprecated !== true)
	.map(pool => ({ ...PoolConfig.pools[pool], label: pool, value: pool }));

const Search = ({ className, onSearch, onClear }) => (
	<div className={classnames(styles.search, className)}>
		<div className={styles.title}>Pool Search</div>
		<InputSearch options={options} onSearch={onSearch} onClear={onClear} />
	</div>
);

export default Search;
