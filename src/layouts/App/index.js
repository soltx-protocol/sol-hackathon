import React from 'react';

// import Header from 'components/organisms/Header';
// import Footer from 'components/organisms/Footer';

import Navbar, { NAV_SELECT } from 'components/molecules/Navbar';

import styles from './index.css';

const App = ({ children }) => (
	<div className={styles.app}>
		<Navbar select={NAV_SELECT.DASHBOARD} />
		{children}
		{/* <Footer /> */}
	</div>
);

export default App;
