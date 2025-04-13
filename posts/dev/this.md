---
title: 'Javascript와 This'
date: '2023.05.01'
category: 'Javascript'
excerpt: '앱 아이콘과 런치스크린은 내가 만든 어플리케이션의 첫 인상이 될 수 있다. 이 중요한 첫 인상을 어떻게 구현할 수 있을지 알아보자.'
thumbnail: '/images/this.webp'
---

> this는 바닐라 자바스크립트를 통한 개발을 할 때에는 자주 사용했었지만,
> 리액트로 개발을 하며(함수형) 최근에는 사용할 일이 없었다.

하지만, 최근 DFS/BFS와 같은 트리 순회 알고리즘을 공부하며 클래스를 자주 사용하게 됐는데, 이에 따라 `this`와 부딪힐 일이 많아졌다.

예전에는 그냥 `this`가 단순히 모호한 의미에서 “나 자신(myself)”이라고만 생각하고 날림식으로 개발을 했었다. 하지만 계속 사용하다 보니, 사용할거면 제대로 알고 사용해야겠다는 생각이 들었다.

---

## this?

> 그렇다면 this란 무엇을 의미하는걸까?

결론부터 얘기하자면, `this`란 **함수 호출을 한 객체**를 가리킨다. (”누가 날 불렀어?”)

그리고 반드시 짚고 넘어가야 하는 부분 중 하나는, 자바스크립트에서의 `this`는 **호출 방식에 따라 동적으로 결정된다**는 점이다. 말이 어렵게 느껴질 수 있는데, 쉽게 얘기하면 **“누가 날 불렀는지에 따라 `this`가 결정된다”**는 것이다.

> ⛑ 주의사항 : 이 부분은 함수가 “정의”된 시점에서 상위 스코프를 결정하는 렉시컬 스코프와 헷갈릴 수 있는 부분이다. 따라서 렉시컬 스코프는 “정의”, this 바인딩은 “호출”에 따라 동적으로 결정된다는 것을 다시 한 번 명심하도록 하자.

