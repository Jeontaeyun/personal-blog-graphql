# 타입스크립트 + 넥스트 + 그래프 큐엘을 이용한 퍼스널 브랜딩 블로그

## 프로젝트 목적

2019년 떠오르는 기술인 타입스크립트와 그래프 큐엘을 사용하여 개인 블로그를 만들기 위한 프로젝트입니다. 이를 통해 다음과 같은 목적을 달성할 것입니다.

1. 동적 타입 언어인 자바스크립트의 타입 취약성을 보완해주는 타입스크립트 도입

2. REST API를 대체하는 GraphQL의 설계 패턴을 익힌 후 프론트 엔드에 적용

3. 아키텍쳐 설계 - 프로젝트 환경 설정 - 개발 - 배포의 과정

## 그래프 큐엘 설정

### 프로젝트 환경 구성

```bash
$mkdir <serverName>
$cd <serverName>
$touch index.js or index.tsx
$npm init -y
```

### Apollo Server 설치

```bash
 $npm i apollo-server graphql
```

-   apollo-serve는 Apollo에서 제공하는 GaphQL 서버 패키지입니다.
-   graphql은 Facebook에서 정의한 GraphQL 스펙을 JS언어로 구현한 패키지입니다.

apollo-server와 apollo-client 모두 내부적으로 graphql 패키지에 의존하고 있기에 반드시 함께 설치해주어야 합니다.

### 기본적인 서버 코드 작성하기

apollo-server를 이용하기 위해서 기본적으로 다음과 같이 index.js파일을 작성합니다.

```javascript
const { ApolloServer, gql } = require("apollo-server");
```

-   ApolloServer는 GraphQL 서버 인스턴스를 만들어주는 생성자입니다.
-   gql은 자바스크립트로 GraphQL 스키마를 정의하기 위해 사용되는 템플릿 리터럴 태그입니다.

그 후 다음과 같은 코드를 작성합니다.

```javascript
const typeDefs = gql`
    type Query {
        ping : String
    }
`;

const resolvers = {
    Query: {
        ping() => "pong"
    }
};
```

-   typeDefs 변수는 gql을 이용해 GraphQL 스키마 타입을 정의합니다.
-   resolvers 변수는 GraphQL 스키마를 통해 제공할 데이터를 정의하는 함수를 담은 객체를 할당합니다.
-   위는 String 데이터에 응답할 수 있는 ping이라는 쿼리를 정의한 후, ping이라는 쿼리 요청이 들어오면 항상 pong이라는 문자열을 응답하도록 한 것입니다.

마지막으로 다음과 같이 작성합니다.

```javascript
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`Listening at ${url}`);
});
```

-   위 코드는 typeDefs와 resolvers를 ApolloServer 생성자에 넘겨 GraphQL 서버 인스턴스를 생성하고 그 서버를 시작해주는 코드를 작성합니다.

### 서버 구동

콘솔에 다음과 같이 입력하면 GraphQL 서버가 구동되고 콘솔에 EndPoint URL이 출려됩니다.

```bash
$node .
$node index.js
```

### 서버 테스트

콘솔에 다음과 같이 서버의 응답 결과를 테스트할 수 있습니다.

```bash
$curl -X POST "http;//localhost:4000" -H "content-type: application/json" -d '{"query":"{ping}"}'
```

-   **curl**은 다양한 프로토콜로 데이터를 전송하는 라이브러리, 명령줄 도구입니다.
    -   원격 서버(FTP, HTTP등)에서 파일을 받아 보여주는 도구입니다.
-   또한 Graph QL 서버는 Playground라고 하는 웹 기반 툴이 있어서 브라우저에서도 쿼리를 확인할 수 있다는 장점이 있습니다.

## 익스프레스 설정

```bash
 $npm i apollo-server-express
 $npm i express
```

그 후 index.js 파일에 다음과 같이 구현합니다.

```javascript
import expess = require('express');
import { ApolloServer } = require('apollo-server-express');

const app = express();
...
const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.applyMiddleware({app, path: '/graphql'});

app.listen({port: 8000}, ()=> {
    console.log('Apollo Server on http://localhost:8000/graphql');
});
```

CORS 문제를 해결하기 위해 CORS 라이브러리를 익스프레스에 추가해줍니다.

```bash
$npm i cors
```

```javascript
import cors = require('cors');
import expess = require('express');
import { ApolloServer } = require('apollo-server-express');

const app = express();
app.use(cors());

...

```

## MySQL과 Sequelize 설정

```bash
$npm i mysql2 sequelize
$npm i nodemon -dev
$npm i sequelize-cli -g
```

그 후 다음 sequelize-cli를 이용해 sequelize를 초기화 합니다.

```bash
$sequelize init
```

이러면 config, models, migration, seeders라는 폴더가 자동으로 생성됩니다.  
model폴더 안에 다음과 같이 각 테이블에 대한 스키마를 만들어 주면 됩니다.

다음은 posts 테이블에 대해 기술한 부분입니다.

```javascript
module.exports = (sequelize, DataTypes) => {
    // TABLE NAME : posts
    const Post = sequelize.define(
        "Post",
        {
            title: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            charset: "utf8",
            collate: "utf8_general_ci",
            tableName: "posts",
        },
    );
    Post.associate = db => {
        db.Post.belongsTo(db.User);
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
        db.Post.belongsToMany(db.Tag, { through: "PostTag" });
        db.Post.belongsToMany(db.User, { through: "Like", as: "Liker" });
    };
    return Post;
};
```

## 프로젝트 초기 Index.js 설정

