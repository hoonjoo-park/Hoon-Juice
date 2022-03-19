---
title: 프로그래머스 - 모의고사 (Javascript)
date: 2022-01-07 02:43:30
layout: post
author: [Hoonjoo]
thumbnail: 'https://user-images.githubusercontent.com/67448481/157115953-792cd47b-7047-4e15-a0e7-56d86f989997.png'
excerpt: 프로그래머스 알고리즘
draft: false
category: '알고리즘'
---

---

### **문제 설명**

수포자는 수학을 포기한 사람의 준말입니다. 수포자 삼인방은 모의고사에 수학 문제를 전부 찍으려 합니다. 수포자는 1번 문제부터 마지막 문제까지 다음과 같이 찍습니다.

1번 수포자가 찍는 방식: 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, ...2번 수포자가 찍는 방식: 2, 1, 2, 3, 2, 4, 2, 5, 2, 1, 2, 3, 2, 4, 2, 5, ...3번 수포자가 찍는 방식: 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, ...

1번 문제부터 마지막 문제까지의 정답이 순서대로 들은 배열 answers가 주어졌을 때, 가장 많은 문제를 맞힌 사람이 누구인지 배열에 담아 return 하도록 solution 함수를 작성해주세요.

### 제한 조건

- 시험은 최대 10,000 문제로 구성되어있습니다.
- 문제의 정답은 1, 2, 3, 4, 5중 하나입니다.
- 가장 높은 점수를 받은 사람이 여럿일 경우, return하는 값을 오름차순 정렬해주세요.

### 입출력 예

| answers     | return  |
| ----------- | ------- |
| [1,2,3,4,5] | [1]     |
| [1,3,2,4,2] | [1,2,3] |

### 입출력 예 설명

**입출력 예 #1**

- 수포자 1은 모든 문제를 맞혔습니다.
- 수포자 2는 모든 문제를 틀렸습니다.
- 수포자 3은 모든 문제를 틀렸습니다.

따라서 가장 문제를 많이 맞힌 사람은 수포자 1입니다.

**입출력 예 #2**

- 모든 사람이 2문제씩을 맞췄습니다.

---

### 풀이 과정

> 반복문을 돌려서 각 학생들이 가진 정답패턴으로 몇 개의 정답을 맞힐 수 있는지 계산하면 된다

1.  `answers`는 1~마지막 문제 까지의 정답이 담긴 배열이다.
2.  우선 각 학생들의 찍기 패턴을 선언한다.
3.  answers의 길이가 학생의 찍기패턴 한 단위보다 길 수 있다. 따라서 이 경우도 생각해줘야 한다.
4.  `object` 하나를 만들어서 각 학생별 정답 수를 카운팅한다.
5.  각각 반복문을 돌린 뒤 (`i`는 answers의 포인터로, `j`는 학생의 찍기패턴 포인터로) 정답이 맞을 때마다 `object[1~3]++`를 해준다.
6.  `object`의 `values`들을 체크하여 비어있으면 `[1,2,3]`을, 비어있지 않다면 `Math.max`를 통해 최대값을 산출한다
7.  최종적으로 해당 max와 일치하는 value값을 갖는 object를 찾아주고 `answer` 배열에 `push`해준다.

---

### 소스코드

```jsx
function solution(answers) {
  let answer = [];
  const student1 = [1, 2, 3, 4, 5];
  const student2 = [2, 1, 2, 3, 2, 4, 2, 5];
  const student3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
  let obj = {};
  for (let i = 0, j = 0; i < answers.length; i++) {
    if (j === student1.length) {
      j = 0;
    }
    if (answers[i] === student1[j]) {
      if (!obj[1]) {
        obj[1] = 1;
      } else {
        obj[1]++;
      }
    }
    j++;
  }
  for (let i = 0, j = 0; i < answers.length; i++) {
    if (j === student2.length) {
      j = 0;
    }
    if (answers[i] === student2[j]) {
      if (!obj[2]) {
        obj[2] = 1;
      } else {
        obj[2]++;
      }
    }
    j++;
  }
  for (let i = 0, j = 0; i < answers.length; i++) {
    if (j === student3.length) {
      j = 0;
    }
    if (answers[i] === student3[j]) {
      if (!obj[3]) {
        obj[3] = 1;
      } else {
        obj[3]++;
      }
    }
    j++;
  }

  // 오브젝트에 담아줬기 때문에 각 값들을 다시 풀어준다.
  let values = Object.values(obj);
  // 만약 values가 비어있다면 아무도 한 문제도 못 맞힌 것이다.
  if (values.length === 0) {
    return [1, 2, 3];
  }
  let max = Math.max(...values);
  // 반복문을 통해 object 안에 있는 key들의 value가 max와 일치하는 것들을 answer에 push한다
  for (let i = 1; i < 4; i++) {
    if (obj[i] === max) {
      answer.push(i);
    }
  }
  return answer;
}
```

---

### 소스코드 (2차 풀이)

> 위의 코드가 너무 지저분해서 한번 리팩토링을 해봤다.

생각해보니 j값을 따로 두고 계속 학생의 정답패턴의 끝에 닿을 때 초기화 시킬 필요 없이

%를 사용하면 쉽게 해결할 수 있는 문제였다.

```jsx
function solution(answers) {
  let answer = [];
  const s1 = [1, 2, 3, 4, 5];
  const s2 = [2, 1, 2, 3, 2, 4, 2, 5];
  const s3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

  const s1Count = answers.filter((a, i) => s1[i % s1.length] === a).length;
  const s2Count = answers.filter((a, i) => s2[i % s2.length] === a).length;
  const s3Count = answers.filter((a, i) => s3[i % s3.length] === a).length;

  const max = Math.max(s1Count, s2Count, s3Count);

  if (s1Count + s2Count + s3Count === 0) return [1, 2, 3];
  s1Count === max && answer.push(1);
  s2Count === max && answer.push(2);
  s3Count === max && answer.push(3);

  return answer;
}
```

---
