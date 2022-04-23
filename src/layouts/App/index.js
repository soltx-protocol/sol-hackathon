import React from 'react';

// import Header from 'components/organisms/Header';
// import Footer from 'components/organisms/Footer';

import Navbar, { NAV_SELECT } from 'components/molecules/Navbar';

import { useHistory } from 'models/routing';
import styles from './index.css';

const App = ({ children }) => {
	const history = useHistory();

	const atAccountPage = history.location.pathname.includes('account');

	return (
		<div className={styles.app}>
			<Navbar select={atAccountPage ? NAV_SELECT.ACCOUNT : NAV_SELECT.OVERALL} />
			{children}
			{/* <Footer /> */}
		</div>
	);
};

export default App;
