import 'isomorphic-fetch';
import nock from 'nock';

import blog, { getBlogs } from '../blog';

import mockStore from '../__mocks__/store';

describe('blogs reducer', () => {
	it('should return the initial state', () => {
		expect(blog.reducer.blogs(undefined, {})).toEqual({
			loading: false,
			posts: [],
		});
	});

	it('should handle GET_BLOGS_PENDING', () => {
		expect(
			blog.reducer.blogs(undefined, {
				type: 'GET_BLOGS_PENDING',
			}),
		).toEqual({
			loading: true,
			posts: [],
		});
	});

	it('should handle GET_BLOGS_FULFILLED', () => {
		expect(
			blog.reducer.blogs(
				{
					loading: true,
					posts: [],
				},
				{
					type: 'GET_BLOGS_FULFILLED',
					payload: {
						list: [
							{
								author: 'Lee',
								pID: '9527',
								thumb_url: '',
								time: '2016-01-22 12:23:34',
								title: '你好',
							},
						],
					},
				},
			),
		).toEqual({
			loading: false,
			posts: [
				{
					author: 'Lee',
					pID: '9527',
					thumb_url: '',
					time: '2016-01-22 12:23:34',
					title: '你好',
				},
			],
		});
	});

	it('should handle CLEAN_BLOGS', () => {
		expect(
			blog.reducer.blogs(
				{
					loading: false,
					posts: [
						{
							author: 'Lee',
							pID: '9527',
							thumb_url: '',
							time: '2016-01-22 12:23:34',
							title: '你好',
						},
					],
				},
				{
					type: 'CLEAN_BLOGS',
				},
			),
		).toEqual({
			loading: false,
			posts: [],
		});
	});
});

describe('async actions', () => {
	afterEach(() => nock.cleanAll());

	it('create GET_BLOGS_FULFILLED when fetch blogs has been done', async () => {
		nock('https://www.25sprout.com')
			.post('/bin/bloglist_2016.php')
			.reply(200, { status: 'success', list: [] });

		const expectedActions = [
			{ type: 'GET_BLOGS_PENDING' },
			{ type: 'GET_BLOGS_FULFILLED', payload: { status: 'success', list: [] } },
		];
		const store = mockStore({ blogs: {} });

		return store.dispatch(getBlogs()).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('create the empty list when fetch blogs with error', async () => {
		nock('https://www.25sprout.com').post('/bin/bloglist_2016.php').replyWithError('Not found');

		const expectedActions = [
			{ type: 'GET_BLOGS_PENDING' },
			{ type: 'GET_BLOGS_FULFILLED', payload: { list: [] } },
		];
		const store = mockStore({ blogs: {} });

		return store.dispatch(getBlogs()).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});
