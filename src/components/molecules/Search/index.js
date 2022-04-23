import React from 'react';
import classnames from 'classnames';

import InputSearch from 'components/atoms/InputSearch';

import styles from './index.css';

const Search = ({ className }) => (
	<div className={classnames(styles.search, className)}>
		<div className={styles.title}>Pool Search</div>
		<InputSearch />
	</div>
);

export default Search;
