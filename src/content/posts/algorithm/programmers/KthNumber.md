---
title: 프로그래머스 - K번째 수 (Javascript)
date: 2022-01-06 23:07:30
layout: post
author: [Hoonjoo]
thumbnail: 'https://user-images.githubusercontent.com/67448481/157115953-792cd47b-7047-4e15-a0e7-56d86f989997.png'
excerpt: 프로그래머스 알고리즘
draft: false
category: '알고리즘'
---

---

### **문제 설명**

배열 array의 i번째 숫자부터 j번째 숫자까지 자르고 정렬했을 때, k번째에 있는 수를 구하려 합니다.

예를 들어 array가 [1, 5, 2, 6, 3, 7, 4], i = 2, j = 5, k = 3이라면

1. array의 2번째부터 5번째까지 자르면 [5, 2, 6, 3]입니다.
2. 1에서 나온 배열을 정렬하면 [2, 3, 5, 6]입니다.
3. 2에서 나온 배열의 3번째 숫자는 5입니다.

배열 array, [i, j, k]를 원소로 가진 2차원 배열 commands가 매개변수로 주어질 때, commands의 모든 원소에 대해 앞서 설명한 연산을 적용했을 때 나온 결과를 배열에 담아 return 하도록 solution 함수를 작성해주세요.

### 제한사항

- array의 길이는 1 이상 100 이하입니다.
- array의 각 원소는 1 이상 100 이하입니다.
- commands의 길이는 1 이상 50 이하입니다.
- commands의 각 원소는 길이가 3입니다.

### 입출력 예

| number                | k                                 | return    |
| --------------------- | --------------------------------- | --------- |
| [1, 5, 2, 6, 3, 7, 4] | [[2, 5, 3], [4, 4, 1], [1, 7, 3]] | [5, 6, 3] |

### 입출력 예 설명

[1, 5, 2, 6, 3, 7, 4]를 2번째부터 5번째까지 자른 후 정렬합니다. [2, 3, 5, 6]의 세 번째 숫자는 5입니다.[1, 5, 2, 6, 3, 7, 4]를 4번째부터 4번째까지 자른 후 정렬합니다. [6]의 첫 번째 숫자는 6입니다.[1, 5, 2, 6, 3, 7, 4]를 1번째부터 7번째까지 자릅니다. [1, 2, 3, 4, 5, 6, 7]의 세 번째 숫자는 3입니다.

---

### 풀이 과정

> 시간복잡도 때문에 최대한 반복문 안에 sort나 slice 등의 O(N) 메소드를 사용하지 않아보려고 했는데...  
> 도저히 떠오르지 않아서 일단 그냥 풀어봤다.

1. 원본 배열 array는 손상되어서는 안된다. (`tempArray` 만들어줌)
2. `commands`의 길이만큼 `array`에서 배열을 잘라내어 정렬하고 (`slice`), n번째 숫자를 알아내야 한다.
3. 잘라내야 하는 횟수는 `commands.length`와 같다 따라서 for문도 `commands.length`를 기준으로 돌리면 된다.
4. `slice`를 통해 잘라내고, 바로 오름차순으로 정렬한다. 그리고 해당하는 값을 `anwer`에 `push`해준다.
5. `commands.length`는 최대 50까지다.

---

### 소스 코드

```jsx
function solution(array, commands) {
  let answer = [];
  let tempArray = [];
  for (let i = 0; i < commands.length; i++) {
    tempArray = array.slice(commands[i][0] - 1, commands[i][1]);
    tempArray.sort((a, b) => a - b);
    answer.push(tempArray[commands[i][2] - 1]);
  }
  return answer;
}
```

---
