# module execution

To create a **multi-module project** where oauth2_common contains shared code and is used by oauth2_auth and
oauth2_client, follow these steps:

---

**1. Define the Project Structure**

```
oauth2_project/   (Root project directory)
│── oauth2_auth/   (Module for authentication logic)
│── oauth2_client/ (Module for client handling)
│── oauth2_common/ (Module containing shared logic)
│── module-info.java (Each module will have its own)
```

---

**2. Create oauth2_common (Shared Module)**

This module will hold common classes and expose them to oauth2_auth and oauth2_client.

**oauth2_common/module-info.java**

```
module oauth2_common {
    exports com.example.common; // Expose shared package
}
```

**oauth2_common/src/com/example/common/Utils.java**

```
package com.example.common;

public class Utils {
    public static String getGreeting() {
        return "Hello from oauth2_common!";
    }
}
```

---

**3. Modify oauth2_auth to Use oauth2_common**

**oauth2_auth/module-info.java**

```
module oauth2_auth {
    requires oauth2_common; // Use shared module
}
```

**oauth2_auth/src/com/example/auth/AuthService.java**

```
package com.example.auth;

import com.example.common.Utils; // Import from common module

public class AuthService {
    public void authenticate() {
        System.out.println(Utils.getGreeting());
    }
}
```

---

**4. Modify oauth2_client to Use oauth2_common**

**oauth2_client/module-info.java**

```
module oauth2_client {
    requires oauth2_common; // Use shared module
}
```

**oauth2_client/src/com/example/client/ClientService.java**

```
package com.example.client;

import com.example.common.Utils;

public class ClientService {
    public void connect() {
        System.out.println(Utils.getGreeting());
    }
}
```

---

**5. Compile and Run the Modules**

Navigate to the **root project directory (oauth2_project/)** and compile all modules together:

```
javac -d out --module-source-path . $(find . -name "*.java")
```

Run the AuthService from oauth2_auth:

```
java --module-path out -m oauth2_auth/com.example.auth.AuthService
```

Run the ClientService from oauth2_client:

```
java --module-path out -m oauth2_client/com.example.client.ClientService
```

---

**Summary**

1. **oauth2_common** contains shared logic and exposes it.

2. **oauth2_auth and oauth2_client** use oauth2_common via requires.

3. **All modules are compiled and executed using javac and java with --module-path.**

Would you like to integrate this into a **Gradle** or **Maven** build? 🚀