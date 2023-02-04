---
title: 'Next.js에 PrismJS 적용하기'
date: '2023.01.30'
category: 'Web'
excerpt: '이번에 블로그를 제작하며 코드블록에 대한 UI 작업을 해야 했었다. 이에 따라, PrismJS 라이브러리를 사용하여 코드 하이라이팅을 구현하는 방법에 대해 정리해 봤다.'
thumbnail: '/images/prism.webp'
---

> 이번에 블로그를 제작하며 코드블록에 대한 UI 작업을 해야 했었다.  
> 이에 따라, PrismJS 라이브러리를 사용하여 코드블록 제작 및 코드 하이라이팅을 구현했다.

## PrismJS?

[PrismJS](https://prismjs.com/)는 다른 라이브러리들에 비해 가볍고 사용하기 간편한 코드 하이라이팅 라이브러리다.
일단 링크를 타고 들어가 원하는 버전 및 테마, 그리고 언어와 기능을 고르기만 하면 알아서 관련 CSS와 JS파일을 생성해준다.

![](https://user-images.githubusercontent.com/67448481/215538521-c7d29e14-2834-4b35-bb8c-7ad290d64f5e.png)

> 위의 사진과 같이 내 블로그에 코드가 일반 텍스트로 입력되는 것이 아닌, 가지각색의 색으로 스타일링 되도록 구현할 수 있다.

---

## 다운로드 방법

> 우선, [다운로드 링크](https://prismjs.com/download.html#themes=prism-tomorrow&languages=markup+css+clike+javascript)로 들어간다.

![](https://user-images.githubusercontent.com/67448481/215537989-63f28179-951d-43ec-9239-7443edf96589.png)

> 그러면 위와 같은 화면이 가장 먼저 보일텐데, **Minified Version과 원하는 Theme을 선택**해주도록 하자.

![](https://user-images.githubusercontent.com/67448481/215538354-c7e4ea14-16c3-41f2-a984-2307c6400c8e.png)

> 그리고 Languages는 원하는 것들을 선택해주면 된다.  
> 쉽게 말해, 내가 하이라이팅 하고싶은 (사용할) 언어들이다.

![](https://user-images.githubusercontent.com/67448481/215538940-ee9b50e7-f2a3-4cea-888b-aff99d4dce2b.png)

> 그리고 마지막으로 원하는 플러그인들을 선택하면 된다.  
> 각 플러그인별 설명은 링크를 타고 들어가면 확인할 수 있다.

그리고 마지막으로, 페이지 최하단에서 JS파일과 CSS를 각각 다운로드 받아주면 된다.

---

## NextJS 프로젝트에 적용하기

> 위에서 CSS 파일과 JS파일을 받았으니, 이제 프로젝트에 적용만 해주면 된다.

아, 참고로 기본 테마에 만족하지 못하겠다면, [이 링크](https://github.com/PrismJS/prism-themes)를 타고 들어가 더 많은 테마를 확인할 수도 있다.
각 테마의 css 코드를 복사한 다음에 -> 내가 아까 받은 CSS 파일과 대조하여 변경만 해주면 된다.
_(보통 0번 라인 ~ .token관련된 라인을 치환해주면 된다.)_

### CSS 파일 import 하기

> Nextjs 프로젝트의 `_app.tsx` 파일에 조금 전에 받은 `prism.css` 파일을 `import` 해주도록 하자.

```jsx
import '../styles/prism.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={'flex flex-col min-h-screen'}>
      <Header />
      <main className={'flex-grow'}>
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  )
}
```

### JS파일을 통해 Highlighting하기

> 마지막이다. 하이라이팅을 원하는 `<code />`가 있는 컴포넌트를 열고 해당 컴포넌트 내에서 prism.js 파일을 사용해주면 된다.

```jsx
import Prism from '../../utils/prism.js'

const SomeComponent = () => {
  useLayoutEffect(() => {
    Prism.highlightAll()
  }, [])

  return <></>
}
```

이렇게만 해주면 블로그 또는 특정 웹페이지의 코드블록이 이쁘게 하이라이팅 된다.

굉장히 간단한 작업이긴 하지만....대부분의 PrismJS 관련 래퍼런스가 Next.js나 React에 초점이 맞춰져 있지 않은 관계로, 혹시라도 헤매고 있을 다른 개발자분들을 위해 글을 정리해 봤다.

이제 슬슬 블로그 제작도 마무리 단계에 접어 들어가니, 포스팅을 열심히 해보도록 해야겠다. 😊

---
