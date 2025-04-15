# Java: Why map use Function?

좋은 질문입니다! `.map()` 메서드에서 사용된 람다 표현식이 바로 `Function` 인터페이스의 한 예입니다. 자세히 설명해드리겠습니다.

`Function<T, R>` 인터페이스는 다음과 같은 특징을 가집니다:

- 입력 타입 `T`를 받아서
- 출력 타입 `R`로 변환하는 함수

```java
// Function의 추상 메서드 시그니처
R apply(T t)
```

예시 코드를 자세히 분석해보겠습니다:

```java
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
List<String> transformed = names.stream()
		.map(name -> name.toUpperCase()) // Function 사용 예시
		.collect(Collectors.toList());
```

여기서 `name -> name.toUpperCase()`는 `Function<String, String>`의 정확한 예입니다:

- 입력 타입: `String` (name)
- 출력 타입: `String` (대문자로 변환된 name)
- 변환 로직: 입력 문자열을 대문자로 변경

아래와 같이 명시적으로 작성할 수도 있습니다:

```java
Function<String, String> toUpperCaseFunction = name -> name.toUpperCase();
List<String> transformed = names.stream()
		.map(toUpperCaseFunction)
		.collect(Collectors.toList());
```

다른 `Function` 예시들:

```java
// 문자열 길이를 반환하는 Function
Function<String, Integer> lengthFunction = str -> str.length();

// 숫자를 제곱하는 Function
Function<Integer, Integer> squareFunction = num -> num * num;

// 복잡한 변환 Function
Function<User, String> getUserNameFunction = user -> user.getName();
```

`Stream`의 `.map()` 메서드는 `Function`을 인자로 받아 각 요소를 변환하는 대표적인 예입니다.

핵심은 "입력을 받아 다른 형태로 변환"하는 것이 `Function`의 본질입니다.

## Map calls apply of Function

Key points:

- .map() automatically calls **.apply()** on the Function
- It does this for every element in the stream
- It's a form of lazy evaluation (only processed when terminal operation like .collect() is called)




