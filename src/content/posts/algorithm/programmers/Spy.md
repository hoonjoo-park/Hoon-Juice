---
title: 프로그래머스 - 위장 (Javascript)
date: 2022-01-08 03:10:30
layout: post
author: [Hoonjoo]
thumbnail: 'https://user-images.githubusercontent.com/67448481/157115953-792cd47b-7047-4e15-a0e7-56d86f989997.png'
excerpt: 프로그래머스 알고리즘
draft: false
category: '알고리즘'
---

---

### **문제 설명**

스파이들은 매일 다른 옷을 조합하여 입어 자신을 위장합니다.

예를 들어 스파이가 가진 옷이 아래와 같고 오늘 스파이가 동그란 안경, 긴 코트, 파란색 티셔츠를 입었다면 다음날은 청바지를 추가로 입거나 동그란 안경 대신 검정 선글라스를 착용하거나 해야 합니다.

| 종류 | 이름                       |
| ---- | -------------------------- |
| 얼굴 | 동그란 안경, 검정 선글라스 |
| 상의 | 파란색 티셔츠              |
| 하의 | 청바지                     |
| 겉옷 | 긴 코트                    |

스파이가 가진 의상들이 담긴 2차원 배열 clothes가 주어질 때 서로 다른 옷의 조합의 수를 `return` 하도록 solution 함수를 작성해주세요.

### 제한사항

- clothes의 각 행은 [의상의 이름, 의상의 종류]로 이루어져 있습니다.
- 스파이가 가진 의상의 수는 1개 이상 30개 이하입니다.
- 같은 이름을 가진 의상은 존재하지 않습니다.
- clothes의 모든 원소는 문자열로 이루어져 있습니다.
- 모든 문자열의 길이는 1 이상 20 이하인 자연수이고 알파벳 소문자 또는 '\_' 로만 이루어져 있습니다.
- 스파이는 하루에 최소 한 개의 의상은 입습니다.

### 입출력 예

| clothes                                                                                  | return |
| ---------------------------------------------------------------------------------------- | ------ |
| [["yellowhat", "headgear"], ["bluesunglasses", "eyewear"], ["green_turban", "headgear"]] | 5      |
| [["crowmask", "face"], ["bluesunglasses", "face"], ["smoky_makeup", "face"]]             | 3      |

### 입출력 예 설명

> **예제 #1**  
> headgear에 해당하는 의상이 yellow_hat, green_turban이고 eyewear에 해당하는 의상이 blue_sunglasses이므로 아래와 같이 5개의 조합이 가능합니다.

1. yellow_hat
2. blue_sunglasses
3. green_turban
4. yellow_hat + blue_sunglasses
5. green_turban + blue_sunglasses

> **예제 #2**  
> face에 해당하는 의상이 crow_mask, blue_sunglasses, smoky_makeup이므로 아래와 같이 3개의 조합이 가능합니다.

1.  crow_mask
2.  blue_sunglasses
3.  smoky_makeup

---

### 풀이 방법

> 경우의 수를 구하는게 참 빡센 알고리즘이었다.

1. 오브젝트로 된 옷장을 만들어 관리하는게 효율적일 것 같다.
2. 사실 어떤 옷이 들어갔느냐는 중요하지 않다. 각 카테고리별 몇 개의 옷이 들어갔는지가 중요하다.
3. 따라서 오브젝트 형태로 관리해서 경우의 수를 계산해주면 된다.
4. 옷장 `closet` 객체를 생성해준다.
5. `clothes.length`만큼 반복문을 돌려서 각 카테고리별 옷의 개수를 카운팅 해준다.
6. 마지막으로 경우의 수를 카운팅 해준다.

   조합에 대한 경우의 수의 경우 만약 A,B,C 카테고리가 존재한다면 A+B+C+AB+AC+CB+ABC가 경우의 수를 도출하는 공식이 된다. 따라서 `(A+1)(B+1)(C+1)-1`을 해주면 위의 공식을 간략화 하여 도출할 수 있다.

---

### 소스코드

```jsx
function solution(clothes) {
  let closet = {};
  let answer = 1;
  for (let i = 0; i < clothes.length; i++) {
    closet[clothes[i][1]] ? (closet[clothes[i][1]] += 1) : (closet[clothes[i][1]] = 1);
  }
  for (let key in closet) {
    answer *= closet[key] + 1;
  }
  // 아무 것도 안입었을 경우를 제해줘야 한다.
  return answer - 1;
}
```

---

### 소스코드2

```jsx
function solution(clothes) {
  let array = [];
  let answer = 0;
  while (true) {
    let temp = clothes[0];
    temp = temp[temp.length - 1];
    let temparry = clothes.filter(part => part[1] === temp).length;
    array.push(temparry);
    clothes = clothes.filter(part => part[1] !== temp);

    if (clothes == false) {
      break;
    }
  }

  answer += array[0];

  for (let i = 1; i < array.length; i++) {
    let num = array[i] + 1;
    answer = answer * num + array[i];
  }
  return answer;
}
```

---
