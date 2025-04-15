# Spring: start-jdbc vs data-jdbc

**JDBC API vs Spring Data JDBC 차이점 (Spring에서의 활용)**

Spring에서는 **JDBC API**와 **Spring Data JDBC**를 사용하여 데이터베이스에 접근할 수 있습니다.

두 접근 방식의 차이점을 살펴보고, 각각의 특징과 장단점을 비교해보겠습니다.

---

**1. JDBC API (Java Database Connectivity)**

**📌 개념**

• Java에서 기본적으로 제공하는 데이터베이스 연결 API.

• java.sql.Connection, java.sql.Statement, java.sql.ResultSet 등을 직접 사용하여 SQL을 실행하고 데이터를 처리함.

• 개발자가 SQL 작성, 예외 처리, 연결 해제 등의 작업을 수동으로 관리해야 함.

**📌 특징**

• 가장 기본적인 데이터베이스 접근 방식.

• DriverManager 또는 DataSource를 사용하여 DB 연결을 관리.

• PreparedStatement를 활용하여 SQL 실행 및 데이터 바인딩 수행.

• 트랜잭션 관리와 예외 처리를 직접 구현해야 함.

**📌 코드 예제**

```
public List<User> findAllUsers() {
    List<User> users = new ArrayList<>();
    String sql = "SELECT * FROM users";

    try (Connection conn = dataSource.getConnection();
         PreparedStatement stmt = conn.prepareStatement(sql);
         ResultSet rs = stmt.executeQuery()) {

        while (rs.next()) {
            User user = new User();
            user.setId(rs.getLong("id"));
            user.setName(rs.getString("name"));
            user.setEmail(rs.getString("email"));
            users.add(user);
        }
    } catch (SQLException e) {
        e.printStackTrace(); // 예외 처리 필요
    }
    return users;
}
```

**📌 장점**

✅ 데이터베이스와 직접적인 저수준 컨트롤이 가능 (최적화 가능).

✅ 특정 데이터베이스 기능을 활용할 때 유연함.

✅ Spring 없이도 사용 가능 (Java SE에서도 사용 가능).

**📌 단점**

❌ **SQL을 직접 작성해야 하므로 코드가 길어짐.**

❌ **Connection 및 Resource 관리가 번거로움.**

❌ **예외 처리를 직접 해야 함.**

❌ **객체-관계 매핑(ORM) 기능 부족.**

---

**2. Spring Data JDBC**

**📌 개념**

• Spring에서 제공하는 **간소화된 JDBC 데이터 접근 기술**.

• SQL을 직접 작성하지만, Spring이 내부적으로 **JDBC API를 추상화**하여 반복적인 코드 작성을 줄여줌.

• JdbcTemplate을 사용하여 데이터베이스 작업을 간편하게 수행 가능.

• Spring Data JPA처럼 엔티티 기반으로 데이터 접근이 가능하지만, **JPA처럼 복잡한 기능(영속성 컨텍스트, Lazy Loading 등)은 제공하지 않음**.

**📌 특징**

• JdbcTemplate을 활용하여 반복적인 JDBC API 사용을 줄임.

• 객체 매핑 기능 제공 (ORM 수준은 아니지만, 엔티티 객체로 매핑 가능).

• 트랜잭션 및 예외 처리를 자동화.

• JPA보다 가벼운 데이터 액세스 솔루션.

**📌 코드 예제**

**(1) JdbcTemplate 사용**

```
@Repository
public class UserRepository {
    private final JdbcTemplate jdbcTemplate;

    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<User> findAllUsers() {
        String sql = "SELECT * FROM users";
        return jdbcTemplate.query(sql, (rs, rowNum) -> new User(
            rs.getLong("id"),
            rs.getString("name"),
            rs.getString("email")
        ));
    }
}
```

**(2) Spring Data JDBC 사용 (엔티티 기반)**

```
@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    // 기본적인 CRUD 메서드 자동 제공 (findById, save, delete 등)
}
```

```
@Table("users")
public class User {
    @Id
    private Long id;
    private String name;
    private String email;
}
```

**📌 장점**

✅ **JDBC API보다 코드가 훨씬 간결해짐** (JdbcTemplate 제공).

✅ **트랜잭션 및 예외 처리가 자동화됨**.

✅ **JPA보다 가볍고, 복잡한 설정이 필요 없음**.

✅ **SQL 기반이므로 성능 최적화가 쉬움**.

**📌 단점**

❌ **JPA처럼 자동으로 SQL을 생성하지 않음 (SQL 직접 작성 필요)**.

❌ **Lazy Loading, 엔티티 라이프사이클 관리 같은 기능이 없음**.

❌ **복잡한 관계형 데이터 모델에는 적합하지 않음 (Join 등 수동 처리 필요)**.

---

**3. JDBC API vs Spring Data JDBC 비교 정리**

| **비교 항목** | **JDBC API** | **Spring Data JDBC** |
|-----------|--------------|----------------------|
| SQL 직접 작성 | ✅ 필요         | ✅ 필요                 |
| 코드 복잡도    | ❌ 높음         | ✅ 간결                 |
| 리소스 관리    | ❌ 수동         | ✅ 자동                 |
| 트랜잭션 관리   | ❌ 수동         | ✅ 자동                 |
| 예외 처리     | ❌ 직접 구현      | ✅ 자동 처리              |
| ORM 지원    | ❌ 없음         | ⚠️ 일부 지원 (JPA 수준 아님) |
| 성능 최적화    | ✅ 직접 컨트롤 가능  | ✅ 직접 SQL 작성 가능       |

---

**4. 결론: 언제 사용해야 할까?**

| **상황**                            | **JDBC API** | **Spring Data JDBC** |
|-----------------------------------|--------------|----------------------|
| **최대한 직접 SQL을 최적화해야 하는 경우**       | ✅            | ❌                    |
| **빠르게 데이터 접근 계층을 구축해야 하는 경우**     | ❌            | ✅                    |
| **JPA 없이 간단한 데이터 접근이 필요한 경우**     | ❌            | ✅                    |
| **트랜잭션 및 예외 처리를 자동화하고 싶은 경우**     | ❌            | ✅                    |
| **대규모 복잡한 관계형 데이터 모델을 다뤄야 하는 경우** | ❌            | ❌ (JPA 권장)           |

👉 **JDBC API는 저수준의 데이터베이스 컨트롤이 필요할 때 적합**

👉 **Spring Data JDBC는 JPA를 사용하지 않으면서도 빠르고 간단한 데이터 액세스가 필요할 때 유용**

👉 **복잡한 관계형 데이터 모델을 다뤄야 한다면 Spring Data JPA 또는 Hibernate 사용 고려**

**✅ 일반적으로 Spring에서는 JDBC API보다는 Spring Data JDBC 또는 JPA를 더 많이 사용합니다.**