---
title: 'Core Data에 대해 알아보자 (Swift)'
date: '2023.03.17'
category: 'Swift'
excerpt: 'iOS의 로컬 저장소를 활용할 수 있도록 돕는 FirstParty 프레임워크인 CoreData에 대해 알아보자.'
thumbnail: '/images/core-data.webp'
---

## 코어 데이터(Core Data)란?

> 코어 데이터는 iOS 디바이스 로컬 저장소에 데이터를 영구적으로 저장할 수 있게 도와주는 **프레임워크**다. (DB는 아님)

근데 딱 봐도 DB같은 이름을 가진 Core Data가 DB가 아닌 이유가 뭘까? 🧐

![](https://user-images.githubusercontent.com/67448481/225933483-25586c8a-e804-4ba6-93b2-cfbbb7ef99f5.png)

Core Data는 우리의 모델이 SQLite에 CRUD될 수 있도록 관리해주는 것이지, 그 자체로써 데이터베이스인 것은 아니기 때문이다. 즉, iOS의 DB는 SQLite이고 이를 활용 및 관리할 수 있도록 도와주는 "프레임워크"가 바로 CoreData인 것이다.

흠... 일단 프레임워크인 것까지는 알겠는데, 왜 Core Data의 장점과 단점에는 어떤 것들이 있길래 이것이 필요한걸까?

> 필자가 생각하는 가장 주된 장점들 중 하나는, Apple에서 공식적으로 지원하는 **First Party Library**이기 때문이라는 것이다.

바로 Core Data의 장점과 단점에 대해 간단히 알아보도록 하자.

### 🟢 장점

1. Core Data가 애플의 First Party프레임워크라는 점 (매우 높은 호환성과 안정성 보장)
2. Third-Party 라이브러리에 의존할 필요가 없다.
3. 캐싱 및 메모리 관리 기능 자동으로 지원

### 🟠 단점

1. 원격 저장소(DB)로써 사용될 수 없다.
2. 대용량 데이터 및 복잡한 쿼리 처리에는 제한이 있을 수 있다.
3. Object Graph Persistence에 대해 고려해야 한다. (뒤에서 설명 예정)

---

## 코어 데이터의 동작 방식

![](https://user-images.githubusercontent.com/67448481/225933500-e0722e16-4960-45fb-9166-1679910fea7e.png)

> 개략적인 플로우는 위의 사진과 같다

만약 내가 저장하고 싶은 데이터 객체를 위의 박스 이미지라고 가정해 보자. 이 때 우리는 이 데이터를 SQLite에 직접적으로 저장하거나 빼오는 것이 아니다. `Managed Object Context`가 위의 박스를 받아 저장소에 데이터를 저장해 주고 꺼내와 주는 대리인 역할을 해주는 것이다.

이런 개괄적인 설명에서 그치는 것이 아니라, 위의 사진에서 보이는 세 섹션의 개념에 대해 조금 더 자세히 설명해 보도록 하겠다.

### NSManagedObject

![](https://user-images.githubusercontent.com/67448481/225933510-9308e186-d6ae-4727-8b66-3c3b4994bdc6.png)

> CoreData의 핵심 클래스로, 데이터 모델에 정의된 엔티티를 나타내는 객체다.  
> 조금 더 쉽게 얘기하자면, DB에 담긴 데이터의 형태라고 볼 수도 있을 것이다.

우리는 원하는 데이터 모델을 이 `NSManagedObject`로 서브클래싱 해서, `Managed Object Context`가 이를 직렬화(Serialize) 및 역직렬화(Deserialize) 하여 로컬 저장소에 저장 가능하도록 구현할 수 있다.

즉, 우리가 만든 데이터 모델이 `NSManagedObject` 클래스에 서브클래싱 되면서 -> `Managed Object Context`에 의해 핸들링 될 수 있는 형태가 된다는 것이다.

### Managed Object Context

> 이름에서도 유추할 수 있듯이, 이는 데이터 객체의 매니징 및 핸들링을 담당하는 계층이다.

위에서 설명한 `Managed Object ` 인스턴스는 이 컨텍스트에서 생성된다. 그리고, 해당 객체를 수정 및 삭제하고 해당 변경사항을 로컬 저장소에 반영하는 역할을 한다.

![](https://user-images.githubusercontent.com/67448481/225933513-279028d3-d8bf-4b47-a070-ebaf946cebd7.png)

그리고 위의 사진과 같이 로컬 저장소로부터 데이터를 불러와 역직렬화(Deserialize) 하여 우리가 사용 가능한 데이터 형태로 변환해 주기도 한다. 반대로, 우리의 데이터 객체를 직렬화(Serialize) 하여 데이터 베이스에 이를 형태에 맞게 저장해 주기도 한다.

### Persistent Container

> 우리의 DB 또는 Core Data Store의 본체라고 생각하면 된다.

중요한 점은, 데이터 객체가 Persistent Container와 직접적으로 상호작용을 하지는 않는다는 것이다. 위에서도 설명했듯, `Managed Object Context`라는 계층에서 이를 대신해서 수행하기 때문이다.

### 핵심 플로우

1. Core Data 모델에 Entity와 Attributes(속성)를 정의.
2. 정의한 데이터 모델을 기반으로 클래스를 생성
3. Persistent Container에 대한 참조를 얻는다.
4. 그리고 해당 참조를 통해 Managed Object Context를 받는다.
5. 이를 기반으로 CRUD를 수행

---

## 활용 방법

> 이제 기본적인 CoreData의 개념에 대해서 알아봤으니,  
> 기본적인 CoreData의 활용 방법에 대해서 알아보도록 하자.

#### Persistent Container 참조

> ViewController에서 아래와 같이 Persistent Container에 접근할 수 있다.

```swift
var context = (UIApplication.shared.delegate as! AppDelegate).persistentContainer.viewContext
```

### CRUD

> 그리고 기본적인 CRUD 활용 방법은 아래와 같다.

#### Create

```swift
var context = (UIApplication.shared.delegate as! AppDelegate).persistentContainer.viewContext

let newData = YourModel(context: context)
// 데이터 객체에 변화를 준다.
newData.something = "something"

do {
	// 그리고 해당 변경사항을 저장한다.
	try self.context.save()
}
catch {
	// write error codes here
}
```

#### Read

```swift
var request = YourModel.fetchRequest() as NSFetchRequest<YourModel>

do {
	try self.context.fetch(request)
}
catch {
	// write error codes here
}
```

#### Update

```swift
// DataToUpdate라는 특정 데이터를 위에서 선언해줬다고 가정한다.
DataToUpdate.someProperty = "value to change"

do {
	try self.context.save()
}
catch {
	// write error codes here
}
```

#### Delete

> Update와 거의 유사하다.

```swift
// DataToRemove라는 특정 데이터를 위에서 선언해줬다고 가정한다.
context.delete(DataToRemove)

do {
	try self.context.save()
}
catch {
	// write error codes here
}
```

---

## 필터 & 정렬 기능

> 마지막으로, 데이터를 그냥 통째로 불러와 그대로 활용하는 방법에서 더 나아가,  
> 데이터를 필터 및 정렬하여 fetch하는 방법에 대해서 설명해 보도록 하겠다.

### 필터(filter)

> 먼저, 필터링 된 데이터를 불러오는 방법이다.

```swift
var request = YourModel.fetchRequest() as NSFetchRequest<YourModel>

// 1. 아래와 같이 하면 동적 데이터에 대한 필터링을 할 수 있다. (variables에 원하는 변수 대입)
let predicate = NSPredicate(format: "someProperty CONTAINS %@", variables)
// 2. 아니면 값을 그대로 넣어줄 수도 있다.
let predicate = NSPredicate(format: "someProperty CONTAINS hoonjoo")
request.predicate = predicate

do {
	try context.fetch(request)
}
catch {
	// 에러 핸들링 코드
}
```

참고로, NSPredicate에 대한 문법은 아래 링크를 확인하면 쉽게 감을 잡을 수 있을 것이다.
[NSPredicate Cheatsheet]('https://academy.realm.io/posts/nspredicate-cheatsheet/')

### 정렬

> 정렬은 필터링에 비해 굉장히 간단하다. (조금 더 직관적)

```swift
// 보일러플레이트 코드는 위와 동일하다고 가정...

let sort = NSSortDescriptor(key: 'someProperty', ascending: true) // 오름차순

request.sortDescriptors = [sort]
```

---
