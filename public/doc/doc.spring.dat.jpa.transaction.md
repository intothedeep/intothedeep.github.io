# Spring::Data::JPA Transaction, EntityManger, TransactionManager

**JPA에서 트랜잭션 관리 방식과 명시적 관리 방법**

JPA는 기본적으로 **Spring의 @Transactional을 사용한 자동 트랜잭션 관리**를 지원하지만, 명시적으로 트랜잭션을 관리할 수도 있습니다.

이 과정에서 JPA는 JDBC와 비교하여 다른 트랜잭션 관리 방식을 가지므로, 각각의 차이점도 살펴보겠습니다.

---

**1. JPA에서 트랜잭션 관리 방식**

JPA에서 트랜잭션 관리는 **엔터프라이즈 애플리케이션의 표준인 “JTA (Java Transaction API)” 또는 “Spring의 PlatformTransactionManager“를 통해 처리**됩니다.

• JPA는 **트랜잭션 없이 동작할 수 없음** (즉, 반드시 트랜잭션 내에서 데이터 변경이 이루어져야 함).

• JPA의 **EntityManager는 트랜잭션의 컨텍스트 내에서만 영속성 컨텍스트(Persistence Context)를 유지**하며, 트랜잭션이 종료되면 변경 사항이 커밋됨.

• Spring에서는 일반적으로 **@Transactional을 사용하여 트랜잭션을 자동으로 관리**함.

**🔹 기본적인 자동 트랜잭션 관리 (@Transactional)**

```
@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public void updateUser(Long userId, String newName) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setName(newName);
    } // 트랜잭션이 끝나면 자동으로 커밋됨
}
```

✅ **설명**

• @Transactional을 사용하면 **Spring이 자동으로 트랜잭션을 시작하고, 종료 시점에 커밋 또는 롤백을 수행**.

• 만약 RuntimeException이 발생하면 자동으로 롤백됨.

---

**2. JPA에서 명시적인 트랜잭션 관리 (EntityManager 직접 사용)**

JPA에서도 **EntityManager와 EntityTransaction을 활용하여 트랜잭션을 명시적으로 제어**할 수 있습니다.

이 방식은 @Transactional보다 더 세밀한 트랜잭션 관리가 필요할 때 사용됩니다.

**🔹 EntityManager를 이용한 명시적 트랜잭션 관리**

```
@Service
public class UserService {
    @PersistenceContext
    private EntityManager entityManager;

    public void updateUserExplicitly(Long userId, String newName) {
        EntityTransaction transaction = entityManager.getTransaction();

        try {
            transaction.begin(); // 트랜잭션 시작

            User user = entityManager.find(User.class, userId);
            if (user == null) {
                throw new RuntimeException("User not found");
            }
            user.setName(newName);
            entityManager.persist(user);

            transaction.commit(); // 트랜잭션 커밋
        } catch (Exception e) {
            transaction.rollback(); // 예외 발생 시 롤백
        }
    }
}
```

✅ **설명**

• entityManager.getTransaction().begin();을 호출하여 **트랜잭션을 명시적으로 시작**.

• commit()을 호출하면 **변경 사항이 DB에 반영됨**.

• rollback()을 호출하면 **모든 변경 사항이 취소됨**.

---

**3. JPA vs JDBC 트랜잭션 관리 차이점**

JPA와 JDBC의 트랜잭션 관리 방식은 크게 다릅니다.

| **비교 항목**                  | **JPA (Java Persistence API)**        | **JDBC (Java Database Connectivity)**                  |
|----------------------------|---------------------------------------|--------------------------------------------------------|
| **트랜잭션 API**               | EntityTransaction (EntityManager)     | Connection.setAutoCommit(false), commit(), rollback()  |
| **트랜잭션 범위**                | 영속성 컨텍스트(Persistence Context)와 함께 관리됨 | 개별 SQL 실행과 직접 연관됨                                      |
| **자동 트랜잭션 관리**             | @Transactional 사용 가능                  | DataSourceTransactionManager 또는 TransactionTemplate 필요 |
| **트랜잭션 커밋 시점**             | 트랜잭션 종료 시 flush() 호출 후 커밋             | commit() 호출 즉시 데이터베이스 반영                               |
| **변경 감지 (Dirty Checking)** | 엔티티 상태 변경을 자동으로 감지하여 반영               | SQL을 직접 실행해야 변경 반영                                     |
| **성능 최적화**                 | 1차 캐시 및 지연 로딩 지원                      | 단순 SQL 실행                                              |

✅ **정리**

• JPA는 **객체 중심의 트랜잭션 관리**, JDBC는 **SQL 중심의 트랜잭션 관리**.

• JPA는 영속성 컨텍스트 덕분에 **변경 감지(Dirty Checking)** 및 **지연 로딩(Lazy Loading)** 등의 기능을 활용할 수 있음.

• JDBC는 트랜잭션이 DB 연결 수준에서 이루어지므로, **즉각적인 반영이 필요할 때 더 유용**함.

---

**4. 언제 JPA의 명시적 트랜잭션 관리가 필요할까?**

JPA에서는 @Transactional이 대부분의 경우 충분하지만, 다음과 같은 경우 명시적인 트랜잭션 관리가 필요할 수 있습니다.

**✅ 명시적 트랜잭션 관리가 필요한 경우**

1️⃣ **다른 트랜잭션 범위를 가지는 로직과 함께 실행해야 할 때**

• 한 서비스에서 두 개 이상의 서로 다른 데이터베이스를 사용하는 경우

• 한 번의 API 호출 내에서 일부만 트랜잭션을 적용해야 할 때

2️⃣ **비즈니스 로직에 따라 일부만 커밋하고 나머지는 롤백해야 할 때**

```
TransactionStatus status = transactionManager.getTransaction(new DefaultTransactionDefinition());
try {
    methodA();  // 트랜잭션 포함
    transactionManager.commit(status); // 일부 커밋
    methodB();  // 다른 트랜잭션 실행
} catch (Exception e) {
    transactionManager.rollback(status); // 전체 롤백
}
```

3️⃣ **JDBC 기반 API (예: JdbcTemplate)와 함께 사용해야 할 때**

• JPA와 순수 JDBC를 혼합하여 사용해야 하는 경우 트랜잭션을 명시적으로 관리해야 할 수 있음.

4️⃣ **트랜잭션을 중첩해서 사용해야 할 때**

• Spring에서는 @Transactional이 내부적으로 프록시를 사용하므로, **같은 클래스 내에서 트랜잭션이 중첩되지 않음**.

• 이를 해결하기 위해 **명시적인 트랜잭션 관리가 필요**할 수 있음.

---

**5. 결론**

✅ JPA에서는 기본적으로 @Transactional을 사용한 **자동 트랜잭션 관리**를 제공하지만, EntityManager와 PlatformTransactionManager를 이용하여 **명시적으로 트랜잭션을
관리할 수도 있음**.

✅ JDBC와 달리 JPA는 **영속성 컨텍스트를 활용한 트랜잭션 관리**를 하며, **자동 변경 감지(Dirty Checking)**를 통해 데이터베이스 업데이트를 최적화할 수 있음.

✅ 하지만,

•    **JDBC 기반 API와 혼합 사용**할 경우

•    **부분 커밋이 필요한 경우**

•    **고급 트랜잭션 관리가 필요한 경우**

에는 **명시적인 트랜잭션 관리가 필요할 수 있음.**