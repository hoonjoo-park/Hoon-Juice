---
title: 'iOS 앱 아이콘과 런치 스크린 구현하기 (UIKit)'
date: '2023.03.09'
category: 'Swift'
excerpt: '앱 아이콘과 런치스크린은 내가 만든 어플리케이션의 첫 인상이 될 수 있다. 이 중요한 첫 인상을 어떻게 구현할 수 있을지 알아보자.'
thumbnail: '/images/app-icon.webp'
---

> 내 앱의 "첫인상"이라고 할 수 있는, 앱 아이콘과 런치스크린을 구현하는 방법에 대해 알아보자 💪

포스팅의 목차는 아래와 같다.

1 앱 아이콘 만들기 + 적용하기

2 앱 이름 변경하기

3 LaunchScreen 구현하기 (이제 애니메이션과 Gradient Background를 곁들인...)

---

## 앱 아이콘 만들기

> 먼저 앱 아이콘을 만들고 적용하는 방법부터 알아보도록 하자.

필자는 대부분의 디자인을 figma로 구현하는 편이다. (테크 블로그이므로.... 디자인 과정은 생략하도록 하겠다😅)

따라서, figma에서 아이콘을 디자인 한 뒤 export하여, 로컬에 이미지 파일을 저장해뒀다 가정하고 글을 작성할 것이다.

> 만약 디자인이 귀찮거나 자신이 너무 없다면, 아래 사이트들을 참고하는 것도 대안이 될 수 있다.

