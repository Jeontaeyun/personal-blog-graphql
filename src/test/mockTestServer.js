/**
 * 테스트에는 express가 없어서 mocking을 해주는 코드
 * JEST를 사용해 테스트를 진행할 때(단위 테스트) 해당 테스트랑 연동되는 부분의 기능을
 * 구현해주는 것을 Mocking이라고 한다.
 */
const { ApolloServer } = require("apollo-server");
const graphqlConfig = require("../graphql");
const db = require("../models");
const baseContext = {
    req: {
        user: null,
        login: (user, cb) => {
            this.user = user;
            baseContext.user = user;
            cb();
        },
        logout: () => {
            baseContext.user = null;
            this.user = null;
        }
    },
    db,
    user: null
};

module.exports = {
    testServer: new ApolloServer({
        ...graphqlConfig,
        context: baseContext
    }),
    // For easy access in tests
    baseContext
};
