# Java: Runnable vs Callable vs virtual thread - Threadpool

I'll explain Runnable, Callable, and Virtual Threads in Korean with code examples.

```java
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class ThreadInterfacesDemo {
    // Runnable 예제
    public static class RunnableExample implements Runnable {
        @Override
        public void run() {
            // 반환 값이 없는 작업 실행
            System.out.println("Runnable 스레드 실행: " + Thread.currentThread().getName());
        }
    }

    // Callable 예제
    public static class CallableExample implements Callable<String> {
        @Override
        public String call() throws Exception {
            // 반환 값이 있는 작업 실행
            return "Callable 작업 완료: " + Thread.currentThread().getName();
        }
    }

    // 가상 스레드 예제
    public static void virtualThreadExample() {
        // Java 19부터 도입된 가상 스레드 생성
        Thread virtualThread = Thread.ofVirtual().unstarted(() -> {
            System.out.println("가상 스레드 실행: " + Thread.currentThread());
        });

        // 가상 스레드 시작
        virtualThread.start();
    }

    public static void main(String[] args) throws Exception {
        // Runnable 사용 예시
        Thread runnableThread = new Thread(new RunnableExample());
        runnableThread.start();

        // Callable 사용 예시
        ExecutorService executor = Executors.newFixedThreadPool(2);
        Future<String> callableFuture = executor.submit(new CallableExample());
        System.out.println(callableFuture.get());

        // 가상 스레드 풀 생성
        try (ExecutorService virtualExecutor = Executors.newVirtualThreadPerTaskExecutor()) {
            virtualExecutor.submit(() -> {
                System.out.println("가상 스레드 풀에서 실행: " + Thread.currentThread());
            });
        }

        // 개별 가상 스레드 생성
        virtualThreadExample();
    }
}

```

Runnable, Callable, 그리고 가상 스레드에 대한 상세 설명입니다:

1. **Runnable**
    - 반환 값이 없는 작업을 정의할 때 사용
    - `run()` 메서드만 구현 (void 반환)
    - 가장 기본적인 스레드 인터페이스
    - 주로 간단한 백그라운드 작업에 사용

2. **Callable**
    - 반환 값이 있는 작업을 정의할 때 사용
    - `call()` 메서드 구현 (제네릭 타입 반환 가능)
    - `Future<V>` 를 통해 결과를 얻을 수 있음
    - 예외 처리가 가능
    - 복잡한 비동기 작업에 적합

3. **가상 스레드 (Virtual Threads)**
    - Java 19에서 도입, Java 21에서 정식 지원
    - 매우 가볍고 경량화된 스레드
    - OS 스레드와 달리 메모리 오버헤드가 매우 적음
    - 수천 개의 스레드를 동시에 생성 가능

**가상 스레드의 장점:**
- 높은 동시성
- 저렴한 생성 비용
- 블로킹 I/O 작업에 최적화
- 컨텍스트 스위칭 오버헤드 감소

**사용 시기:**
- I/O 집중적인 작업
- 대량의 동시 작업 처리
- 웹 서버, 마이크로서비스
- 이벤트 처리

**주의사항:**
- 계산 집중적인 작업에는 플랫폼 스레드가 더 효율적
- 모든 라이브러리와 완벽히 호환되지 않을 수 있음

코드 예제를 통해 각 접근 방식의 차이를 보여드렸습니다. 추가 질문이 있으시면 언제든 물어보세요!