import React from 'react';
import classnames from 'classnames';

// import Header from 'components/organisms/Header';
// import Footer from 'components/organisms/Footer';

import Navbar, { NAV_SELECT } from 'components/molecules/Navbar';

import { useHistory } from 'models/routing';
import styles from './index.css';

const App = ({ children }) => {
	const history = useHistory();

	const atAccountPage = history.location.pathname.includes('account');

	return (
		<div className={classnames(styles.app, { [styles.atAccount]: atAccountPage })}>
			<Navbar
				className={styles.nav}
				select={atAccountPage ? NAV_SELECT.ACCOUNT : NAV_SELECT.OVERALL}
			/>
			<div className={styles.content}>{children}</div>
			{/* <Footer /> */}
		</div>
	);
};

export default App;
