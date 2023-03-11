---
title: 'SuperView의 Border가 SubView를 가리는 현상을 해결해 보자'
date: '2023.03.07'
category: 'Swift'
excerpt: '부모 뷰의 border가 자식 뷰 위로 덮여지는 문제는 왜 발생하고, 어떻게 해결할 수 있을까?'
thumbnail: '/images/border.webp'
---

> 버튼에 카운트 뱃지를 표시하는 기능을 구현하던 도중, 이상한 문제를 발견해버렸다...

![](https://user-images.githubusercontent.com/67448481/224503927-cf33125f-340b-437c-a47f-a97778ba4a37.png)

위의 사진과 같이, superView에 그려진 border가 subView에 계속 떠있는 것이 문제였다.

열심히 `layer.zPosition`, `superView.bringSubviewToFront(subView)`를 활용해봤는데도 문제는 해결되지 않았다...

결국... 또 공식문서에서 해당 문제점의 원인을 찾을 수 있었다.
[borderWidth에 대한 공식문서](https://developer.apple.com/documentation/quartzcore/calayer/1410917-borderwidth)에는 아래와 같이, 이 문제의 실마리를 제공하고 있다.

> _It is composited above the receiver’s contents and sublayers…_

즉, `borderWidth`를 통해 `border`를 그리면, 이 `border`는 Sublayer 및 Receiver(border를 그리고자 하는 엘리먼트) 위에 구성된다는 것이다.

![](https://user-images.githubusercontent.com/67448481/224503924-c22bac19-2347-41ce-807a-247672b7db6d.png)

이는 곧, `borderWidth`를 사용해서 `border`를 그리면 해당 view의 subView들은 그 border 위로 덮일 수 없다는 뜻이 된다...

> 돌파구를 찾아야 한다...!!!

---

## 해결 방법: border만을 위한 subView 만들기

> 조금 직관적이지 못한 해결 방법일 수도 있지만....  
> 아무리 머리를 굴려도 이 방법밖에 떠오르지 않았다 ㅜ

방법은 간단하다.

`border`를 그려주기 위한 subView를 하나 더 만들어서, 해당 View는 border를 그리기 위한 용도로만 사용해준다.

그리고 또 다른 badge subView를 통해 원하던 대로 badge를 그려주면 된다.

```swift
// borderView 인스턴스를 하나 생성해준다.
let borderView = UIView()

// 현재 뷰에 가득 채워지도록 설정한다.
borderView.frame = bounds
borderView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
// border를 설정해준다.
borderView.layer.cornerRadius = 12
borderView.layer.borderWidth = 1
borderView.layer.borderColor = DamaColors.orange.cgColor
```

> 이렇게 구현해주니까, 아래와 같이 더이상 subView가 border에 가려지지 않았다.

![](https://user-images.githubusercontent.com/67448481/224504024-1dfb5845-7ba5-4c0e-a6fe-b39002f95a95.png)

> 하지만 여기서 끝이 아니다...  
> 이런 방식으로 구현하면, UIButton인 superView의 액션을 일으키기 위한 유저의 액션을 borderView가 방해하기 때문이다.

쉽게 얘기하자면, subView에 가려져서 superView의 `touchUpInside`에 대한 action이 발생하지 않는다는 것이다.

이러한 이유로 필자는 아래와 같은 프로퍼티 설정 코드를 추가하며 해당 문제를 해결했다.

```swift
borderView.isUserInteractionEnabled = false
```

> 이제 borderView가 superView의 터치를 가리지 않는다!

애를 먹었던 문제가 드디어 모두 해결됐다...

사실 이번 주제의 경우, CSS에서는 `position: absolute` 또는 `z-index`로 쉽게 처리할 수 있는 부분인데... 가끔 iOS 개발을 하다보면 쉬워보이는 것이 어려울 때가 종종 이렇게 있는 것 같다.

더 열심히 개발하고, 공부하고, 복기해야겠다 🥲

---
