---
title: 'RxSwift 맛보기'
date: '2023.03.27'
category: 'Swift'
excerpt: 'RxSwift가 뭐길래 채용공고 지원자격에는 항상 이 녀석이 있을까?'
thumbnail: '/images/rxSwift.webp'
---

## RxSwift란?

> iOS 개발자 채용 공고의 자격요건에는 RxSwift가 거의 항상 포함되어있다...
> 도대체 RxSwift가 뭐길래 많은 기업들에서 이를 사용하고 있는걸까?

![](https://user-images.githubusercontent.com/67448481/227993863-e73a9c39-8a4a-4b29-b2e0-bda2b33604ed.png)

이러한 의문점을 시작으로, 이번 포스팅에서는 iOS 개발자라면 거의(?) 반드시 알아야 하는 RxSwift에 대한 기본적인 내용을 정리해볼 것이다. 우선 RxSwift가 무엇인지에 대해 알아보도록 하자.

### "RxSwift는 비동기 프로그래밍을 위한 라이브러리다."

> _"RxSwift is a library for composing asynchronous and event-based code by using observable sequences and functional style operators, allowing for parameterized execution via schedulers."_
>
> By Marin Todorov. ‘RxSwift — Reactive Programming with Swift.’

RxSwift는 "비동기적 & 이벤트 기반의 코드"를 구성하기 위한 라이브러리다.

쉽게 설명하자면, 비동기적으로 동작하는 작업에 대한 핸들링을 돕고, 이를 값으로써 받아 처리할 수 있도록 도와주는 라이브러리라고 볼 수 있는 것이다.

Swift는 멀티스레드 기반의 언어로, 크게 main-thread와 background-thread로 이루어져 있다. 주로 비동기 작업에 대한 처리는 background-thread에서, 그리고 UI작업은 main-thread에서 이루어지기 때문에, 우리가 작성한 코드가 동기적이고 순차적으로 딱딱 맞아떨어지게 동작할 것이라는 보장을 할 수가 없다.

> 이해를 돕기 위해 아래의 그림을 살펴보자.

![](https://user-images.githubusercontent.com/67448481/227993874-08785469-1df6-4c06-a8eb-32c54bac5796.png)

우리가 작성한 코드의 로직이 러프하게 위와 같다고 가정해보자.

당연히 네트워크 요청 로직이 `background-thread`에서 처리되고, UI를 그리는 작업은 `main-thread`에서 처리될 것이다. 이 때, 우리가 작성한 UI 그리기 로직은, 네트워크 요청이 완료될 때까지 기다려야 할 것이고, 네트워크 요청이 여러번 발생 가능한 경우라면 UI 그리기 로직이 해당 응답이 변경될 때마다 재실행 될 수 있도록 코드를 추가적으로 구현해줘야 할 것이다.

> 이 때 우리를 도와주는 것이 RxSwift다.

![](https://user-images.githubusercontent.com/67448481/227993879-669eac7f-f202-49b4-9de1-f7fa749b5cd4.png)

위의 그림과 같이 데이터의 변경 사항이 생겼을 때 이를 감지하여 내가 원하는 UI 로직을 수행할 수 있도록 돕는 라이브러리가 RxSwift인 것이다.

즉, RxSwift 핵심은, 비동기적으로 발생한 이벤트를 핸들링 할 수 있도록 돕고, 이러한 이벤트들을 값으로써 받아 개발자가 해당 값을 기반으로 특정 로직을 작성할 수 있도록 하는 굉장히 유용한 라이브러리라고 정리할 수 있다.

> 이제 그러면 이 RxSwift의 설치방법부터 시작해서 기본적인 활용 방법에 대해 살펴보도록 하자.

---

## 설치 방법

> 우선, RxSwift 라이브러리를 CocoaPod을 통해 프로젝트에 설치하는 방법은 아래와 같다.

1. 프로젝트 생성
   가장 먼저, 원하는 디렉토리에 프로젝트를 생성해주자.
2. cocoaPod 설치

```shell
brew install cocoapods

brew link --overwrite cocoapods
```

3. `pod init`

```shell
# 프로젝트 루트 디렉토리로 이동
cd yourProjectName

# 아래 명령어를 입력하면 Podfile이 세팅된다.
pod init
```

4. Podfile 열기

```shell
open Podfile
```

5. Podfile에 라이브러리 dependency 작성

```shell
# 아래 코드들을 작성해주면 된다.
use_frameworks!

pod 'RxSwift'
# RxCocoa는 UIKit과 RxSwift를 함께 사용할 수 있도록 돕는 라이브러리다. (필수 설치)
pod 'RxCocoa'
```

6. `pod install`

```shell
pod install
```

그리고 마지막으로, 디렉토리 내에 생성된 `[프로젝트명].workspace` 파일을 실행해주면 끝이다.
이제 그러면 본격적으로 RxSwift에서 사용되는 `Observable` 및 `Operator`에 대해 살펴보도록 하자.

---

## Observable

> 데이터 스트림을 생성 후, 해당 데이터 스트림에 대한 변화를 다른 객체에 "전달"하는 역할을 담당한다.

![](https://user-images.githubusercontent.com/67448481/227993883-0583c119-3589-4e2d-946a-8fe9848cd532.png)

위의 사진에서 직관적으로 확인할 수 있듯이, 데이터 스트림은 데이터가 생성 및 변화되는 하나의 시간 흐름이라고 볼 수 있고, 박스 그림은 Observable에서 방출하게 될 데이터 자체라고 볼 수 있다.

우리는 이 Observable 데이터 스트림을 구독(subscribe)하여, 해당 데이터 스트림에서 생성 및 변화하는 데이터에 대한 핸들링 로직을 작성할 수 있다. (subscribe는 바로 다음 섹션에서 설명할 예정)

### Observable의 생명주기

> "생성(Create) -> 구독(Subscribe) -> 이벤트 발생 (Emit) -> 성공 또는 에러 -> 종료"라는 생명 주기를 갖는다.

1. Create (Observable이 생성)
2. Subscribe (해당 Observable에 대한 구독)
3. Emit (구독자에게 이벤트를 방출)
4. onCompleted, onError (성공 또는 에러를 방출하며 종료)
5. Disposed (Observable에 대한 구독 해지 및 참조 제거)

### 핵심 Methods

#### just

> 단일값 Observable을 생성한다.

```swift
let observable = Observable.just("Hello World!")

observable.subscribe {.event in
		print(event) // Hello World!
}
```

위의 예시 코드와 같이, "단일값" Observable을 생성한 뒤 구독자에게 이를 전달해준다.

#### of

> 값을 차례대로 방출해주는 Observable을 생성한다.

```swift
let observable = Observable.of(1, "a", "가", [1, 2, 3, 4])

observable.subscribe { event in
	print(event)
}

// 1
// a
// 가
// [1, 2, 3, 4]
```

#### from

> 배열과 같은 시퀀스를 전달 받아 배열 내에 있는 값들을 차례대로 방출해주는 Observable을 생성한다.

```swift
let observable = Observable.from([1, 2, 3, 4])

observable.subscribe { event in
		print(event)
}

// 1
// 2
// 3
// 4
```

---

## subscribe

> 위에서 대충 감을 잡았겠지만, Subscribe는 말 그대로 Observable을 구독하여 해당 데이터 스트림으로부터 이벤트를 전달 받는 역할을 해준다.

![](https://user-images.githubusercontent.com/67448481/227993886-a6167edc-4bdf-4de5-b02a-c46325179729.png)

위의 그림과 같이, 데이터 스트림(Observable)에 대한 구독을 하는 것이다.
그리고 해당 데이터 스트림으로부터 방출되는 데이터 또는 이벤트들을 받아서 활용할 수 있게 된다.

![](https://user-images.githubusercontent.com/67448481/227993895-d7e1a510-cba0-4d2e-bb3b-d6b4ecc6f627.png)

즉, Observer라는 관찰자를 데이터 스트림에 보내 방출되는 데이터 및 이벤트들을 전달 받을 수 있도록 하고, 이를 핸들링 하여 우리가 원하는 대로 코드 로직을 작성할 수 있도록 돕는 것이 바로 Subscribe라고 할 수 있다.

우리가 신문 또는 유튜브 채널을 구독했을 때, 우리는 해당 신문사 또는 채널로부터 이벤트나 알림, 새로운 컨텐츠 등에 대해서 알림을 받는 것처럼 말이다.

> subscribe에 대한 템플릿 코드는 아래와 같다.

```swift
observable.subscribe(
    onNext: { value in
        // Observable이 값을 방출할 때마다 호출된다.
        // 해당 값(데이터)을 활용하는 코드 로직을 여기에 작성하면 된다.
    },
    onError: { error in
        // Observable에서 에러가 발생하면 호출된다.
        // 에러 처리 코드를 작성할 수 있다.
    },
    onCompleted: {
        // Observable이 더 이상 값을 방출하지 않으면 호출된다.
    }
)
```

---

## Subject

> 이 또한 굉장히 중요한 핵심 개념 중 하나다.
> Subject는 Observable과 Observer 두 가지 역할 모두를 수행할 수 있는 객체이기 때문이다.

어떻게 보면, 위에서 설명했던 Observable과 Subscribe는 일방향적인 역할만을 담당했다고 볼 수 있다.
Observable은 자신을 구독하고 있는 Observer들에게 데이터 및 이벤트를 방출해주고, Subscribe는 방출된 데이터 및 이벤트를 받아오기만 할 뿐이기 때문이다.

하지만 Subject는 다르다. 이는 Observable과 Observer 두 가지의 역할 모두를 수행할 수 있기 때문이다.

![](https://user-images.githubusercontent.com/67448481/227993901-463e5b70-3763-46f1-8ce3-26d55f13b6c4.png)

위의 그림 예시와 같이, 데이터 또는 이벤트를 생성 또는 전달 받은 뒤 -> 직접 자신을 구독하고 있는 Observer들에게 이를 전달할 수 있다.

### Subject의 종류

#### PublishSubject

> 새로운 값이 생성될 때마다, 이를 모든 구독자들에게 전달한다.

![](https://user-images.githubusercontent.com/67448481/227993908-b528b976-f889-499b-9016-83e32af119e3.png)

하지만 주의할 점은, 위의 사진과 같이 구독한 시점 이후에 발생 및 생성된 데이터들만 전달된다는 점이다.
따라서 오른쪽 초록머리 Observer는 구독 시작점 이전의 데이터인 노랑파랑 데이터를 전달 받지 못한다.

#### BehaviorSubject

> 위의 PublishSubject와 반대로, 구독 시점에서 가장 최신 데이터 및 이벤트를 기본값으로 반환 받을 수 있다.

![](https://user-images.githubusercontent.com/67448481/227993914-12f39471-43c1-45a2-a20e-ccfb970767b6.png)

즉, 이제 초록머리 Observer도 자신이 구독하기 이전 시점에 생성되어 방출된 데이터 및 이벤트도 초기값으로 전달 받아 시작될 수 있다는 것이다.

#### ReplaySubject

> 이름에서 유추할 수 있듯이, 구독시점과 무관하게 이전에 생성 및 방출 되었던 데이터 및 이벤트들을 전부 전달해주는 Subject다.

비디오 대여점을 예로 들어보자. 만약 이전 대여자가 비디오를 30%정도 보고 반납을 했는데, 다음 대여자인 내가 처음부터 비디오를 볼 수 없다고 생각하면 이게 말이나 될까?

이처럼, ReplaySubject는 언제 구독을 했던간에 이전에 발생했던 데이터 및 이벤트들에 대해서도 전달받을 수 있다는 큰 특징을 갖는다.

#### AsyncSubject

> 마지막으로, AsyncSubject는 이벤트 및 데이터가 발생할 때까지 이를 방출하지 않고 있다가, complete가 발생하면 그 때 시점에 해당하는 값을 구독자들에게 전달한다.

좀 더 쉽게 얘기하자면, 발생하는 데이터 및 이벤트들을 계속 최신화 하면서 기다리고 있다가 complete 이벤트가 발생하면 현재까지 쌓여온 데이터들 중 가장 최신의 값을 구독자들에게 전달해준다는 것이다.

---

## Dispose

> 마지막으로, Dispose란 구독을 취소하고, 참조에 대한 해제의 역할을 담당한다.

즉, Dispose를 통해 우리는 Observable로부터 이벤트를 더이상 전달 받지 않을 수 있다. 이것이 필요한 이유는 단연코 메모리 누수를 방지하고 자원을 효율적으로 관리하기 위함이다.

이는 Observable을 대상으로 dispose라는 메서드를 호출하여 실행할 수 있는데, dispose를 호출하면 해당 Observable을 구독하고 있는 Observer들에 대한 모든 참조와 구독이 해제된다.

우리는 DisposeBag이라는 하나의 쓰레기통 객체(?)를 생성하여 해당 객체에 dispose하고자 하는 Observable들을 담아둘 수 있다. 그리고 원하는 시점 또는 해당 ViewController가 사라질 때 DisposeBag에 담겨있는 모든 Observable들에 대한 dispose가 이루어지도록 할 수 있다.

```swift
let disposeBag = DisposeBag()

let observable = Observable.of(1, 2, 3)

observable
    .subscribe(onNext: { element in
        print(element)
    })
    .disposed(by: disposeBag)

```

위의 코드 예시처럼, DisposeBag 객체를 생성하고, 생성된 Observable을 disposeBag에 담아준다. 그리고 ViewController가 사라질 때 disposeBag 또한 해제되면서, 그 안에 담겨있던 observable들이 모두 dispose되는 것이다.

---

## 정리

여기까지, RxSwift의 기본적인 내용과 핵심 개념들에 대해서 다뤄봤다. 물론 매우 기초적인 내용들이라 이 글만 읽고 바로 RxSwift를 프로젝트에 바로 사용하기란 쉽지 않은 것이 당연하다. 하지만, 필자는 모든 것의 사용 또는 활용에는 이해가 전제되어야 한다고 믿기 때문에, 이 글을 읽고 RxSwift 사용을 연습하면 훨씬 더 빠르고 쉽게 배워나갈 수 있을 것이라 생각한다.

많이 부족한 글이고, 필자 또한 아직 RxSwift를 공부하고 있는 입장이기 때문에 갈 길이 멀다. 따라서 다음 포스팅에서는 기회가 된다면 RxSwift의 Operator들과 RxCocoa, 그리고 여타 기능들에 대해서도 다뤄볼까 한다.

배울 것이 끝도 없다...✨

---
