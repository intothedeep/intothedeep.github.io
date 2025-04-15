# CSRF Token with cross-site requests - credentials

## Server

```http request
Access-Control-Allow-Credentials: true
```

- security
```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("https://your-client.com") // Specify the allowed origin
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true); // Allow sending credentials (cookies)
    }
}

```


## Client

```javascript
fetch('https://your-api.com/submit', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': localStorage.getItem('csrfToken')
    },
    body: JSON.stringify(data),
    credentials: 'include' // This ensures that cookies (including CSRF token) are sent with the request
})
```

> - credentials: 'same-origin': This sends cookies only if the request is to the same origin (i.e., same domain,
    protocol, and port).
> - credentials: 'include': This sends cookies even for cross-origin requests. This is necessary when making a request
    to a different domain (cross-site), especially if you’re sending the CSRF token stored in a secure cookie.

## AI

Yes, when you are

Yes, when you’re performing a **cross-site request** (i.e., a **cross-origin request**) between the client and server,
you must include the credentials: 'include' or credentials: 'same-origin' option in your fetch request if you want to
send cookies (including the CSRF token in the cookie) along with the request.

**Explanation:**

•    **credentials: 'same-origin'**: This sends cookies only if the request is to the same origin (i.e., same domain,
protocol, and port).

•    **credentials: 'include'**: This sends cookies even for cross-origin requests. This is necessary when making a
request to a different domain (cross-site), especially if you’re sending the CSRF token stored in a secure cookie.

**Example:**

If you’re making a cross-site request and need to send cookies (for example, a CSRF token in the cookie), you should
include credentials: 'include' in your fetch request.

**Correct Request for Cross-Origin with Cookies:**

```
fetch('https://your-api.com/submit', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': localStorage.getItem('csrfToken')
    },
    body: JSON.stringify(data),
    credentials: 'include' // This ensures that cookies (including CSRF token) are sent with the request
})
```

**CORS Configuration on the Server:**

In addition to the client-side fetch setup, your server needs to be configured to accept cross-origin requests with
credentials (cookies). If you’re using Spring Boot, you can enable CORS and allow credentials by configuring a
CorsConfiguration bean.

Here’s how to configure CORS for a Spring Boot server to allow cross-origin requests with credentials:

```
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("https://your-client.com") // Specify the allowed origin
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true); // Allow sending credentials (cookies)
    }
}
```

**Key Points:**

1. **Client-Side**: Include credentials: 'include' for cross-site requests if you need to send cookies.

2. **Server-Side**: The server needs to allow cross-origin requests with credentials by configuring CORS settings to
   accept credentials (i.e., allowCredentials(true)).

**Security Considerations:**

•    **Cross-Site Request**: Make sure the CORS configuration on the server is properly restricted to only trusted
domains.

•    **CSRF Token Security**: Ensure that the CSRF token is sent securely (e.g., via HTTPS) and that it’s stored in a *
*secure, HttpOnly, SameSite** cookie if you’re using cookies to store the CSRF token.