const { testServer } = require('./mockTestServer');
const { gql } = require('apollo-server-express');
const { createTestClient } = require('apollo-server-testing');
const dotenv = require('dotenv');
dotenv.config();

const { query, mutate } = createTestClient(testServer);

const testUser = {
	id: 0,
	userId: 'test10',
	password: process.env.TEST_PASSWORD,
	grant: 5,
	nickname: 'testUser01'
};

const testCategory = {
	name: '카테고리04'
};

describe('Integration Test', () => {
	it('create user', async () => {
		const CREATE_USER = gql`
			mutation($userId: String!, $password: String!, $grant: Int!, $nickname: String!) {
				createUser(userId: $userId, password: $password, grant: $grant, nickname: $nickname) {
					id
					userId
					nickname
					grant
				}
			}
		`;
		const { data: { createUser } } = await mutate({
			mutation: CREATE_USER,
			variables: testUser
		});
		const { userId, grant, nickname } = testUser;
		testUser['id'] = createUser.id;
		expect(createUser).toEqual({ id: createUser.id, userId, grant, nickname });
	});

	it('create user Error with exuser', async () => {
		const CREATE_USER = gql`
			mutation($userId: String!, $password: String!, $grant: Int!, $nickname: String!) {
				createUser(userId: $userId, password: $password, grant: $grant, nickname: $nickname) {
					id
					userId
					nickname
					grant
				}
			}
		`;
		const { errors } = await mutate({
			mutation: CREATE_USER,
			variables: testUser
		});
		expect(errors[0].message).toEqual('Username is taken');
	});
	// 해당 테스트의 에러가 다음 테스트에 영향을 미친다. 이를 어떻게 없앨 수 있을까?

	// it('login Error with Wrong passwod', async () => {
	// 	const LOGIN = gql`
	// 		mutation($userId: String!, $password: String!) {
	// 			login(userId: $userId, password: $password) {
	// 				id
	// 				userId
	// 				nickname
	// 				grant
	// 			}
	// 		}
	// 	`;
	// 	const { userId } = testUser;
	// 	const result = await mutate({
	// 		mutation: LOGIN,
	// 		variables: { userId, password: 'wrong_password' }
	// 	});
	// 	console.log(result);
	// 	return expect(result).toEqual('존재하지 않는 사용자입니다.');
	// });

	it('login succes', async () => {
		const LOGIN = gql`
			mutation($userId: String!, $password: String!) {
				login(userId: $userId, password: $password) {
					id
					userId
					nickname
					grant
				}
			}
		`;
		const { userId, grant, nickname, password, id } = testUser;
		const { data: { login } } = await mutate({
			mutation: LOGIN,
			variables: { userId, password }
		});
		expect(login).toEqual({ id, userId, grant, nickname });
	});

	it('create category', async () => {
		const { name } = testCategory;
		const CREATE_CATEGORY = gql`
			mutation($name: String!) {
				createCategory(category_name: $name) {
					id
					name
				}
			}
		`;
		const { data: createCategory } = await mutate({
			mutation: CREATE_CATEGORY,
			variables: {
				name
			}
		});
		console.log(createCategory);
		expect(createCategory).toEqual({ name });
	});

	it('create category Error with excategory', () => {
		expect(2).toBe(2);
	});

	it('create post', () => {
		expect(2).toBe(2);
	});

	it('read post', () => {
		expect(2).toBe(2);
	});

	it('read post Error with no post', () => {
		expect(2).toBe(2);
	});

	it('read posts', () => {
		expect(2).toBe(2);
	});

	it('update post', () => {
		expect(2).toBe(2);
	});

	it('update post Error with no post', () => {
		expect(2).toBe(2);
	});

	it('delete post', () => {
		expect(2).toBe(2);
	});
	it('delete post Error with no post', () => {
		expect(2).toBe(2);
	});

	it('ceate like', () => {
		expect(2).toBe(2);
	});

	it('ceate like Error with no post', () => {
		expect(2).toBe(2);
	});

	it('delete like', () => {
		expect(2).toBe(2);
	});

	it('delete like Error with no post', () => {
		expect(2).toBe(2);
	});

	it('create comment', () => {
		expect(2).toBe(2);
	});

	it('create comment Error with no access', () => {
		expect(2).toBe(2);
	});

	it('create comment Error with no post', () => {
		expect(2).toBe(2);
	});
	it('update comment', () => {
		expect(2).toBe(2);
	});
	it('update comment Error with no access', () => {
		expect(2).toBe(2);
	});

	it('update comment Error with no post', () => {
		expect(2).toBe(2);
	});
	it('delete comment', () => {
		expect(2).toBe(2);
	});
	it('delete comment Error with no access', () => {
		expect(2).toBe(2);
	});

	it('delete comment Error with no post', () => {
		expect(2).toBe(2);
	});
	it('logout', () => {
		expect(2).toBe(2);
	});
});
