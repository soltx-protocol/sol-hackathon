import React from 'react';
import { hot } from 'react-hot-loader/root';

import PageLayout from 'layouts/Page';

import { useHistory } from 'models/routing';

const PageContent = () => {
	const history = useHistory();

	return (
		<div>
			<div role="button" tabIndex={0} onClick={() => history.goBack()} onKeyPress={() => {}}>
				{'< go back'}
			</div>
		</div>
	);
};

const Blogs = PageLayout({
	PageHeader: "Blogs's page",
	PageContent,
});

Blogs.displayName = 'Blogs';

export default hot(Blogs);
