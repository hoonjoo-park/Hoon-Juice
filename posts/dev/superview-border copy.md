---
title: 'StatusBar 색상과 navigationBar의 title 색상 변경하기'
date: '2023.04.01'
category: 'Swift'
excerpt: 'StatusBar의 스타일을 직접 지정 또는 고정하고, navigationBar의 title 색상을 변경하기 위한 방법에 대해 알아보자!'
thumbnail: '/images/statusBar.webp'
---

> 최근 개발했던 "담아" 프로젝트는 라이트모드 다크모드를 지원하지 않는 앱이었다.  
> 이에 따라 StatusBar 및 navigationBar의 색상 또한 직접 고정시켜줘야 했다.

![](https://user-images.githubusercontent.com/67448481/229279500-07564d5c-89b1-4675-b769-0d18faf5bdb1.png)

일단, `backgroundColor`가 white로 고정되어 있었기 때문에, 유저가 다크모드를 사용하고 있더라도 StatusBar의 `tintColor`가 black으로 고정되어 있어야 했다.

뿐만 아니라, navigationBar의 title 색상도 black으로 고정해줘야 했다.

사실 굉장히 직관적이기도 하고, 쉬워 보이는 구현 사항이긴 하지만...
막상 이를 검색 없이 구현하려고 하니 방법이 바로 떠오르지 않았다. 그래서 이참에 블로그에 기록을해보기로 결심했다.

---

## StatusBar 색상 고정하기

> Info.plist에서 두가지 key-value 쌍만 추가해주면 된다.

Information Property List의 우측에 있는 (+)버튼을 클릭하여 아래 두 개의 프로퍼티와 값을 추가해주자.

- view controller-based status bar appearance를 `No`로 지정해준다.
- Status bar style을 `Dark Content`로 설정해준다.

> 끝이다....이렇게만 해주면 앱의 StatusBar 색상이 dark로 고정되게 된다.

![](https://user-images.githubusercontent.com/67448481/229279512-e74877bb-282a-4bf5-bb07-5e5b033f4703.png)

하지만... 만약 특정 ViewController에서만 StatusBar의 색상이 `light`가 되어야 하는 경우가 있다면, 위의 방식은 사용할 수 없다. 위에서 설정한 것은 ViewController에서 StatusBar의 Appearance를 변경 못하도록 막고, Default Style을 Info.plist에서 지정해준 것이기 때문이다.

### 특정 ViewController의 스타일 변경하기

> 일단, 위에서 설정한 view controller-based status bar appearance를 `Yes`로 설정해줘야 한다.

그리고 Status Bar Style을 Dark Content 또는 Light Content 등, 원하는 스타일로 설정해준다.
마지막으로, 원하는 ViewController에 아래의 코드를 추가해주자.

```swift
override var preferredStatusBarStyle: UIStatusBarStyle {
    return .lightContent
}
```

하지만.. 위의 경우가 적용되지 않는 경우가 종종 있을 수도 있는데, 필자의 경우는 navigationController의 하위 ViewController로써 사용되던 MenuVC에서 해당 코드를 적용하고자 했기 때문이다.

이런 경우에는 직접 커스텀 UINavigationController를 생성하여 이 NC를 사용해주면 된다.

```swift
import UIKit

class NavigationViewController: UINavigationController {

    override func viewDidLoad() {
        super.viewDidLoad()
    }


    override var childForStatusBarStyle: UIViewController? {
        return visibleViewController
    }

    override var preferredStatusBarStyle: UIStatusBarStyle {
        return visibleViewController?.preferredStatusBarStyle ?? .default
    }

}
```

위에서 생성한 `NavigationViewController`를 아래와 같이 적용해주면 된다.

```swift
private func presentRealRootViewController() {
    let rootVC = MenuVC()
    // 변경된 코드
    let navVC = NavigationViewController(rootViewController: rootVC)
    // 이전 코드
    // let navVC = UINavigationController(rootViewController: rootVC)

    navVC.modalTransitionStyle = .crossDissolve
    navVC.modalPresentationStyle = .fullScreen
    present(navVC, animated: true)
}
```

이렇게 해주면 의도한 대로, 기본적인 StatusBar의 스타일을 지정해주면서도, 원하는 ViewController에서는 특정 스타일을 지정해줄 수 있다.

---

## navigationBar의 title 색상 고정하기

> 이 부분은 상대적으로 굉장히 간단한다.

ViewWillAppear 블록에 아래 코드를 추가해주자.

```swift
navigationController?.navigationBar.titleTextAttributes = [NSAttributedString.Key.foregroundColor: .black]
```

굉장히 간단하다! 😎
이렇게만 해주면, ViewController에서 navigationBar의 title 색상을 직접 지정해줄 수 있다.

---
