# # Spring: Websocket

In Spring Boot 6, WebSockets are supported and can be easily configured using spring-websocket along with Spring Boot’s
support for WebSocket configuration. You can use WebSockets to enable real-time communication between clients (e.g.,
browsers) and servers.

Here’s how you can implement WebSocket in Spring Boot 6:

**Steps to Set Up WebSocket in Spring Boot 6**

**1. Add Dependencies**

Ensure you have the necessary dependencies in your pom.xml (if you’re using Maven). Spring Boot 6 uses Spring WebSocket
and Spring Messaging for WebSocket support.

```
<dependencies>
    <!-- Spring Boot Starter WebSocket -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-websocket</artifactId>
    </dependency>

    <!-- Spring Boot Starter Web for REST endpoints (optional) -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <!-- Spring Boot Starter Thymeleaf (if you're using Thymeleaf for rendering views) -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-thymeleaf</artifactId>
    </dependency>

    <!-- Spring Boot Starter for Messaging (for handling messaging protocols like STOMP) -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-messaging</artifactId>
    </dependency>
</dependencies>
```

**2. Configure WebSocket in Spring Boot**

Spring Boot 6 uses @EnableWebSocket to enable WebSocket support, but it’s now integrated with Spring’s
WebSocketMessageBrokerConfigurer for more advanced features like STOMP (Simple Text Oriented Messaging Protocol).

Here’s how you can configure WebSocket:

**WebSocket Configuration (WebSocketConfig.java)**

```
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer, WebSocketMessageBrokerConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        // Define WebSocket handler URL and any interceptors if needed
        registry.addHandler(myWebSocketHandler(), "/ws-endpoint")
                .addInterceptors(new HttpSessionHandshakeInterceptor())
                .setAllowedOrigins("*");
    }

    @Bean
    public WebSocketHandler myWebSocketHandler() {
        return new MyWebSocketHandler();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // Enable a simple memory-based broker to carry the messages back to the client
        registry.enableSimpleBroker("/topic");  // Example topic
        registry.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints() {
        // Register the STOMP endpoints
        registry.addEndpoint("/ws").withSockJS();  // SockJS is used as a fallback
    }

    @Bean
    public ServerEndpointExporter serverEndpointExporter() {
        return new ServerEndpointExporter();
    }
}
```

•    **registerWebSocketHandlers**: This method is where you register the WebSocket handler and configure the URL for
your WebSocket connection (/ws-endpoint in this case).

•    **configureMessageBroker**: This method enables a simple message broker that can handle messages sent to topics (
e.g., /topic/xyz).

•    **registerStompEndpoints**: This method registers a WebSocket endpoint that clients will use to connect (/ws in
this case).

**3. Create WebSocket Handler**

You can implement your own WebSocket handler by extending TextWebSocketHandler if you need low-level WebSocket
interaction (e.g., broadcasting messages).

Example WebSocket Handler:

```
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.WebSocketHandler;

public class MyWebSocketHandler extends TextWebSocketHandler {

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) {
        // Handle incoming WebSocket message here
        System.out.println("Received message: " + message.getPayload());
        try {
            // Echo the message back to the client
            session.sendMessage(new TextMessage("Hello from server"));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

**4. Client-Side WebSocket Setup**

In the client, you can use JavaScript to connect to the WebSocket and interact with the server. Below is a basic example
of using SockJS and Stomp.js to handle WebSocket connections.

**Example Client-Side Code (Using SockJS and STOMP)**

```
<!DOCTYPE html>
<html>
<head>
    <title>WebSocket Example</title>
    <script src="https://cdn.jsdelivr.net/npm/sockjs-client/dist/sockjs.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@stomp/stompjs@2.3.3/dist/stomp.min.js"></script>
    <script type="text/javascript">
        var stompClient = null;

        // Connect to WebSocket
        function connect() {
            var socket = new SockJS('/ws'); // Endpoint that is defined in your Spring Boot server
            stompClient = Stomp.over(socket);
            stompClient.connect({}, function(frame) {
                console.log('Connected: ' + frame);
                // Subscribe to a topic
                stompClient.subscribe('/topic/greetings', function(greeting) {
                    alert(greeting.body);
                });
            });
        }

        // Send message to the WebSocket server
        function sendMessage() {
            var message = { 'name': 'World' };
            stompClient.send("/app/hello", {}, JSON.stringify(message));
        }

        // Disconnect from WebSocket
        function disconnect() {
            if (stompClient !== null) {
                stompClient.disconnect();
            }
            console.log("Disconnected");
        }
    </script>
</head>
<body>
    <button onclick="connect()">Connect</button>
    <button onclick="sendMessage()">Send Message</button>
    <button onclick="disconnect()">Disconnect</button>
</body>
</html>
```

**5. Controller to Handle Messaging**

You can also create a Spring controller to handle messages coming from WebSocket clients. This is typically done with
@MessageMapping annotation when using STOMP protocol.

Example Controller:

```
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    @MessageMapping("/hello")  // Maps to /app/hello on the client side
    @SendTo("/topic/greetings")  // Sends the message to all subscribers of /topic/greetings
    public String greeting(String message) throws Exception {
        return "Hello, " + message;
    }
}
```

**6. Running the Application**

After setting up the WebSocket configuration, the client can connect to the WebSocket server via the endpoint (e.g.,
/ws). Once connected, clients can send and receive messages.

• The **WebSocketConfig** class sets up the necessary configurations for WebSocket handling in your application.

• The **WebSocketHandler** processes messages and can broadcast messages back to clients.

• The **Controller** handles application-specific messaging with STOMP over WebSocket.

**Conclusion:**

Spring Boot 6 provides full support for WebSockets with easy configuration using @EnableWebSocket, WebSocketConfigurer,
and WebSocketMessageBrokerConfigurer. You can either handle WebSocket messaging directly or use the STOMP protocol to
implement message-driven communication. This setup allows for efficient, real-time communication between clients and
servers.