# Java: Class has Intrinsic Monitor Lock

I'll provide a comprehensive explanation of monitors and locks in Java with some code examples.

```java
// Demonstration of monitor locks in Java

public class MonitorLockExample {
    // Each object in Java has an intrinsic monitor lock
    private final Object lockObject = new Object();
    
    // Basic synchronized method (uses object's intrinsic lock)
    public synchronized void synchronizedMethod() {
        // This method acquires the object's monitor lock
        System.out.println("Synchronized method executed");
    }
    
    // Explicit monitor lock usage
    public void explicitMonitorLock() {
        synchronized (lockObject) {
            // Critical section protected by the monitor lock
            System.out.println("Explicit monitor lock in use");
        }
    }
    
    // Complex synchronization example
    private int sharedResource = 0;
    
    public void incrementWithMonitor() {
        synchronized (this) {
            sharedResource++; // Thread-safe increment
        }
    }
}

// Example of wait() and notify() with monitor locks
class WaitNotifyExample {
    private boolean dataReady = false;
    
    public synchronized void producer() throws InterruptedException {
        while (dataReady) {
            // Wait if data is already processed
            wait(); 
        }
        // Produce data
        dataReady = true;
        notify(); // Signal consumer
    }
    
    public synchronized void consumer() throws InterruptedException {
        while (!dataReady) {
            // Wait for data to be ready
            wait();
        }
        // Consume data
        dataReady = false;
        notify(); // Signal producer
    }
}

```

Let me break down the key points about monitor locks in Java:

1. **Intrinsic Monitor Locks**:
    - In Java, every object has an intrinsic monitor lock (also called an intrinsic mutex).
    - When you use the `synchronized` keyword, you're using this built-in monitor lock mechanism.

2. **Synchronization Methods**:
    - When you declare a method as `synchronized`, it automatically uses the object's intrinsic lock.
    - Only one thread can execute a synchronized method on the same object at a time.

3. **Synchronized Blocks**:
    - You can use `synchronized(object)` to create a synchronized block.
    - This allows more fine-grained control over locking.

4. **Wait and Notify Mechanisms**:
    - `wait()`, `notify()`, and `notifyAll()` are used for inter-thread communication.
    - These methods must be called from within a synchronized context.

Key differences in lock approaches:
- Synchronized methods lock the entire method
- Synchronized blocks allow locking specific code sections
- You can use different objects as lock targets for more complex synchronization

Common use cases:
- Protecting shared resources
- Preventing race conditions
- Implementing thread-safe operations

Modern Java alternatives to traditional monitor locks include:
- `java.util.concurrent` package
- `ReentrantLock`
- `AtomicInteger` and other atomic classes
- `synchronized` keyword (still widely used)

Would you like me to elaborate on any of these points or explain how monitor locks work in more depth?