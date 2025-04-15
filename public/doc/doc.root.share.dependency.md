# How to share root dependency?

By default, **submodules do not automatically inherit dependencies from the root project** in a Gradle multi-module
project. However, you can configure Gradle to share dependencies in two ways:

---

**Option 1: Define Dependencies in subprojects {} Block (Recommended)**

This ensures that **all submodules** automatically inherit the shared dependencies.

**Root build.gradle.kts**

```
plugins {
    java
}

subprojects {
    apply(plugin = "java")

    repositories {
        mavenCentral()
    }

    dependencies {
        implementation("org.springframework.boot:spring-boot-starter")
    }

    tasks.withType<JavaCompile> {
        options.encoding = "UTF-8"
    }
}
```

✅ Now, all submodules (oauth2_auth, oauth2_client, oauth2_common) **automatically get**:

• org.springframework.boot:spring-boot-starter

• Maven Central Repository

---

**Option 2: Use a Separate buildSrc or Convention Plugin (More Scalable)**

If you want better maintainability, **define dependencies in buildSrc** or a custom Gradle plugin.

**1. Create buildSrc/src/main/kotlin/Dependencies.kt**

```
object Dependencies {
    const val springBootStarter = "org.springframework.boot:spring-boot-starter"
}
```

**2. Modify subprojects {} Block**

```
subprojects {
    apply(plugin = "java")

    repositories {
        mavenCentral()
    }

    dependencies {
        implementation(Dependencies.springBootStarter)
    }
}
```

✅ Now, dependencies are **centralized in Dependencies.kt**, making maintenance easier.

---

**Per-Module Custom Dependencies**

If a submodule needs extra dependencies, add them **inside its own build.gradle.kts**.

**Example: oauth2_auth/build.gradle.kts**

```
dependencies {
    implementation(project(":oauth2_common"))  // Use common module
    implementation("org.springframework.boot:spring-boot-starter-web")  // Add only to this module
}
```

---

**Summary**

| **Approach**                              | **Inherits Dependencies?** | **Best For**                                  |
|-------------------------------------------|----------------------------|-----------------------------------------------|
| subprojects {} in root Gradle             | ✅ Yes                      | Small to medium projects                      |
| buildSrc with centralized Dependencies.kt | ✅ Yes                      | Large projects                                |
| Define dependencies per module            | ❌ No                       | When modules need very different dependencies |

**Final Answer:**

Yes, submodules **can inherit dependencies** from the root project **if you configure subprojects {}**. Otherwise, you
must **manually add dependencies in each module**.

Would you like me to help with **managing dependencies dynamically based on environments (Dev/Prod)?** 🚀