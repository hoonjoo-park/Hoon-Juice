---
title: 'Express와 Prisma로 간단한 백엔드 구축하기'
date: '2023.02.11'
category: 'Web'
excerpt: 'Prisma ORM과 Express, 그리고 MySQL을 통해 배달음식 메뉴들을 불러올 수 있는 api를 만들어보자!'
thumbnail: '/images/prisma-express.webp'
---

> 이번 "담아"프로젝트를 진행하면서,  
> MockData가 아닌 실제 내가 만든 메뉴 api를 활용하게 됐다.

사실... 직접 api를 만들게 된 큰 이유는 없고...

그냥 백엔드 개발에도 흥미가 있었기에, "기초적인 것부터 이렇게 만들어 나가면 점차 성장할 수 있지 않을까?" 라는 생각에서였을 뿐이다.

## Prisma?

![](https://user-images.githubusercontent.com/67448481/218266387-fb22911b-aaf4-4294-b842-e164a5673a87.png)

> Node.js 기반의 ORM(Object Relational Mapping) 이다.  
> ( 개발자가 데이터베이스에 쉽게 접근(CRUD)할 수 있도록 돕는 라이브러리 또는 프레임워크라고 할 수 있다. )

나는 Prisma를 통해 내가 만든 MySQL DB에 접근해 데이터를 fetching하는데 활용해보고자 했다.
그리고 방금 알았는데, Prisma를 만든 사람들이 Heroku 창업자 및 GraphQL 개발자라고 한다 🥺

---

## 설치 방법

> 우선 프로젝트부터 생성하자.

```bash
mkdir [projectName] && cd [projectName]

# yarn init을 통해 package.json을 생성해준다.
yarn init
```

### 필수 라이브러리 설치 (타입스크립트 기준)

> 편의성을 위해 nodemon도 함께 설치해줬다.  
> noemon은 런타임에서 코드 변화가 생겼을 때 자동으로 서버를 재실행 시켜준다.

```bash
### 만약 본인이 Typescript를 사용하지 않는다면 앞에 @types가 붙은 것들은 무시해줘도 된다.
$ yarn add prisma @prisma/cli express @types/node @types/express nodemon
```

### tsconfig 생성

```bash
$ npx tsc --init
```

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": ".",
    "strict": true,
    "jsx": "react",
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
```

### prisma init

```bash
# 루트 디렉토리에서 아래의 코드를 입력해 prisma init을 해준다.

$ npx prisma init

```

> 위의 명령어를 입력하면 prisma 폴더가 생성되며 schema.prisma 파일이 생성될 것이다. (만약 안됐다면 직접 생성해주자!)

---

## Prisma로 스키마 만들기

> 자, 이제 초기세팅의 절반정도를 해냈다!  
> 이제는 Model과 Schema를 작성해보도록 하자.

### schema.prisma 세팅

```json
// 기본적으로 아래와 같은 코드가 세팅되어 있을 텐데 provider를 mysql로 변경해주기만 하면 된다
generator client {
	provider = "prisma-client-js"
}

datasource db {
	provider = "mysql" // 여기!
	url = env("DATABASE_URL") // 이 부분은 바로 뒤에서 설명..!!
}
```

### model 만들기

> 그리고 위의 파일 안에 model을 하나 생성해주자.

```json
model Menu {
	id                 Int @id @default(autoincrement())
	name          String
	price           Int
	imageUrl    String
}
```

### PrismaClient 인스턴스 생성하기

> prisma 폴더 안에 prisma.ts라는 파일을 만들어주자.

```typescript
import { PrismaClient } from '@prisma/client'

// PrismaClient 인스턴스를 생성하고 export 해준다.
const prisma = new PrismaClient()

export default prisma
```

---

## MySQL과 Prisma 연결하기

> 일단, 나는 MySQL Workbench를 사용하고 있다.

### DB 생성하기

우선 DB부터 생성해주자. hostname은 localhost 또는 본인 컴퓨터의 ip주소를 입력하면 된다.
그리고, Port 넘버는 본인이 원하는 숫자를 넣으면 된다. (3306이 기본값)

![](https://user-images.githubusercontent.com/67448481/218266388-8c379bff-d9fd-4c78-9b8e-bf2248504466.png)

### 생성한 DB 정보를 토대로 Prisma에 DATABASE_URL 설정해주기

> 다시 프로젝트 루트 디렉토리로 돌아가보자.  
> 그러면 .env라는 파일이 보일텐데 해당 파일을 클릭한다.

```json
// 그리고 아래와 같은 양식으로 DB URL을 작성해주면 된다.
DATABASE_URL="mysql://USERNAME:PASSWORD@HOSTNAME:PORT/CONNECTION_NAME"

// 나의 경우는 이렇게 설정했다.
DATABASE_URL='mysql://root:mypassword@localhost:3306/dama_db
```

### Prisma Migrate하기

> Migrate를 통해 아까 작성한 schema.prisma를 MySQL에 실제 테이블로써 생성할 수 있다.

만약 mysql이 설치되어있지 않다면, [이 링크](https://losskatsu.github.io/it-infra/mysql-install-mac/#%EC%B0%B8%EA%B3%A0-%EB%A7%81%ED%81%AC)에 접속해 설치를 하길 바란다.

```bash
# 우선 터미널에서  mysql을 실행시킨다.
mysql -u root -p

# prisma 폴더로 이동한다.
cd prisma

# 그리고 아래 코드를 입력한다.
npx prisma migrate dev --name create_menu
```

이를 실행하면 migrantions 폴더가 생성되고, --name 뒤에 작성했던 텍스트가 타임스탬프 뒤에 붙어 파일이 하나 생성된다. (하나의 히스토리라고 생각하면 될 것 같다)

![](https://user-images.githubusercontent.com/67448481/218266381-295c849d-0852-41be-9d61-9bed2a7ec1c4.png)

이제 이렇게 내가 만든 schema와 model이 mysql로 성공적으로 이전됐다는 메시지가 터미널에 뜰 것이다.

---

## Express 세팅하기

> 우선 루트 디렉토리에 src 폴더를 생성하고, 그 안에 app.ts 파일을 생성해줬다.

그리고 해당 코드 안에, 서버 구축을 위한 코드를 작성해준다.

```typescript
import express from 'express'

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`🦁 Server is running on ${PORT}`))
```

> 터미널에 `yarn dev`를 입력해 실행하면, 이제 서버가 내 로컬 환경에서 실행된다.

---

## 간단한 GET, POST 요청 엔드포인트 만들기

![](https://user-images.githubusercontent.com/67448481/218266377-47d05d7a-d88d-4b66-b411-8dbcee200c98.png)

> 드디어..... 이제 모든 세팅이 끝났다!!  
> 간단한 GET, POST 요청 엔드포인트 구현을 통해 고됐던 초기 세팅에 대한 성취감을 만끽해보도록 하자!

우선, POST 요청으로 Menu 테이블에 데이터(row)를 추가해보자.
일단 `menu.ts` 파일을 src 폴더에 만든다.

```typescript
// 그리고 아래와 같이 코드를 작성하면 된다.

