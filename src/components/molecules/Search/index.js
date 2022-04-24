import React from 'react';
import classnames from 'classnames';

import InputSearch from 'components/atoms/InputSearch';

import { activePools } from 'defi/poolConfig';

import { useAccount } from 'models/account';
import styles from './index.css';

const options = activePools.map(pool => ({ ...pool, label: pool.name, value: pool.name }));

const Search = ({ className, onSearch, onClear }) => (
	<div className={classnames(styles.search, className)}>
		<div className={styles.title}>Pool Search</div>
		<InputSearch options={options} onSearch={onSearch} onClear={onClear} />
	</div>
);

export const SearchByAccount = ({ className, onSearch, onClear }) => {
	const [{ pools }] = useAccount();

	return (
		<div className={classnames(styles.search, className)}>
			<div className={styles.title}>Pool Search</div>
			<InputSearch options={pools} onSearch={onSearch} onClear={onClear} />
		</div>
	);
};

export default Search;
