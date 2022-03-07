---
title: 프로그래머스 - 조이스틱 (Javascript)
date: 2022-01-05 03:16:30
layout: post
author: [Hoonjoo]
thumbnail: 'https://user-images.githubusercontent.com/67448481/157115953-792cd47b-7047-4e15-a0e7-56d86f989997.png'
excerpt: 프로그래머스 알고리즘
draft: false
tags: ['']
---

---

### **문제 설명**

조이스틱으로 알파벳 이름을 완성하세요. 맨 처음엔 A로만 이루어져 있습니다.ex) 완성해야 하는 이름이 세 글자면 AAA, 네 글자면 AAAA

**조이스틱을 각 방향으로 움직이면 아래와 같습니다.**

> 🔼 - 다음 알파벳  
> 🔽 - 이전 알파벳 (A에서 아래쪽으로 이동하면 Z로)  
> ◀ - 커서를 왼쪽으로 이동 (첫 번째 위치에서 왼쪽으로 이동하면 마지막 문자에 커서)  
> ▶ - 커서를 오른쪽으로 이동

**예를 들어 아래의 방법으로 "JAZ"를 만들 수 있습니다.**

> 첫 번째 위치에서 조이스틱을 위로 9번 조작하여 J를 완성합니다.

- 조이스틱을 왼쪽으로 1번 조작하여 커서를 마지막 문자 위치로 이동시킵니다.
- 마지막 위치에서 조이스틱을 아래로 1번 조작하여 Z를 완성합니다.  
  따라서 11번 이동시켜 "JAZ"를 만들 수 있고, 이때가 최소 이동입니다.
  >

만들고자 하는 이름 name이 매개변수로 주어질 때, 이름에 대해 조이스틱 조작 횟수의 최솟값을 return 하도록 solution 함수를 만드세요.

---

### 제한 사항

- name은 알파벳 대문자로만 이루어져 있습니다.
- name의 길이는 1 이상 20 이하입니다.

---

### 입출력 예

| Name     | Return |
| -------- | ------ |
| "JEROEN" | 56     |
| "JAN"    | 23     |

---

### 풀이 과정

> 예전에 백준에서 비슷한 문제를 풀어본적 있던 것 같다.  
> 아래의 아스키 코드를 활용하면 될 것 같고, 거리계산을 효율적으로 하면 풀 수 있을 것 같다.

> 😅 **...는 나의 헛된 망상이자 꿈이었다....ㅋㅋ** 😅

- **아스키코드 Cheat Sheet**  
  **a~z** :  97~122  
  **A~Z** : 65~90  
  **0~9** : 48~57

1. 우선 String을 배열로 `split`한다
2. 그리고 각 배열의 요소들을 `charCodeAt`을 통해 아스키 코드로 변환한다
3. **어떻게 위로 올리는게 효율적인지, 아래로 내리는게 효율적인지 판단할까?**

   ⇒ `Math.min(Math.abs(bottom - num), Math.abs(top - num))`

   바닥값과 천장값 사이의 거리 중에 가장 가까운 것을 선택하면 된다.

4. 좌우 커서 이동의 경우의 수

   ⇒ **총 4개의 케이스를 고려한다.**

   **Case1** : 우측으로만 이동할 때

   **Case2** : 좌측으로만 이동할 때

   **Case3** : 우측으로 시작했는데 도중에 좌측으로 꺾을 때

   **Case4** : 좌측으로 시작했는데 도중에 우측으로 꺾을 때

5. 저 네 개의 Case 중에 가장 최솟값을 answer에 더해주면 된다.

---

### 소스코드

```jsx
function solution(name) {
  let answer = 0;
  let arr = name.split('');
  arr = arr.map(el => el.charCodeAt(0));
  let indexes = [];
  // 상하 이동값부터 계산
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 65) {
      answer += Math.min(Math.abs(65 - arr[i]), Math.abs(91 - arr[i]));
      // A가 아닌 값들의 index를 관리하기 위한 indexes 배열을 만들어 활용했음
      indexes.push(i);
    }
  }
  // 처음 값이 A가 아닐 경우에는 어차피 커서 좌우 이동에 영향을 주지 않기 때문에 그냥 indexes에서 빼줘도 된다.
  if (arr[0] !== 65) {
    indexes.shift();
  }
  // 만약에 길이가 하나면, 굳이 아래의 모든 케이스를 돌려볼 필요가 없다.
  // 따라서 우측으로 이동하는게 더 나은지, 좌측으로 이동하는게 더 나은지만 판단하면 된다.
  if (indexes.length === 1) {
    let left = Math.abs(arr.length - indexes[indexes.length - 1]);
    let right = indexes[0];
    answer += Math.min(left, right);
    console.log(left, right);
    return answer;
  }

  // 이제 좌우값 체크
  // #Case1 : 우측으로만 갈 때
  let case1 = arr.length - 1;

  // #Case2 : 좌측으로만 갈 때
  let case2 = Math.abs(arr.length - indexes[0]);

  // #Case3 : 우측으로 시작했는데 한 번 꺾을 때
  let case3 = 0;
  // 만약에 첫 값이 A가 아니라면 그 값을 건너 뛰어서 시작해야된다.
  let i = arr[0] !== 65 ? 1 : 0;
  // 단지
  let case3BCount = 0;
  while (true) {
    if (case3BCount !== 0 && arr[i + 1] === 65) {
      break;
    } else if (case3BCount === indexes.length - 1) {
      break;
    }
    if (arr[i + 1] !== 65) {
      case3BCount++;
      i++;
    } else {
      i++;
    }
  }
  // 한번 갔다가 같은만큼 돌아오기 때문에 2를 곱해준다.
  case3 = i * 2 + arr.length - indexes[case3BCount];

  // #Case4 : 좌측으로 시작했는데 한 번 꺾을 때
  let case4 = 0;
  let j = arr[arr.length - 1] !== 65 ? arr.length : arr.length - 1;
  let case4BCount = 0;
  while (true) {
    if (case4BCount !== 0 && arr[j - 1] === 65) {
      break;
    } else if (case4BCount === indexes.length - 1) {
      break;
    }
    if (arr[j - 1] !== 65) {
      case4BCount++;
      j--;
    } else {
      j--;
    }
  }
  case4 = (arr.length - j) * 2 + indexes[indexes.length - case4BCount - 1];

  return answer + Math.min(case1, case2, case3, case4);
}
```

---
