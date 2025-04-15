# Spring::Data JPA vs JDBC - explicitly manage transaction

✅ Spring Data JDBC에서도 **PlatformTransactionManager를 사용하여 명시적으로 트랜잭션을 관리**할 수 있음.

✅ 간단한 트랜잭션 관리에는 **@Transactional 또는 TransactionTemplate**을 추천.

✅ 트랜잭션을 세밀하게 제어해야 한다면 **PlatformTransactionManager를 직접 사용**.

💡 **JPA의 EntityManager는 사용할 수 없지만, JDBC 환경에서도 충분히 트랜잭션을 제어할 수 있음!**