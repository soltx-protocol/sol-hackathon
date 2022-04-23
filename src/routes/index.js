import React from 'react';

// import { getOrcaPool } from 'defi/orca';
import AccountRoute from './Account';

const routes = {
	path: '/',
	components: () => [],
	render: (_, children) => children,
	onEnter: async ({ next }) => {
		console.log('on Enter Root');
		const children = await next();
		console.log('on Enter Root / end');

		// getOrcaPool('9dhoieCDdX3qawKK283vtcLmKHnvnMm3VQTKybyBcSdd');

		return children;
	},
	children: [
		{
			path: '',
			components: () => [import(/* webpackChunkName: 'home' */ './Home')],
			render: ([Home]) => <Home />,
			onEnter: async ({ next }) => {
				console.log('on Enter Home');
				const children = await next();
				console.log('on Enter Home / end');
				return children;
			},
		},
		AccountRoute,
	],
};

export default routes;