![](https://user-images.githubusercontent.com/67448481/157722478-a42177bc-3e8d-4165-80bf-76ee2fe071d2.png)

위의 그림의 예시처럼, 같은 “아들“이지만, 아들을 호출한 사람이 누구냐에 따라 불려진 아들이 누군지 달라지는 것과 같은 맥락이라고 볼 수 있다.

---

## 함수에서의 this

> 코드로 한 번 예시를 들어보도록 하겠다.
> 우선 빈 허공(?)에 `this`를 찍어서 호출해보자.

![](https://user-images.githubusercontent.com/67448481/157722492-5008adf7-1f1c-4103-92f6-6173ddd30a18.png)

그러면 위와 같이 `window` 객체가 반환되는 것을 확인할 수 있다. 이 뜻은 this를 호출한 것이 `window`라는 뜻이다. 이는 어찌 보면 굉장히 당연한 얘기다. 그냥 어떠한 것도 지정하지 않은채 `window`라는 글로벌 영역 위에서 `this`를 호출했기 때문이다.

> 이 때 우리는 “**this가 window에 바인딩 됐다**” 라고 표현한다.

![](https://user-images.githubusercontent.com/67448481/157722493-18b56648-161c-49e1-b833-d9c85c6153fb.png)

하지만, 이는 자바스크립트의 모드가 strict mode(use strict)가 아닐 때의 얘기고, 만약 strict mode가 적용된 상태라면 `this`는 `undefined`가 된다. (디폴트 바인딩이 존재하지 않기 때문)

> 전역함수와 내부함수는 기본적으로 자기 참조 변수(`this`)가 필요 없다. 따라서 객체를 생성할 일도 없기 때문에 ‘use strict’를 사용하면 `undefined`가, 그렇지 않다면 window 객체가 `this`에 바인딩 된다. (일반함수로 호출되면 인스턴스를 생성할 일이 없기에 자기 참조 변수가 필요 없음)

### 일반함수

그렇다면 아래의 경우는 어떨까?

```javascript
function sayThis() {
  console.log(this)
}
sayThis()
```

⇒ 이 경우도 동일하게 strict mode일 때는 undefined가, 그렇지 않을 때는 window 객체가 반환된다.

그럼 이 경우는?

```javascript
function outer() {
  console.log(this) // window
  function inner() {
    console.log(this) // window
  }
  inner()
}

outer()
```

위의 예시 또한 동일하다. 필자도 처음에는 “어..? `inner`함수가 `outer`에서 호출 됐으니 `outer`가 바인딩 되어야 하는 것 아닌가?”라는 생각을 하며 헷갈렸던 부분이다. 하지만 자바스크립트에서 내부함수는 일반함수, 콜백함수, 메서드 어디에서 선언되어도 전역객체를 바인딩 한다는 것을 명심해야 한다.

> 다시, 내부함수는 일반함수던, 콜백함수던, 메서드 함수던, “내부”에서 호출되었으면 전역객체를 디폴트로 바인딩 한다.

### 내부함수를 바인딩하는 방법

> `apply`, `call`, `bind`를 활용해서 메서드나 콜백함수의 내부함수를 명시적으로 바인딩 해줄 수 있다.

```javascript
const aboutMe = {
  name: 'hoonjoo',
  introduce: function () {
    console.log('this is ', this) // aboutMe
    console.log('my name is ', this.name) // hoonjoo
    // 내부함수
    function inner() {
      console.log('inner this: ', this)
      console.log('inner name is ', this.name)
    }
    inner.apply(aboutMe) // 방법1: apply 사용
    inner.call(aboutMe) // 방법2: call 사용
    inner.bind(aboutMe)() // 방법3: bind 사용 (bind는 즉시 실행이 아닌, 새로운 함수를 리턴해줌)
  },
}

aboutMe.introduce()
```

---

## Method에서의 this

> 위에서 약간의 스포일러가 있었지만, 다시 한 번 설명하자면
> 함수가 메서드 내에서 **특정 프로퍼티의 값이라면 메서드가 포함된 객체가 호출자**가 된다 (전역 객체 바인딩 X)

바로 코드로 넘어가보자.

```javascript
const aboutMe = {
  name: 'hoonjoo',
  introduce: function () {
    console.log(`제 이름은 ${this.name}입니다.`)
  },
}

const myFriend = {
  name: 'joongseob',
}

myFriend.introduce = aboutMe.introduce

aboutMe.introduce() // ?
myFriend.introduce() // ?
```

> 위 코드에서 `aboutMe`와 `myFriend`의 실행 결과는 어떻게 될까?

정답부터 얘기하면,

- `aboutMe`의 `this`는 ‘hoonjoo’로 바인딩 된다.
- `myFriend`의 `this`는 ‘joongseob’으로 바인딩 된다.

---

## 생성자 함수에서의 this

> 생성자 함수란, 클래스와 비슷하게 객체를 생성하는 역할을 하는 함수다.
> 주로 `const OOO = new 생성자함수();`와 같이 활용한다.

```javascript
// 생성자 함수는 대문자로 시작하는 것이 일반적이다.
function Family(name) {
  // 리턴을 명시해주지 않은 이유는,
  // 생성자 함수는 리턴을 명시하지 않아도 막 새로 생성된 객체를 반환해주기 때문이다.
  this.name = name
}

const brother = new Family('Chan')
console.log(brother) // Family {name: "Chan", constructor: Object}
```

위 코드에서 볼 수 있듯, 생성자 함수를 활용하면 새로 생성된 객체에 `this`가 바인딩 된다. 하지만 주의할 점은, `new`를 명시해주지 않으면 이는 생성자 함수로써의 기능을 유실하기 때문에, 반드시 생성자 함수를 사용할 때에는 `new`와 함께 사용해야 한다. (`new` 사용하지 않으면 전역객체에 바인딩)

### 생성자함수의 동작 방식

![](https://user-images.githubusercontent.com/67448481/157722496-ea26f4ad-eec9-4192-86ba-ff7b2d6bf87d.png)

생성자 함수가 실행되면,
빈 객체가 생성되고 → 그 빈 객체에 내가 설정한 프로퍼티 또는 메서드가 저장된다 → 그리고 새롭게 만들어진 객체를 반환해준다.

이를 위의 코드로 다시 설명 해보면 아래와 같다.

```javascript
function Family(name) {
  // 1.빈 객체가 만들어짐
  this.name = name // 2.name이라는 프로퍼티가 입력됨
  // 3.자동으로 새로 만들어진 객체를 반환해줌
}

const brother = new Family('Chan') // 실행!
```

---

## 화살표 함수에서의 this

> 위에서 분명 내부 함수는 전역객체를 바인딩한다고 신신당부 했었다.
> 하지만 이를 우회할 수 있는 방법이 있는데, 화살표 함수(Arrow Function) 를 사용하는 것이다.

화살표 함수는 일반 함수와는 다르게, 바인딩할 this를 정적으로 결정한다. 이를 Lexical This라고도 하는데, 풀어 설명하자면 상위 스코프의 this를 가리킨다는 뜻이다.

이를 코드로 다시 설명해보자면 아래와 같다.

```javascript
const aboutMe = {
  name: 'hoonjoo',
  introduce: function () {
    console.log(`제 이름은 ${this.name}입니다.`)
    const inner = () => {
      console.log(`저도 ${this.name}입니다.`)
    }
    inner()
  },
}

aboutMe.introduce()
// 실행 결과 :
// 제 이름은 hoonjoo입니다.
// 저도 hoonjoo입니다.
```

분명 위에서는 메서드 내의 내부함수는 `call`, `bind`, `apply`를 사용해서 `this`를 명시적으로 바인딩 해줘야 했었다. 하지만 위의 코드처럼 화살표 함수를 사용하면 내부함수를 사용했더라도, 전역객체가 아닌 상위 스코프의 `this`를 저절로 바인딩 한다.

---

## 정리 및 요약

`this`는 호출자에 의해 동적으로 결정되는 하나의 객체이자 출처라고 할 수 있다. use strict를 사용하지 않는 경우, 일반함수에서 `this`를 사용하면 전역객체인 window를 바인딩 한다. 또한, 내부함수는 `apply`, `call`, `bind` 메서드 또는 화살표 함수를 사용하지 않는 한, 전역객체를 자동으로 바인딩 한다.

내부함수와 반대로 메서드 안에서 프로퍼티의 값으로 쓰인 함수는 메서드가 포함되는 객체를 바인딩 한다. 또한, 생성자 함수를 사용해도 생성자 함수에 의해 새로 생성된 객체를 바인딩 한다.

| 호출 방식              | this 바인딩 대상                   |
| ---------------------- | ---------------------------------- |
| 일반 함수 호출         | 전역 객체 (`window` 또는 `global`) |
| 메소드 호출            | 메서드를 호출한 객체               |
| 생성자 함수 호출       | 생성자 함수가 생성할 인스턴스      |
| apply, call, bind 호출 | 명시한 객체 (인자로 전달한 객체)   |

### 세 줄 요약

1. this는 자신(함수)을 호출한 객체를 지칭한다.
2. 내부함수는 화살표 함수, apply, bind, call를 사용하지 않는 한, 전역객체를 바인딩한다.
3. 메서드의 프로퍼티로 쓰인 함수와 생성자 함수는 호출 객체를 바인딩한다.
