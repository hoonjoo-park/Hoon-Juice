---
title: 'CGPoint, CGSize, 그리고 CGRect란?'
date: '2023.01.28'
category: 'Swift'
excerpt: 'iOS에서 UI의 레이아웃을 잡을 때 자주 사용되는 CGPoint, CGSize, CGRect가 뭘까...??'
thumbnail: '/images/cg.webp'
---

## CGPoint

우선, [CGPoint 공식 문서](https://developer.apple.com/documentation/corefoundation/cgpoint/)에서는 CGPoint를 아래와 같이 정의하고 있다.

> _"A structure that contains a point in a two-dimensional coordinate system."_

즉, CGPoint란, **"2차원 좌표계에 기반한 xy 좌표 포인트를 구성하는 구조"**라는 것이다.

바로 코드를 통해 CGPoint의 구조를 확인해보자.

```swift
init(x: Double, y: Double)
init(x: Int, y: Int)
```

---

## CGSize

그렇다면 CGSize는??
대충 예상이 가지만 "**높이와 넓이**"를 구성하는 것이지 않을까 조심스레 유추해볼 수 있다.

[CGSize 공식 문서](https://developer.apple.com/documentation/corefoundation/cgsize/)

> A structure that contains width and height values. (굉장히 명료하다)

긴 말 할 것 없이 바로 코드를 통해 구조를 확인해 보자.

```swift
init(width: Double, height: Double)
init(width: Float, height: Float)
```

---

## CGRect

> 그렇다면... 가장 마지막에 설명하는 이 놈은  
> xy 좌표와 높이, 넓이를 모두 포함하는 놈이지 않을까?

맞다. [CGRect 공식 문서](https://developer.apple.com/documentation/corefoundation/cgrect)

> _A structure that contains the location and dimensions of a rectangle._

xy 좌표를 통해 Location(위치)을 표현하고, Dimensions(구조)를 표현할 수 있다.

![](https://user-images.githubusercontent.com/67448481/215250262-27002d43-eca8-430a-9b03-db8064cc4e5b.png)

위에서 origin은 xy좌표를, size는 높이와 넓이를 의미한다.

---
