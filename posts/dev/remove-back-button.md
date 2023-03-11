---
title: 'Swift에서 Navigation BackButton 제거하기'
date: '2023.03.05'
category: 'Swift'
excerpt: 'navigation에 디폴트로 박혀있는 Back Button을 어떻게 제거할 수 있을까?'
thumbnail: '/images/back-button.webp'
---

> ChatGPT, Reddit, StackOverflow 등을 찾아보면, 각기 다 다른 답변들을 내놓아 항상 헷갈렸던 부분이다.

이제는 확실히 정리하고 넘어가보고자 한다.
navigation에 디폴트로 박혀있는 Back Button을 어떻게 제거할 수 있을까?

---

## hidesBackButton

![](https://user-images.githubusercontent.com/67448481/224503488-04e64cb1-09ff-4696-8473-c99d596d0bed.png)

> 결국 정답은 [공식문서](https://developer.apple.com/documentation/uikit/uinavigationitem/1624947-hidesbackbutton)에 친절히 설명되어 있었다.

항상 귀찮아서 블로그나 stackOverflow 답변부터 찾아보려는 경향이 최근 생긴 것 같다.
iOS에 대해서 가장 잘 아는, 그리고 만든 사람들이 작성해놓은 글을 정독하는 습관을 들여야 할 것 같다 ㅜ

아무튼, `hidesBackButton` 프로퍼티를 통해 `navigation`의 BackButton을 제거할 수 있다.

예시 코드는 이하와 같다.

```swift
override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        navigationItem.hidesBackButton = true
}
```

---

## setHidesBackButton

> 만약 버튼이 사라지는 효과를 주고싶다면, `setHidesBackButton` 메소드의 사용도 가능하다.

깊고 자세한 내용은 [공식 문서](https://developer.apple.com/documentation/uikit/uinavigationitem/1624934-sethidesbackbutton)를 확인하면 된다.
일단 바로 코드 예시를 작성해보도록 하겠다.

```swift
func setHidesBackButton( _ hidesBackButton: [`Bool`],  animated: [`Bool`])
```

기본 메소드의 정의 코드는 위와 같고, 필자는 프로젝트에서 아래와 같이 위의 메소드를 활용했다.

```swift
override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        navigationItem.setHidesBackButton(true, animated: true)
}
```

---

## 커스텀 UIBarButton 우측에 추가하기 (보너스)

> 이쯤에서 글을 마무리 하려고 했는데...  
> 갑자기 우측 상단에 X버튼은 어떻게 커스텀해서 만들 수 있을까? 라는 의문이 들었다.

대충 "이런 형태의 일반적인 닫기 버튼을 어떻게 추가할 수 있을까?"가 궁금해졌던 것이다.

![](https://user-images.githubusercontent.com/67448481/224503661-fe79fba6-cf2c-406a-b01b-54dc735b96b6.png)

### setRightBarButton 활용하기

> `setRightBarButton`이라는 메소드를 사용하면 쉽게 구현할 수 있다.

해당 메소드에 대한 자세한 내용은, 역시 [공식 문서](https://developer.apple.com/documentation/uikit/uinavigationitem/1624954-setleftbarbutton)를 참고하길 바란다.

필자는 UIBarButton을 아래와 같이 직접 만들어서 추가해줬다.
코드 예시는 이하와 같다.

```swift
private func configureNavigation() {
        let closeButton = UIBarButtonItem(image: UIImage(systemName: "xmark"),
																		style: .plain, target: self,
																		action: #selector(dismissViewController))

        closeButton.tintColor = DamaColors.black
        navigationItem.setHidesBackButton(true, animated: true)
        navigationItem.setRightBarButton(closeButton, animated: true)
}
```

그리고 위의 함수를를 `viewWillAppear` 블록에 추가하니 닫기 버튼을 손쉽게 구현할 수 있었다.

![](https://user-images.githubusercontent.com/67448481/224503484-83b143e8-fc9b-4b1e-874e-1794d826a97d.png)

> (생각보다는) 참 쉽죠?

---