```javascript
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");

const { ApolloServer, gql } = require("apollo-server-express");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

const db = require("./models");

const dotenv = require("dotenv");
const morgan = require("morgan");

// Express App Init
const app = express();
dotenv.config();

// Apollo Server Init
const server = new ApolloServer({
    typeDefs: gql(typeDefs),
    resolvers,
    context: { db },
});

// Express Environment Setting
app.use(morgan("dev"));
app.use(express.json());
// JSON형태의 본문을 처리하는 express 미들웨어
app.use(express.urlencoded({ extended: true }));
// FORM을 처리해주는 express 미들웨어
app.use(
    cors({
        origin: true,
        credentials: true,
    }),
);
app.use("/", express.static("public"));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
            httpOnly: true,
            secure: false,
        },
        name: "...",
    }),
);

//Database Init
db.sequelize.sync();

// Express API
server.applyMiddleware({ app, path: "/graphql" });

//Starting Express App
app.listen({ port: 8000 }, () => {
    console.log("Apollo Server on ...");
});
```

## JEST와 apollo-server-testing 라이브러리 설정

apollo-server-testing 라이브러리와 JEST를 이용해 Apollo-Server를 테스트 하는 방식은 다음과 같다.

먼저, GraphQL의 typeDefs와 schema를 넣은 testServer를 생성

```javascript
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
        },
    },
    db,
    user: null,
};

module.exports = {
    testServer: new ApolloServer({
        ...graphqlConfig,
        context: baseContext,
    }),
    baseContext,
};
```

context에 express와 연동된 부분을 넣는 것 보단 Mock을 구현해볼 겸 passport.js 기능과 req를 구현하여 basecontext에 넣어주었다.  
 이 후 다음과 같이 testClient를 생성해줍니다.

```javascript
const { testServer } = require("./mockTestServer");
const { gql } = require("apollo-server-express");
const { createTestClient } = require("apollo-server-testing");
const dotenv = require("dotenv");
dotenv.config();

const { query, mutate } = createTestClient(testServer);
```

위에서 생성 된 query와 mutate와 JEST의 함수를 이용해 다음과 같이 Apollo-Server를 테스트 할 수 있습니다.

```javascript
describe('테스트 그룹 단위', () => {
it('유저를 생성하는 테스트', async () => {
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
...
```

## 프로젝트 고찰

### 01. Graph QL의 사용

2019년도 웹 개발 트렌드인 Graph QL을 서버측과 클라이언트 측 모두에서 사용해 보았다.  
 이를 사용해 본 후 느낀점은 GraphQL이 다양한 플랫폼과 다양한 서버 환경에서의 데이터 통신을 지원하며 API 호출간 불필요 한 오버 패치와 언더 패치를 방지해주는 유용한 기술 스택이라는 것을 알았다.

일단 그래프 큐엘의 큰 장점 및 특징은 다음과 같다.

-   **다양한 환경**의 데이터를 집약할 수 있다. 데이터베이스, 레거시 API, 파일 시스템 등 다양한 환경에 접근할 수 있다.
-   **다양한 플랫폼**에 데이터를 보낼 수 있다. 모바일(IOS, Android), 웹, IOT 전자기기 등 다양한 플랫폼에 대응 가능하다
-   데이터를 질의어 형식으로 교환하여 **불필요한 언더 패치와 오버 패치를 방지**할 수 있다.

다만, GraphQL을 통한 인증(Authentication) 등 기타 몇몇 부분에서 문제가 발생한다고 한다. 따라서 하나의 기술 스택으로 생각하고 기존의 REST API와 같이 혼합해서 사용하면 백엔드와 프론트엔드간의 작업 효율을 향상시키고 다양한 플랫폼에 손쉽게 적용할 솔루션일 것이라 생각한다.

### 02. JEST와 테스트

해당 프로젝트에서 Server를 만들고 테스트 할 때마다 로그인 하고, Graph QL 쿼리를 플레이 그라운드에서 직접 작성하는 것이 번거로움을 느꼈다.  
 이런 불편함을 해결하기 위해 Apollo-Server를 테스팅하는 방법을 찾아보았고 2019년 테스팅 프레임웤크로 화두가 되고있는 JEST를 사용해보기로했다.
이를 통해 테스트에 대한 3가지 특성을 알았다.

-   테스트를 위한 코드를 작성하는 것에도 반드시 시간(비용)이 소모된다.
-   통합 테스트 코드(Integration Testing)은 전체 기능을 빠르게 테스트 할 수 있지만 연결이 많은 만큼 작성을 매끄럽게 하기 어렵다.
-   단위 테스트(Unit Testing)은 다른 연결과의 문제로 테스트가 어려울 때 Mocking이 필요하다.

테스트에 대한 위의 특성을 통해 나는 다음과 같이 테스트의 장단점에 대해 알게 되었다.

| 구분 | 설명                                                                                                                                                                          |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 장점 | - 작성된 테스트 코드를 통해 개발된 코드를 수정해야할 때 반복된 테스트 절자를 자동화 할 수 있다.(비용절감)</br> - 필요한 동작에 대한 기능 재정의 및 안정적인 코드 작성(안정성) |
| 단점 | - 테스트 코드를 작성하기 위해 소모되는 시간이 많다.(생산성 하락)</br> - 테스트 코드를 테스트 하기 위한 복잡한 과정이 생긴다.                                                  |

이를 통해 테스트의 필요성을 느꼈지만, 상황에 따라 테스트를 도입할 지 말지에 대한 생각을 하게되었다.
