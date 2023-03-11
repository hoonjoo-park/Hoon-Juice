---
title: 'Global Central Dispatch (GCD)'
date: '2023.03.11'
category: 'Swift'
excerpt: 'GCD(Grand Central Dispatch)는 Swift에서 멀티 쓰레드 프로그래밍을 지원하기 위한 하나의 기술로, 우리는 GCD를 통해 코드 로직들을 동시에 처리하거나, 비동기적으로 실행할 수 있다.'
thumbnail: '/images/gcd.webp'
---

> 이번 포스팅에서는, Swift에서 비동기 프로그래밍을 할 때 굉장히 중요한 개념인 GCD에 대해 다뤄볼 것이다.

## GCD란?

[애플 공식문서](https://developer.apple.com/documentation/dispatch/)에서의 Dispatch 및 GCD 정의

> _Execute code concurrently on multicore hardware by submitting work to dispatch queues managed by the system._

GCD의 골자는 "동시성"과 "멀티 쓰레드"이다.

GCD(Grand Central Dispatch)는 Swift에서 **멀티 쓰레드 프로그래밍을 지원하기 위한 하나의 기술**로, 우리는 GCD를 통해 코드 로직들을 동시에 처리하거나, 비동기적으로 실행할 수 있다. (Concurrently)

일단, 아직은 모호하기만 한 위의 개념에 대해 뜯어보기 전에, Dispatch 자체가 의미하는게 무엇인지에 대해 먼저 짚고 넘어가보자.

![](https://user-images.githubusercontent.com/67448481/224504920-ccea1e84-8a32-4881-a3df-6e0ae327e2fa.png)

> Dispatch라는 단어 자체를 를 직역하면, "보내다"이다.

이는 곧, 내가 실행시키고자 하는 특정 코드를 "어딘가"에 보낸다를 의미한다고 유추해볼 수 있을 것이다.

실제로, Swift에서는 `DispatchQueue`라는 클래스를 통해, 하나의 작업 대기열이자 저장소라고 할 수 있는 Queue를 생성하고 관리할 수 있다.

![](https://user-images.githubusercontent.com/67448481/224504919-a1e6c711-48f5-4149-a4ed-44f9554c6f32.png)

위의 그림처럼, Dispatch + Queue라는 것은, 특정 코드 로직을 어느 Queue에서 실행시킬 것인지 생성 및 결정하고 -> 이를 핸들링 할 수 있는 방법 중에 하나라고 볼 수 있을 것이다.

---

## 코드 예시

아래는 `DispatchQueue`를 통해 특정 코드 로직을 main 쓰레드에 할당하는 코드 예시이다.

```swift
var menus: [Menu]?

DispatchQueue.main.async {
		menus = fetchMenus()
}
```

하지만, 알다시피 Swift에서 `main queue` 는 UI 작업이 이루어지는 queue이다.

물론 위의 `fetchMenus`의 함수의 로직이 단순하고 가볍다면 문제가 없겠지만, 만약 굉장히 무겁거나 시간이 걸리는 작업이었다면 어땠을까?

`main queue`는 반드시 UI 업데이트 작업만을 해야하는데, 위의 `fetchMenus` 함수가 `main` 에 할당 되었기 때문에 UI 관련 작업들에 병목 현상이 생기게 될 것이다.

> 우리는 이를 방지하기 위한 대안으로, 아래와 같이 `fetchMenus` 함수를 `global queue`에 할당해줄 수 있다.

```swift
DispatchQueue.global(qos: .background).async {
		let menus = fetchMenus()
		setMenus(menus)
}
```

근데 global queue가 대체 뭘까...?

---

## global queue

우선, `global queue`는 `main queue`와 다르게 `qos`(Quality of Service)를 설정해줄 수 있다.

> qos 설정을 통해, 작업의 우선순위를 직접 지정해줄 수 있다.

뿐만 아니라, 이를 **concurrent queue(동시성 병렬 큐)로 사용할지, serial queue(직렬 큐)로 사용할지 또한 설정할 수 있다.**

### qos (quality of service) 클래스 종류

1. **userInteractive**</br>
   가장 높은 우선순위를 가지며, 유저와 직접 상호작용하는 이벤트 핸들링 및 UI 업데이트 작업 등에 사용된다. (ex. 유저가 버튼을 누른 즉시 실행되어야 하는 작업)
2. **userInitiated**</br>
   두 번째로 높은 우선순위를 가진다. 유저가 앱을 사용하며 즉각적인 데이터를 로드해줘야 하기 위한 로직에 사용될 수 있다.
3. **default**</br>
   기본값으로, 일반적인 백그라운드 작업에 사용된다.
4. **utility**</br>
   긴 시간이 소요되는 작업에 대한 우선순위다. 예를 들어, 파일 다운로드나 이미지 처리와 같은 작업에 사용될 수 있다. 주로 유저가 앱을 사용하는 데 있어 굳이 유저의 interaction에 영향을 주지 않아도 되는 작업들이 대부분이다.
5. **background**</br>
   가장 낮은 우선순위를 가지며, 백그라운드에서 실행되는 작업에 사용된다. (주로 DB 관련 작업이나 파일 백업과 같은 작업에 사용)

> 그런데... 진짜 마지막으로,
> 만약 위에서 실행한 두번째 라인 함수인 setMenus가 UI 업데이트를 수행하는 코드였다면 어떻게 됐을까?

굉장히 중요한 내용이기에 다시 반복하지만, **UI 관련 업데이트 작업은 main queue에서 일어나야 한다.**

하지만 위의 예시 코드에서는 `setMenus`가 `global quque`에 할당되어 있는데... 이런 경우는 어떻게 핸들링을 해줘야 할까?

답은 매우 간단하다. **DispatchQueue를 중첩으로 사용하면 되기 때문이다!**
바로 코드를 통해 설명해보도록 하겠다.

```swift
let menuTitle = UILabel()

DispatchQueue.global(qos: .userInitiated).async {
	// 일단... fetchMenuTitle이 굉장히 무거운 네트워킹 함수라고 가정해보자...
	// 이에 따라 global queue에 해당 로직을 할당!
	let fetchedTitle = fetMenuTitle()

	// 그리고 아래의 로직은 UI를 업데이트 하는 작업이기 때문에 main queue에 할당해주면 된다.
	 DispatchQueue.main.async { menuTitle.text = fetchedTitle }
}
```

### 정리

> 위에서 설명한 내용들을 요약한 사진이다.

![](https://user-images.githubusercontent.com/67448481/224504917-9ef0202b-1ca6-40da-85f4-9f241fb7cc12.png)

결국 queue는 하나의 작업 대기열이고, queue에서 작업 실행을 위한 쓰레드로 작업이 할당된다.
즉, 우리는 `DispatchQueue`를 통해 어떤 queue로 작업을 할당하고, 직접 핸들링 할 수 있는 것이다.

main queue는 UI 관련 작업을 위한 queue이다.
`global()`은 그 외의 백그라운드 로직을 global queue에 할당하고 이에 대한 우선순위 및 실행 방식을 옵션으로 줄 수 있도록 해준다.

여기까지가 GCD에 대한 기본적인 내용들이다.

하지만, serial queue와 concurrent queue, 그리고 Operation Queue에 대해서는 다루지 않았기 때문에 다음 포스팅에서 해당 내용에 대해 정리하며 GCD에 조금 더 깊게 접근해보려 한다.

---

## 참고한 자료

- [애플 공식문서](https://developer.apple.com/documentation/dispatch/)
- [Sundell 블로그](https://www.swiftbysundell.com/basics/grand-central-dispatch/)
- [Kodeco, Fabrizio Brancati의 article](https://www.kodeco.com/28540615-grand-central-dispatch-tutorial-for-swift-5-part-1-2)

---
