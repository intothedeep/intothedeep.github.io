# Java: Consumer vs Supplier vs Function

I'll create an artifact that explains the differences between Consumer, Supplier, and Function with annotations in Korean.

```java
import java.util.function.Consumer;
import java.util.function.Supplier;
import java.util.function.Function;

public class FunctionalInterfacesComparison {
    public static void main(String[] args) {
        // Consumer: 입력은 있지만 반환 없음 (void)
        // 소비만 함 (입력을 받아 어떤 작업 수행)
        Consumer<String> consumer = (message) -> {
            System.out.println("소비자(Consumer): " + message);
            // 아무것도 반환하지 않음
        };
        consumer.accept("Hello, World!");

        // Supplier: 입력 없고, 반환만 함
        // 값을 공급(생성)함
        Supplier<String> supplier = () -> {
            return "공급자(Supplier)가 생성한 문자열";
        };
        String suppliedValue = supplier.get();
        System.out.println("공급자(Supplier): " + suppliedValue);

        // Function: 입력도 있고, 반환도 있음
        // 입력을 받아 변환하여 반환
        Function<String, Integer> function = (input) -> {
            return input.length(); // 입력을 변환하여 반환
        };
        Integer functionResult = function.apply("Function 길이 계산");
        System.out.println("함수(Function): " + functionResult);
    }
}

/* 함수형 인터페이스 주요 차이점 설명:

1. Consumer<T>
   - 입력(O), 반환(X)
   - 메서드: void accept(T t)
   - 주 목적: 입력된 값을 소비(처리)
   - 예: 로깅, 출력, 저장 등

2. Supplier<T>
   - 입력(X), 반환(O)
   - 메서드: T get()
   - 주 목적: 값 생성/공급
   - 예: 난수 생성, 기본값 제공

3. Function<T, R>
   - 입력(O), 반환(O)
   - 메서드: R apply(T t)
   - 주 목적: 입력을 다른 형태로 변환
   - 예: 문자열을 길이로 변환, 객체 매핑

핵심 차이:
- Consumer: 소비만 함 (void)
- Supplier: 생성만 함 (반환)
- Function: 변환함 (입력 → 출력)
*/

```

주요 차이점을 좀 더 자세히 설명드리겠습니다:

1. **Consumer<T>**
    - 입력은 받지만 반환하지 않음
    - `void accept(T t)` 메서드 사용
    - 데이터를 "소비"하는 데 초점
    - 예: 콘솔 출력, 로깅, 리스트에 추가 등

2. **Supplier<T>**
    - 입력은 없고 반환만 함
    - `T get()` 메서드 사용
    - 값을 "공급"하거나 생성하는 데 초점
    - 예: 랜덤 값 생성, 기본값 제공

3. **Function<T, R>**
    - 입력도 받고 반환도 함
    - `R apply(T t)` 메서드 사용
    - 입력을 다른 형태로 "변환"하는 데 초점
    - 예: 문자열 길이 계산, 객체 매핑

간단한 비유:
- Consumer: 음식을 먹기만 함
- Supplier: 음식을 만들어서 제공함
- Function: 재료를 받아 요리해서 새 음식으로 만듦

실제 코드에서 이런 방식으로 활용할 수 있습니다:
```java
// Consumer 예시
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
names.forEach(System.out::println); // 각 이름 출력

// Supplier 예시
Supplier<Integer> randomSupplier = () -> new Random().nextInt(100);
Integer randomNumber = randomSupplier.get(); // 0-99 사이 랜덤 숫자 생성

// Function 예시
List<String> transformed = names.stream()
    .map(name -> name.toUpperCase()) // 대문자로 변환
    .collect(Collectors.toList());
```

추가 질문이 있으시면 언제든 물어보세요!

