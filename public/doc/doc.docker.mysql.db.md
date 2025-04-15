# Setup MySQL with Docker Container

## Installation

```shell
docker pull mysql:latest
```

## Run container

```shell
docker run -p 3306:3306 \
    --name [container name: tradelunch_mysql_container] \
    -e MYSQL_ROOT_PASSWORD=root \
    -e MYSQL_DATABASE=[database name: tradelunch] \
    -d mysql
```

## Create persistent storage

1. on mysql cmd
   ```shell
   # check
   docker volume ls
   
   # create volume
   docker volume create mysql_data
   docker-compose up -d
   docker volume inspect mysql_data
   docker volume rm mysql_data # remove specific volume
   docker volume prune # remove unused volume
   ```

2. compose.yml

   ```yaml
   services:
    redis:
      image: 'redis:latest'
    ports:
      - '6379:6379'
   mysql:
      image: 'mysql:latest'
      environment:
        - 'MYSQL_DATABASE=manageX'
        - 'MYSQL_PASSWORD=root'
        - 'MYSQL_ROOT_PASSWORD=root'
        - 'MYSQL_USER=root'
      ports:
        - '3306:3306'
      volumes:
        - mysql_data:/var/lib/mysql  # Uses a named volume docker manages prod
   #      - ./mysql-data:/var/lib/mysql # local bind mount dev
   
   #    TODO: execute docker_mysql_init.sql script when running a docker
   #      - ./docker_mysql_init.sql:/docker-entrypoint-initdb.d/docker_mysql_init.sql
   
   volumes:
      mysql_data:  # Explicitly declare the named volume


   ```

## Execution

1. MySQL shell

    ```shell
       docker exec -it mysql-container mysql -uroot -proot
       
       SHOW DATABASES;
       USE manageX;
       SELECT * FROM users;
       
       exit;
    ```

2. SQL command directly from a command

    ```shell
      docker exec -i mysql-container mysql -uroot -prootpassword -e "SHOW DATABASES;"
      docker exec -i my_mysql_container mysql -uroot -proot -e "CREATE DATABASE IF NOT EXISTS tradelunch; show databases;"
    ```

3. with script

   ```shell
      # general
      docker exec -i mysql-container mysql -uroot -prootpassword < script.sql
   
      # specific database
      docker exec -i mysql-container mysql -uroot -prootpassword [db name: tradelunch] < script.sql
   ```