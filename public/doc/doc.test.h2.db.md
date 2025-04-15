# H2: test

다음은 **H2 데이터베이스**와 **HikariCP 커넥션 풀**을 사용하는 application.yml 예제입니다.

이 설정은 **임베디드 H2 데이터베이스**를 사용하여 테스트 환경에서 쉽게 실행할 수 있도록 구성되었습니다.

**📌 H2 + HikariCP 설정된 application.yml**

```
spring:
  datasource:
    url: jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE
    driver-class-name: org.h2.Driver
    username: sa
    password:
    type: com.zaxxer.hikari.HikariDataSource
    hikari:
      maximumPoolSize: 10
      minimumIdle: 2
      idleTimeout: 600000
      maxLifetime: 1800000
      connectionTimeout: 30000
      poolName: HikariCP

  jpa:
    database-platform: org.hibernate.dialect.H2Dialect
    hibernate:
      ddl-auto: update  # 스키마 자동 업데이트 (필요에 따라 create 또는 validate로 변경 가능)
    properties:
      hibernate:
        format_sql: true
        use_sql_comments: true
        generate_statistics: false
    show-sql: true
    open-in-view: false

  h2:
    console:
      enabled: true  # H2 웹 콘솔 활성화 (http://localhost:8080/h2-console)
      path: /h2-console
      settings:
        web-allow-others: true

  sql:
    init:
      mode: always  # H2 환경에서 자동으로 schema.sql, data.sql 실행
      platform: h2

logging:
  level:
    org.hibernate.SQL: DEBUG
    org.hibernate.type.descriptor.sql.BasicBinder: TRACE
```

---

**✅ 설정 설명**

1. **H2 데이터베이스**

• jdbc:h2:mem:testdb → 메모리 기반 H2 데이터베이스를 사용 (애플리케이션 종료 시 데이터 삭제됨)

• DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE → 세션이 종료되어도 데이터 유지

• h2.console.enabled=true → H2 웹 콘솔 활성화 (http://localhost:8080/h2-console)

• H2 콘솔 로그인 정보:

•    **JDBC URL:** jdbc:h2:mem:testdb

•    **Username:** sa

•    **Password:** (없음)

2. **HikariCP 커넥션 풀**

• maximumPoolSize: 10 → 최대 10개의 커넥션 유지

• minimumIdle: 2 → 최소 2개의 커넥션 유지

• idleTimeout: 600000ms (10분) → 사용하지 않는 커넥션을 닫는 시간

3. **JPA 설정**

• hibernate.ddl-auto: update → 기존 테이블을 변경하지 않고 필요한 컬럼만 추가

• database-platform: org.hibernate.dialect.H2Dialect → H2 전용 Hibernate 설정

• show-sql: true → SQL 쿼리 로그 출력

4. **SQL 초기화**

• sql.init.mode: always → schema.sql, data.sql 실행 가능

---

**🚀 실행 후 H2 콘솔 접속 방법**

1. **애플리케이션 실행**

2. 브라우저에서 **http://localhost:8080/h2-console** 접속

3. JDBC URL 입력: jdbc:h2:mem:testdb

4. **“Connect”** 클릭

이 설정을 사용하면 **테스트 환경에서 H2 DB로 쉽게 개발 및 테스트**할 수 있습니다! 💡

필요한 부분이 있으면 추가 요청 주세요. 😃