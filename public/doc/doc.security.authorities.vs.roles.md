# Spring Security: Authorities vs Roles

**Spring Security 6: Authentication Object, Authorities vs Roles**

**1. Authentication Object**

Authentication 객체는 Spring Security에서 현재 인증된 사용자 정보를 담고 있는 핵심 객체입니다.

SecurityContextHolder를 통해 접근할 수 있으며, 일반적으로 아래와 같은 주요 정보를 포함합니다.

```java
Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
```

**Authentication 객체의 주요 필드**

• principal: 사용자 정보 (보통 UserDetails 구현체)

• credentials: 인증에 사용된 자격 증명 (예: 비밀번호, OAuth2 토큰 등)

• authorities: 사용자에게 부여된 권한 목록 (Spring Security의 GrantedAuthority 객체)

• details: 추가적인 인증 정보 (IP 주소, 세션 정보 등)

• authenticated: 인증 여부 (true/false)

---

**2. Authorities vs Roles**

**(1) Authorities (권한, GrantedAuthority)**

• GrantedAuthority 인터페이스를 구현한 객체로, 사용자의 특정 권한을 나타냄.

• 예를 들어, "READ_PRIVILEGE", "WRITE_PRIVILEGE" 같은 권한을 부여할 수 있음.

• 역할(ROLE)과 달리, 일반적인 권한으로 더 세밀한 접근 제어가 가능.

```java
Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
```

**(2) Roles (역할)**

• 역할(ROLE_ prefix가 붙은 권한)도 결국 GrantedAuthority의 일종이지만, 보통 더 높은 수준의 개념.

• 예: "ROLE_ADMIN", "ROLE_USER" 같은 식으로 사용됨.

• Spring Security에서는 hasRole("ADMIN")과 같은 방식으로 확인 가능.

• 역할을 hasAuthority("ROLE_ADMIN")로도 확인할 수 있음 (결국 GrantedAuthority이므로).

• hasRole("ADMIN")을 사용할 경우, Spring Security 내부적으로 "ROLE_ADMIN"로 변환됨.

```java
@PreAuthorize("hasRole('ADMIN')") // 내부적으로 "ROLE_ADMIN"으로 매칭됨
public void adminOnlyMethod() { }
```

---

**3. 차이점 요약**

| **구분** | **Authorities (권한)**                              | **Roles (역할)**                              |
|--------|---------------------------------------------------|---------------------------------------------|
| 개념     | 개별적인 권한 (ex: "READ_PRIVILEGE", "WRITE_PRIVILEGE") | 역할 그룹 (ex: "ROLE_ADMIN", "ROLE_USER")       |
| 저장 형태  | GrantedAuthority 객체                               | GrantedAuthority 객체 (다만 “ROLE_” prefix를 사용) |
| 체크 방법  | hasAuthority("READ_PRIVILEGE")                    | hasRole("ADMIN") (내부적으로 "ROLE_ADMIN"으로 변환)  |
| 유연성    | 세밀한 권한 제어 가능                                      | 특정 역할 그룹으로 간단하게 권한 부여                       |

---

**4. 예제 코드**

**(1) UserDetailsService에서 사용자에게 권한 부여**

```java
@Override
public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return User.builder()
        .username(username)
        .password(passwordEncoder.encode("password"))
        .authorities("ROLE_ADMIN", "READ_PRIVILEGE") // 역할과 권한을 함께 부여
        .build();
}
```

**(2) Security Configuration에서 접근 제어**

```java
@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/admin").hasRole("ADMIN")  // "ROLE_ADMIN"과 동일
                .requestMatchers("/read").hasAuthority("READ_PRIVILEGE") // 특정 권한 필요
                .anyRequest().authenticated()
            )
            .formLogin(withDefaults());
        return http.build();
    }
}
```

---

**5. 결론**

• Authorities는 개별 권한을 나타내며, 더 세밀한 권한 관리를 위해 사용됨.

• Roles는 역할의 개념으로, 내부적으로 "ROLE_" prefix가 붙어 관리됨.

• 결국 역할도 GrantedAuthority의 일종이며, hasRole("ADMIN")을 사용하면 내부적으로 "ROLE_ADMIN"로 변환됨.

• 보다 유연한 접근 제어를 위해 Authorities를 활용하는 것이 좋음.

**✅ 권한이 세밀하게 필요한 경우 → Authorities 사용**

**✅ 단순한 역할 기반 인증이 필요한 경우 → Roles 사용**