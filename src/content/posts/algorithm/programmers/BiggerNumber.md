---
title: 프로그래머스 - 큰 수 만들기 (Javascript)
date: 2022-01-06 22:59:30
layout: post
author: [Hoonjoo]
thumbnail: 'https://user-images.githubusercontent.com/67448481/157115953-792cd47b-7047-4e15-a0e7-56d86f989997.png'
excerpt: 프로그래머스 알고리즘
draft: false
category: '알고리즘'
---

---

### **문제 설명**

어떤 숫자에서 k개의 수를 제거했을 때 얻을 수 있는 가장 큰 숫자를 구하려 합니다.

예를 들어, 숫자 1924에서 수 두 개를 제거하면 [19, 12, 14, 92, 94, 24] 를 만들 수 있습니다. 이 중 가장 큰 숫자는 94 입니다.

문자열 형식으로 숫자 number와 제거할 수의 개수 k가 solution 함수의 매개변수로 주어집니다. number에서 k 개의 수를 제거했을 때 만들 수 있는 수 중 가장 큰 숫자를 문자열 형태로 return 하도록 solution 함수를 완성하세요.

### 제한 조건

- number는 1자리 이상, 1,000,000자리 이하인 숫자입니다.
- k는 1 이상 `number의 자릿수` 미만인 자연수입니다.
  ⇒`1 < k < number.length`

### 입출력 예

| number       | k   | return   |
| ------------ | --- | -------- |
| "1924"       | 2   | "94"     |
| "1231234"    | 3   | "3234"   |
| "4177252841" | 4   | "775841" |

---

### 풀이 과정

> 각 경우의 수들을 모두 배열 형태로 나열해보고 → `Number`로 바꾼 뒤에 가장 큰 수를 찾아서 해당 값의 원본 배열에서의 index값을 찾는다.

1. 배열화 하여 모든 요소들을 숫자로 변환한다.
2. 반복문을 돌린다. `while(answer.length < length){}`
3. 만약 Math.max(...arr)의 값의 index+length > arr.length-1이 아니라면 해당 값이 가장 첫번째 자리수다.
4. 해당 max숫자의 index를 indexOf를 통해 찾는다. (`maxIndex`)
5. 그리고 그 인덱스+1 이전의 배열들은 잘라낸다. (`arr.slice(maxIndex+1)`)
6. 그리고 해당 max값을 answer에 담는다. (`answer.push(max)`)
7. 다시 반복문을 재개한다.

---

### 소스코드 (1차시도)

> **시간초과 4회**

![시간초과](https://user-images.githubusercontent.com/67448481/148393344-6c540261-326b-430c-9359-65577e673064.png)

```jsx
function solution(number, k) {
  let answer = [];
  const endpoint = number.length - k;
  let length = number.length - k;
  let arr = [...number];
  arr = arr.map(el => Number(el));
  let sortedArr = [...number];
  sortedArr = arr.map(el => Number(el));
  sortedArr.sort();
  let minIndex = arr.length - length;
  let i = sortedArr.length - 1;

  while (answer.length < endpoint) {
    let max = sortedArr[i];
    let maxIndex = arr.indexOf(max);
    if (maxIndex < 0) {
      i--;
    } else if (maxIndex <= minIndex) {
      answer.push(max);
      arr = arr.slice(maxIndex + 1);
      length--;
      minIndex = arr.length - length;
      i = sortedArr.length - 1;
    } else {
      i--;
    }
  }
  answer = answer.join('');
  return answer;
}
```

### 소스코드 (2차시도)

```jsx
function solution(number, k) {
  let answer = [];
  let count = 0;
  for (let i = 0; i < number.length; i++) {
    let current = number[i];
    if (answer.length === 0) {
      answer.push(current);
      continue;
    }
    while (answer[answer.length - 1] < current) {
      answer.pop();
      count++;
      if (count === k) {
        return answer.join('') + number.slice(i);
      }
      if (answer.length === 0) {
        break;
      }
    }
    answer.push(current);
  }
  return answer.join('').slice(0, number.length - k);
}

solution('4177252841', 4);
```

---
