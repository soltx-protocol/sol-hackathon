import { setAccount } from 'models/account';
import React from 'react';

export default {
	path: '/account',
	components: () => [],
	render: (_, children) => children,
	children: [
		{
			path: '',
			components: () => [import(/* webpackChunkName: 'account' */ './Home')],
			render: ([Account]) => <Account />,
			onEnter: async ({ next }) => {
				console.log('on Enter Account');

				const children = await next();

				console.log('on Enter Account / end');

				return children;
			},
		},
		{
			path: '/:id',
			components: () => [import(/* webpackChunkName: 'AccountDetail' */ './component')],
			render: ([AccountDetail]) => <AccountDetail />,
			onEnter: async ({ store, next, params }) => {
				console.log('on Enter Account detail');

				const { id } = params;

				console.log(id);

				store.dispatch(setAccount(id));

				const children = await next();

				console.log('on Enter Account detail / end');

				return children;
			},
		},
	],
};
