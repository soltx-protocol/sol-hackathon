import React from 'react';
import Link from 'components/atoms/Link';

const Navigator = () => (
	<nav>
		<ul>
			<li>
				<Link to="/">Home</Link>
			</li>
			<li>
				<Link to="/members">Members</Link>
			</li>
			<li>
				<Link to="/blogs">Blogs</Link>
			</li>
		</ul>
	</nav>
);

export default Navigator;
