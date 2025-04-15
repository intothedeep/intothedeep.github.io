# Spring: Redis session

Spring Boot에서 **Redis를 세션 저장소**로 사용하려면 다음과 같은 설정이 필요합니다.

---

**✅ 1. 의존성 추가**

Redis를 세션 저장소로 사용하려면 spring-session-data-redis와 spring-boot-starter-data-redis를 추가해야 합니다.

**📌 Gradle (Kotlin DSL)**

```
dependencies {
    implementation("org.springframework.boot:spring-boot-starter-data-redis")
    implementation("org.springframework.session:spring-session-data-redis")
}
```

**📌 Gradle (Groovy DSL)**

```
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-data-redis'
    implementation 'org.springframework.session:spring-session-data-redis'
}
```

---

**✅ 2. application.yml 설정**

Spring Boot에서 Redis를 세션 저장소로 사용하려면 spring.session.store-type=redis를 설정해야 합니다.

```
spring:
  session:
    store-type: redis  # Redis를 세션 저장소로 사용
  redis:
    host: localhost  # Redis 서버 주소 (기본값: localhost)
    port: 6379  # Redis 포트 (기본값: 6379)
    password: your_password  # (선택) Redis에 비밀번호가 있는 경우 설정
    timeout: 60000  # 연결 타임아웃 (밀리초)
```

👉 **Redis가 로컬이 아닌 외부 서버에 있을 경우** host와 port를 변경하세요.

---

**✅ 3. Redis 세션 설정**

Spring Boot는 자동으로 Redis를 세션 저장소로 사용하도록 설정하지만, 커스텀 설정이 필요할 경우 RedisHttpSessionConfiguration을 정의할 수 있습니다.

📌 **세션 TTL(Time-To-Live) 설정 예시**

```
@Configuration
@EnableRedisHttpSession(maxInactiveIntervalInSeconds = 1800) // 30분 유지
public class RedisSessionConfig {
}
```

• @EnableRedisHttpSession(maxInactiveIntervalInSeconds = 1800)

→ **세션 유지 시간**을 30분으로 설정

---

**✅ 4. 테스트 코드**

Redis에 세션이 잘 저장되는지 확인하려면 HttpSession을 사용하여 값을 저장하고, 이후 요청에서 해당 값을 유지하는지 확인하면 됩니다.

```
@RestController
@RequestMapping("/session")
public class SessionController {

    @GetMapping("/set")
    public String setSession(HttpSession session) {
        session.setAttribute("username", "john_doe");
        return "Session set!";
    }

    @GetMapping("/get")
    public String getSession(HttpSession session) {
        return "Stored session value: " + session.getAttribute("username");
    }
}
```

📌 **테스트 방법**

1. /session/set 엔드포인트를 호출하여 세션 값 저장

2. /session/get 엔드포인트를 호출하여 세션 값이 유지되는지 확인

---

**✅ 5. Redis 실행 (로컬 환경)**

로컬에서 Redis가 실행되지 않았다면 먼저 실행해야 합니다.

**📌 1) Docker로 실행**

```
docker run --name redis -p 6379:6379 -d redis
```

👉 이렇게 실행하면 **기본 포트(6379)에서 Redis 실행**됨.

**📌 2) 직접 설치하여 실행**

•    **Mac (Homebrew)**

```
brew install redis
brew services start redis
```

•    **Ubuntu**

```
sudo apt update
sudo apt install redis-server
sudo systemctl start redis
```

**📌 3) Redis 접속 테스트**

Redis가 제대로 실행되었는지 확인하려면 Redis CLI를 사용하여 접속 후 ping을 실행하세요.

```
redis-cli
> ping
PONG
```

---

**✅ 6. Redis에 세션이 저장되는지 확인**

Redis에서 세션이 잘 저장되었는지 확인하려면 Redis CLI에서 다음 명령어를 실행하세요.

```
redis-cli keys "*"
```

👉 결과 예시:

```
1) "spring:session:sessions:xyz123abc..."
```

이와 같이 spring:session:sessions: 접두사를 가진 키가 저장되면 Redis 세션이 정상적으로 작동하는 것입니다.

---

**📌 결론**

✔ **Spring Boot에서 Redis를 세션 저장소로 사용하려면**

1️⃣ spring-boot-starter-data-redis, spring-session-data-redis 추가

2️⃣ application.yml에서 spring.session.store-type=redis 설정

3️⃣ @EnableRedisHttpSession으로 세션 TTL 설정 가능

4️⃣ Redis가 정상적으로 실행되는지 확인 (redis-cli keys "*")

이제 **세션이 Redis에 저장되며, 여러 서버에서 공유 가능**한 구조가 됩니다! 🚀