- [Flaticon (다양한 svg가 업로드 되어있는 사이트)](https://www.flaticon.com/)
- [Pixabay](https://pixabay.com/ko/vectors/search/?order=ec)
- [SVGRepo](https://www.svgrepo.com/)

### 앱 아이콘 규격에 맞는 이미지 그룹 생성하기

> 그럼, 이제 각설하고 바로 아이콘 적용 방법에 대해 설명해보도록 하겠다.

필자는 [App Icon Generator](https://www.appicon.co/) 라는 사이트를 애용하는 편이다. 이 사이트는, 로컬 이미지를 업로드 하면 Xcode에 등록 가능한 다양한 규격의 App Icon 사이즈들로 이미지를 변환해주는 굉장히 편리한 사이트다.

![](https://user-images.githubusercontent.com/67448481/224503928-eaa901d5-5d66-4903-a019-91e1c9db76fa.png)

👆 이미지를 드래그앤드랍 하면 위와 같이 Generate 버튼이 활성화 된다.

![](https://user-images.githubusercontent.com/67448481/224503929-fec6d1ba-e29e-4d5c-ae0b-f946f6496d91.png)

그리고 생성된 zip 파일을 다운 받고 압축을 풀면, 사이즈별 이미지가 생성된 것을 확인할 수 있다.

![](https://user-images.githubusercontent.com/67448481/224503930-a5d4185a-8d52-4bd8-b150-9f0a54a26833.png)

그리고 마지막으로 Xcode 프로젝트 파일의 Assets에 들어가, AppIcon에 방금 생성한 이미지를 드래그앤드랍 해주면 끝이다.

![](https://user-images.githubusercontent.com/67448481/224503931-4ce8bbb7-a5c9-4937-8c5f-be755188e465.png)

그러면 위와 같이 내가 디자인 한 나의 앱 아이콘이 정상적으로 등록된 것을 확인할 수 있다!

---

## 앱 이름 (Display Name) 변경하기

> 추가적으로, 앱의 이름(Display Name)을 변경하는 방법에 대해서도 잠시 정리하고 넘어가 보자.

![](https://user-images.githubusercontent.com/67448481/224503932-e50d4717-3528-45b6-bf6e-a0185572e0a1.png)

"프로젝트 root 파일을 선택(가장 상단의 파일) -> TARGETS -> General -> Identity -> Display Name 수정"

위의 절차대로 타고 들어가 Display Name을 변경해주기만 하면 끝이다 🦁

![](https://user-images.githubusercontent.com/67448481/224503933-616014c3-e393-4389-ba45-68cb4cc1017c.png)

> 참... 쉽...죠?

---

## LaunchScreen

> 마지막으로, LaunchScreen을 구현 및 적용하는 방법에 대해 정리하고 포스팅을 마무리 짓겠다.
> LaunchScreen이란 말 그대로 "앱이 켜질 때 뜨는 스크린"이다.

정적 스크린이라 단술할 것 같지만... [공식 문서](https://developer.apple.com/documentation/xcode/specifying-your-apps-launch-screen)에 따르면, 이 LaunchScreen을 구현하는 데 몇 가지 주의사항이 따른다고 한다.

### ⚠️ 주의 사항

1. UIKit 클래스들만 사용 가능하다 (StoryBoard)
2. 단일 root View(UIView 또는 UIViewController 객체)만을 사용해야 한다.
3. `Action`이나 `Outlet` 사용 불가능
4. deprecated된 View 사용 불가능 ex) UIWebView
5. 커스텀 클래스 사용 불가능
6. 런타임 속성(attributes) 사용 불가능

### 스크린 구현하기

> 필자는 아래와 같은 LaunchScreen 디자인을 StoryBoard로 구현해보려 한다.

![](https://user-images.githubusercontent.com/67448481/224503934-b4216b1c-0baf-4e7a-9e41-ee7268bcd6ac.png)

> 우선 첫 번째로, Assets에 로고 이미지를 넣는다. (드래그앤드랍)

그리고 StoryBoard에서 `Command + Shift +  L` 단축키를 누른 뒤 -> ImageView를 스토리보드 View에 추가해준다. -> 그리고 ImageView를 선택 후 -> Image를 지정해준다.

![](https://user-images.githubusercontent.com/67448481/224503935-6bafed5d-4904-489f-a94c-d7889eb1cf86.png)

![](https://user-images.githubusercontent.com/67448481/224503936-b4df4f42-829f-4c48-aade-de1a3b4f3ad9.png)

> 여기까지 했으면 절반은 성공이다!  
> 이제 백그라운드 이미지를 View에 추가해주면 된다.

ViewController의 View를 선택 후 -> 우측 Inspector에서 Background를 설정해주면 끝이다.

![](https://user-images.githubusercontent.com/67448481/224503937-7c63f89f-e19f-4cfd-b0b7-4c065694718e.png)

위의 사진처럼 View를 선택하고-> Inspector의 Background 변경!

![](https://user-images.githubusercontent.com/67448481/224503938-cc6491a5-6c89-487e-ae3e-5b2c02109070.png)

> 근데.... 필자는 여기서 그치지 않고,
> 로고 이미지에 대한 애니메이션과, 백그라운드 Gradient 효과를 적용해볼 것이다.

### Background Gradient 적용하기

> 우선, 애석하게도, LaunchScreen에는 커스텀 클래스 사용이 불가능하다.

즉, GradientLayer 같은 **subLayer를 통해 Linear Gradient를 구현하는 등의 방식은 사용하지 못한다**는 것이다.

따라서, 우리는 어쩔 수 없이 **Gradient Image를 사용해 이를 Background에 가득 채워**주는 수밖에 없다 🥺

![](https://user-images.githubusercontent.com/67448481/224504542-15b8e3ae-2f8c-4812-b597-2728c1ce414e.png)

> 위 사진과 같이 일단 이미지를 추가해준다.

그리고 이 부분이 중요한데, **View의 SafeArea 관련 레이아웃 설정을 모두 해제한 뒤 해당 이미지를 View에 가득 채워야 한다.**

SafeArea 관련 레이아웃 설정을 해제하려면 View를 선택하고 -> Size Inspector에서 아래 사진에 보이는 두 항목의 체크를 해제해주면 된다.

![](https://user-images.githubusercontent.com/67448481/224504546-1b302f8a-987c-4bb4-a5d8-b7adb8a35754.png)

그리고 바로 아래와 같이 ImageView의 ContentMode를 `Aspect Fill`로 변경해주고, 이미지를 View에 가득 채워준다.

![](https://user-images.githubusercontent.com/67448481/224504547-51849a97-763b-4a69-90e5-ce4f75612d81.png)

![](https://user-images.githubusercontent.com/67448481/224504549-91c5a20e-bd81-43f0-a3d5-2c8f2808c77f.png)

> 위의 사진처럼, `Constrain to margins`를 체크 해제 후 -> 각 변에 대한 `constraints`를 0으로 입력 -> Add Constraints 버튼을 클릭하면 된다

![](https://user-images.githubusercontent.com/67448481/224504550-58d5be3d-5acd-4acd-8b52-115342ef873d.png)

> 그리고 최종적으로 위와 같이, UILabel과 로고 이미지를 기호에 따라 배치 및 스타일링 해주면 끝이다 😁

만약, 이미지를 분명 추가했는데도 시뮬레이터 상에 표시가 되지 않는다면 Shift + Command + K를 눌러 빌드 캐시를 제거한 뒤 다시 시뮬레이터와 앱을 실행해보길 바란다.

---

### 애니메이션 적용하기

> 이번 포스팅의 마지막 주제다.  
> 로고 이미지가 중앙에서 왼쪽으로 이동하며 사라지는 간단한 애니메이션을 구현해볼 것이다

일단. 공식문서 주의사항에 나와있듯, 우리는 LaunchScreen에 우리의 코드를 연결시킬 수 없다... 커스텀 클래스 또한 사용이 불가능하다 ㅜ

따라서, 이번에는 작은 눈속임을 주며 이 UI를 구현해야 한다.

> 메인 로직은 이하와 같다.

- 정적인 `LaunchScreen`을 그대로 띄워준다.
- 그리고 `LaunchScreen`과 똑같은 레이아웃 및 디자인의 `ViewController`를 첫 화면으로 설정한다.
- 해당 **ViewController에서 애니메이션을 실행** 후 -> **진짜 rootViewController를 열어준다.**

이렇게 눈속임을 통해, 우리는 마치 LaunchScreen에서 애니메이션이 동작하는 것처럼 UI를 구현할 수 있는 것이다.

#### 코드

> 코드를 통해 ViewController를 활용한 LaunchScreen 애니메이션 눈속임 과정을 설명해 보도록 하겠다.

가장 먼저, LaunchScreen에 구현한 UI들을 `FakeLaunchScreen`이라는 ViewController에 똑같이 구현한다.
_레이아웃 코드는 그냥 constraints값만 코드로 옮기는 것이므로, 관련 설명은 생략..._

`FakeLaunchScreenVC`의 마크업을 완료했다면, 이제 이 VC가 LaunchScreen이 닫힌 뒤 렌더링 되게 하면 된다.

##### SceneDelegate에서 rootVC 설정

> LaunchScreen이 닫히고 가장 먼저 열릴 ViewController를 의미하는 rootViewController를 설정해준다.

당연히 우리가 위에서 만든 FakeLaunchScreenVC를 rootVC로 설정해주면 된다.

```swift
// SceneDelegate.swift
func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
    guard let windowScene = (scene as? UIWindowScene) else { return }
    window = UIWindow(frame: windowScene.coordinateSpace.bounds)
    window?.windowScene = windowScene

    let rootVC = FakeLaunchScreenVC()

    window?.rootViewController = rootVC
    window?.makeKeyAndVisible()
}
```

##### 애니메이션 코드 작성 및 적용하기

> 그리고 아래와 같이 애니메이션을 입혀준다.

```swift
// 애니메이션 구현
private func startAnimation() {
    logoImage.centerXAnchor.constraint(equalTo: view.leadingAnchor, constant: -140).isActive = true

    UIView.animate(withDuration: 0.7, delay: 0.2) {
        self.view.layoutIfNeeded()
    }

    UIView.animate(withDuration: 0.05, delay: 0.3, animations: {
        self.subTitle.layer.opacity = 0
        self.appTitle.layer.opacity = 0
        self.view.backgroundColor = DamaColors.white
    }, completion: { done in
        if done {
            DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
                self.presentRealRootViewController()
            }
        }
    })
}
```

```swift
// 애니메이션 실행 및 적용
override func viewDidLayoutSubviews() {
    super.viewDidLayoutSubviews()

    startAnimation()
}
```

##### 진짜 rootVC 띄워주기

> 마지막으로, `present`를 활용해 애니메이션이 끝난 시점에 `presentRealRootViewController` 함수를 실행시켜주면 된다.

```swift
private func presentRealRootViewController() {
    let rootVC = MenuVC()

    rootVC.modalTransitionStyle = .crossDissolve
    rootVC.modalPresentationStyle = .fullScreen
    present(rootVC, animated: true)
}
```

위의 코드가 애니메이션이 끝난 시점에서 실행되고 -> 그에 따라 나의 진자 rootVC가 화면에 렌더링 된다.

이게 끝이다!
사실 애니메이션이나, Gradient 백그라운드를 다루지 않았다면 조금 더 짧은 포스팅이 됐을텐데...
뭔가 글을 쓰다보니 욕심이 생겨 글이 길어진 것 같기도 하다.

다음 포스팅에서는 Zooming Transition 또는 커스텀 캐러셀 구현하기에 대한 주제를 다뤄볼 예정이다.
배울 것들이 참... 많다 ㅎㅎ

---
