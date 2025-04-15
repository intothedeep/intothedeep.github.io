# Java: Thread.join() -> Block Main Thread

I'll explain the `join()` method in Java with a detailed code example to demonstrate its behavior.

```java
public class ThreadJoinExample {
    public static class WorkerThread extends Thread {
        private String name;
        
        public WorkerThread(String name) {
            this.name = name;
        }
        
        @Override
        public void run() {
            try {
                System.out.println(name + " thread started");
                // Simulate some work
                Thread.sleep(2000); // Sleep for 2 seconds
                System.out.println(name + " thread finished");
            } catch (InterruptedException e) {
                System.out.println(name + " thread interrupted");
            }
        }
    }

    public static void main(String[] args) {
        try {
            // Create multiple worker threads
            WorkerThread thread1 = new WorkerThread("Thread-1");
            WorkerThread thread2 = new WorkerThread("Thread-2");
            WorkerThread thread3 = new WorkerThread("Thread-3");

            // Start the threads
            thread1.start();
            thread2.start();
            thread3.start();

            // Main thread will wait for each thread to complete
            System.out.println("Main thread waiting for Thread-1");
            thread1.join(); // Main thread stops and waits for thread1 to finish
            System.out.println("Thread-1 completed. Main thread continues.");

            System.out.println("Main thread waiting for Thread-2");
            thread2.join(); // Main thread stops and waits for thread2 to finish
            System.out.println("Thread-2 completed. Main thread continues.");

            System.out.println("Main thread waiting for Thread-3");
            thread3.join(); // Main thread stops and waits for thread3 to finish
            System.out.println("Thread-3 completed. Main thread continues.");

            System.out.println("All threads have completed. Main thread exits.");
        } catch (InterruptedException e) {
            System.out.println("Main thread interrupted");
        }
    }
}

```

`join()` 메서드의 핵심 특징:

1. **동작 원리**:
    - `join()`을 호출하면 호출한 스레드(여기서는 메인 스레드)가 대상 스레드의 작업이 완료될 때까지 대기합니다.
    - 메인 스레드는 실질적으로 블로킹되어 다음 코드로 진행하지 않습니다.

2. **순차적 실행**:
    - `join()`을 사용하면 스레드를 순차적으로 실행할 수 있습니다.
    - 각 스레드의 작업이 완전히 끝날 때까지 기다립니다.

3. **오버로드된 `join()` 메서드**:
    - `join()`: 스레드가 완전히 종료될 때까지 무한정 대기
    - `join(long millis)`: 지정된 밀리초 동안만 대기
    - `join(long millis, int nanos)`: 밀리초와 나노초 단위로 대기 시간 지정

**주의사항**:
- `join()`은 `InterruptedException`을 throw할 수 있어 예외 처리가 필요합니다.
- 과도한 `join()` 사용은 성능에 영향을 줄 수 있습니다.

**대안적 접근**:
- 병렬 처리가 필요한 경우 `ExecutorService`
- 동기화가 필요한 경우 `CountDownLatch`나 `CyclicBarrier` 고려

이 예제에서는 메인 스레드가 각 워커 스레드의 작업이 완료될 때까지 순차적으로 대기합니다. 스레드들은 병렬로 시작되지만, `join()`으로 인해 메인 스레드에서는 순차적으로 완료를 기다립니다.