import { Request, Response, Router } from 'express'
import prisma from '../prisma/prisma' // 아까 미리 생성해뒀던 PrismaClient 인스턴스

export const menuUrl = '/menu'
const menuRouter = Router()

menuRouter.post('/', async (req: Request, res: Response) => {
  try {
    // params로 name, price, imageUrl을 넘겨줄 예정
    const { name, price, imageUrl } = req.body

    const menu = await prisma.menu.create({
      data: {
        name,
        price,
        imageUrl,
      },
    })

    res.status(200).json({ menu })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

export default menuRouter
```

> 그리고 이 menuRouter를 app.ts에 등록해준다.

```typescript
app.use(menuUrl, menuRouter)
```

### Postman으로 POST 요청 (메뉴 등록하기)

> 이제 Postman을 통해 POST요청을 아래와 같이 보내보도록 하겠다.

![](https://user-images.githubusercontent.com/67448481/218266382-c34d656e-4306-4f70-8d86-0d7ef28ac0d1.png)

> 그러면? 아래와 같이 200코드와 함께 리스폰스가 제대로 도착한 것을 확인할 수 있다 :)

![](https://user-images.githubusercontent.com/67448481/218266384-5bc61af8-415d-441f-bf54-4145dd078766.png)

### Prisma를 활용한 GET 요청

> 그러면 이제 바로 모든 메뉴를 불러올 수 있는 GET 요청 엔드포인트를 만들어보겠다.

```typescript
menuRouter.get('/', async (req: Request, res: Response) => {
  try {
    //  findMany에 어떤 매개변수도 넣지 않으면 해당 테이블의 모든 데이터를 불러올 수 있다.
    const menus = await prisma.menu.findMany()
    res.status(200).json({ menus })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})
```

> 그리고 바로 Postman을 통해 확인을 해보면!

![](https://user-images.githubusercontent.com/67448481/218266380-043783e3-f660-42eb-a438-a4aec1210235.png)

아까 추가했던 순살치킨이 정상적으로 반환되는 것을 확인할 수 있다.

---

## 정리 및 요약

> Prisma는 ORM으로 개발자가 DB에 접근 및 핸들링할 수 있도록 돕는 하나의 도구다.  
> 이를 통해 mySQL과의 연동으로 데이터를 넣고 빼는 (POST, GET) api를 매우 쉽게 만들 수 있었다.

생각보다는 포스팅 길이가 길어졌지만... 그래도 백엔드에 한 발자국 다가갈 수 있는 좋은 기회였던 것 같다.
현재 회사에서는 `Sequelize` ORM을 사용하고 있는데, 둘 다 공부해보면 앞으로 더 나에게 맞는 ORM을 찾아 익힐 수 있지 않을까 싶다.

다음 포스팅에서는 이번에 만든 API를 활용해 "담아" 앱을 MVVM 및 Data Binding 패턴으로 구현하는 방법에 대해서 다뤄볼 예정이다.

---
