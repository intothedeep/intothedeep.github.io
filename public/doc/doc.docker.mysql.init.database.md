# docker mysql how to execute command?

To execute CREATE DATABASE manageX inside a MySQL Docker container, follow these steps:

⸻

1. Using Environment Variables (Recommended for Initialization)

If you are starting a new MySQL container, you can create the database automatically by passing MYSQL_DATABASE as an
environment variable in docker-compose.yml or docker run:

Using docker-compose.yml

version: '3.8'
services:
mysql:
image: mysql:8
container_name: mysql-container
restart: always
environment:
MYSQL_ROOT_PASSWORD: rootpassword
MYSQL_DATABASE: manageX # This will auto-create the database
MYSQL_USER: user
MYSQL_PASSWORD: userpassword
ports:

- "3306:3306"
  volumes:
- mysql_data:/var/lib/mysql

volumes:
mysql_data:

	•	Run:

docker-compose up -d

⸻

2. Manually Creating the Database After Starting the Container

If the container is already running, you can execute SQL commands inside it.

Method 1: Using docker exec

Run the following command to enter the MySQL shell and create the database manually:

docker exec -it mysql-container mysql -uroot -p

Enter the MySQL root password when prompted.

Then, inside the MySQL shell:

CREATE DATABASE manageX;
SHOW DATABASES;

Method 2: Using docker exec to Run SQL Directly

You can also execute the command without entering the MySQL shell:

docker exec -i mysql-container mysql -uroot -prootpassword -e "CREATE DATABASE manageX;"

⸻

3. Using a SQL Script on Container Startup

If you have a SQL script file (e.g., docker_mysql_init.sql) that should be executed on container start, you can mount it inside
/docker-entrypoint-initdb.d/:

Example docker_mysql_init.sql

CREATE DATABASE IF NOT EXISTS manageX;

Mounting It in Docker

Modify docker-compose.yml:

services:
mysql:
image: mysql:8
environment:
MYSQL_ROOT_PASSWORD: rootpassword
volumes:

- ./docker_mysql_init.sql:/docker-entrypoint-initdb.d/docker_mysql_init.sql

This ensures the script runs when the container is initialized.

⸻

Final Notes
• ✅ Use MYSQL_DATABASE in docker-compose.yml if setting up a new database during container creation.
• ✅ Use docker exec if the container is already running and you need to manually create the database.
• ✅ Use an docker_mysql_init.sql script if you want to pre-load schemas and data on startup.

Which method works best depends on whether you’re starting from scratch or managing an existing MySQL container. 🚀