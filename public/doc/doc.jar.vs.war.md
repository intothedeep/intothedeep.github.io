# Jar vs War

> jar is for java + tomcat, but war is for java


**In your case:**

•    **If you’re using Spring Boot with an embedded Tomcat** and creating a **JAR** file, it means you’re packaging
everything into a single file (your app + Tomcat). You run it as a standalone application.

•    **If you choose WAR** and deploy it to an external Tomcat server, you would need to manage the Tomcat installation
separately.

**Conclusion:**

• If your project is built with **Spring Boot** and you want an **easy-to-deploy, self-contained application** (which
includes Tomcat or another web server), you would typically choose **JAR** (with embedded Tomcat).

• If you prefer **deploying to an existing Tomcat server** (or another servlet container), you would go with **WAR**.