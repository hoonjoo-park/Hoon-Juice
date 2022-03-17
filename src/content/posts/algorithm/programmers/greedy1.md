---
title: 프로그래머스 - 체육복 (Javascript)
date: 2022-01-04 03:21:30
layout: post
author: [Hoonjoo]
thumbnail: 'https://user-images.githubusercontent.com/67448481/157115953-792cd47b-7047-4e15-a0e7-56d86f989997.png'
excerpt: 프로그래머스 알고리즘
draft: false
tags: ['']
---

---

### **문제 설명**

점심시간에 도둑이 들어, 일부 학생이 체육복을 도난당했습니다. 다행히 여벌 체육복이 있는 학생이 이들에게 체육복을 빌려주려 합니다. 학생들의 번호는 체격 순으로 매겨져 있어, 바로 앞번호의 학생이나 바로 뒷번호의 학생에게만 체육복을 빌려줄 수 있습니다. 예를 들어, 4번 학생은 3번 학생이나 5번 학생에게만 체육복을 빌려줄 수 있습니다. 체육복이 없으면 수업을 들을 수 없기 때문에 체육복을 적절히 빌려 최대한 많은 학생이 체육수업을 들어야 합니다.

전체 학생의 수 n, 체육복을 도난당한 학생들의 번호가 담긴 배열 lost, 여벌의 체육복을 가져온 학생들의 번호가 담긴 배열 reserve가 매개변수로 주어질 때, 체육수업을 들을 수 있는 학생의 최댓값을 return 하도록 solution 함수를 작성해주세요.

### 제한사항

- 전체 학생의 수는 2명 이상 30명 이하입니다.
- 체육복을 도난당한 학생의 수는 1명 이상 n명 이하이고 중복되는 번호는 없습니다.
- 여벌의 체육복을 가져온 학생의 수는 1명 이상 n명 이하이고 중복되는 번호는 없습니다.
- 여벌 체육복이 있는 학생만 다른 학생에게 체육복을 빌려줄 수 있습니다.
- 여벌 체육복을 가져온 학생이 체육복을 도난당했을 수 있습니다. 이때 이 학생은 체육복을 하나만 도난당했다고 가정하며, 남은 체육복이 하나이기에 다른 학생에게는 체육복을 빌려줄 수 없습니다.

### 입출력 예

| n   | lost  | reserve |
| --- | ----- | ------- |
| 5   | [2,4] | [1,3,5] |
| 5   | [2,4] | [3]     |
| 3   | [3]   | [1]     |

### 입출력 예 설명

예제 #11번 학생이 2번 학생에게 체육복을 빌려주고, 3번 학생이나 5번 학생이 4번 학생에게 체육복을 빌려주면 학생 5명이 체육수업을 들을 수 있습니다.

예제 #23번 학생이 2번 학생이나 4번 학생에게 체육복을 빌려주면 학생 4명이 체육수업을 들을 수 있습니다.

---

### 풀이 과정

> 체육복의 여분을 가져온 학생은 우선적으로 `reserve`에서 제외되어야 한다!

1. 우선 object에 각 `key`에 대한 카운트를 한다.
2. `for`문을 통해 `reserve`에 `lost`에도 똑같은 값이 있는지 체크하고, 해당 값을 양측에서 모두 제거해준다.

   ⇒ 단, 그냥 `splice`를 해버리면 배열의 `length`가 도중에 줄어들어서 반복문이 배열의 끝에 닿지 못한다.

3. 이번에는 plus, minus 값이 object에 있는지 없는지 체크하고 있다면 해당 값들을 제거한다.
4. 각 조건문마다 `answer++`를 걸어서 최종적으로 `answer`값을 도출해주면 된다.

---

### 소스코드

```jsx
function solution(n, lost, reserve) {
  lost.sort();
  reserve.sort();
  let obj = {};
  lost.forEach(el => !obj[el] && (obj[el] = 1));
  let answer = n - lost.length;
  for (let i = 0; i < reserve.length; i++) {
    if (obj[reserve[i]]) {
      obj[reserve[i]]--;
      answer++;
      reserve.splice(i, 1, 'del');
    }
  }
  for (let i = 0; i < reserve.length; i++) {
    let minus = reserve[i] - 1;
    let plus = reserve[i] + 1;
    if (obj[plus]) {
      obj[plus]--;
      answer++;
    } else if (obj[minus]) {
      obj[minus]--;
      answer++;
    }
  }
  return answer;
}
```

---

### 프로그래머스 고인물의 풀이.... (`filter` 활용)

```jsx
function solution(n, lost, reserve) {
  return (
    n -
    lost.filter(a => {
      const b = reserve.filter(c => Math.abs(c - r) <= 1);
      if (!b) return false;
      reserve = reserve.filter(d => d !== b);
    })
  );
}
```

---
