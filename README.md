# 타입스크립트 + 넥스트 + 그래프 큐엘을 이용한 퍼스널 브랜딩 블로그

## 프로젝트 목적

 2019년 떠오르는 기술인 타입스크립트와 그래프 큐엘을 사용하여 개인 블로그를 만들기 위한 프로젝트입니다. 이를 통해 다음과 같은 목적을 달성할 것입니다.

 01. 동적 타입 언어인 자바스크립트의 타입 취약성을 보완해주는 타입스크립트 도입

 02. REST API를 대체하는 GraphQL의 설계 패턴을 익힌 후 프론트 엔드에 적용 

 03. 아키텍쳐 설계 - 프로젝트 환경 설정 - 개발 - 배포의 과정 

 ## 그래프 큐엘 Setting

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

 - apollo-serve는 Apollo에서 제공하는 GaphQL 서버 패키지입니다.
 - graphql은 Facebook에서 정의한 GraphQL 스펙을 JS언어로 구현한 패키지입니다. 

  apollo-server와 apollo-client 모두 내부적으로 graphql 패키지에 의존하고 있기에 반드시 함께 설치해주어야 합니다. 

### 기본적인 서버 코드 작성하기 

apollo-server를 이용하기 위해서 기본저으로 다음과 같이 index.js파일을 작성합니다.

```javascript
const {ApolloServer, gql} = require('apollo-server');
```

- ApolloServer는 GraphQL 서버 인스턴스를 만들어주는 생성자입니다.
- gql은 자바스크립트로 GraphQL 스키마를 정의하기 위해 사용되는 템플릿 리터럴 태그입니다. 

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

- typeDefs 변수는 gql을 이용해 GraphQL 스키마 타입을 정의합니다.
- resolvers 변수는 GraphQL 스키마를 통해 제공할 데이터를 정의하는 함수를 담은 객체를 할당합니다. 
- 위는 String 데이터에 응답할 수 있는 ping이라는 쿼리를 정의한 후, ping이라는 쿼리 요청이 들어오면 항상 pong이라는 문자열을 응답하도록 한 것입니다. 

마지막으로 다음과 같이 작성합니다.


```javascript
const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(({url})=>{
    console.log(`Listening at ${url}`);
});
```

- 위 코든느 typeDefs와 resolvers를 ApolloServer 생성자에 넘겨 GraphQL 서버 인스턴스를 생성하고 그 서버를 시작해주는 코드를 작성합니다. 

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

- **curl**은 다양한 프로토콜로 데이터를 전송하는 라이브러리, 명령줄 도구입니다.
    - 원격 서버(FTP, HTTP등)에서 파일을 받아 보여주는 도구입니다. 
- 또한 Graph QL 서버는 Playground라고 하는 웹 기반 툴이 있어서 브라우저에서도 쿼리를 확인할 수 있다는 장점이 있습니다.

 ## 익스프레스 Setting

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