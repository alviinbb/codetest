# webapp
This project exists was requested as a PHP skill test.

Project is AngularJS for client side script and PHP for the backend. 

To run/check the finished project, you will need to install [docker](https://docs.docker.com/engine/installation/).

# Build API endpoint and webapp
Before you run the container you need to build the source code for the conainer.

## API Container build

Creates a statically linked binary for linux because docker runs under linux.

```bash
 ./build.sh
```

## webapp build the docker image

```bash
 cd webapp/
 sudo docker build -t webapp .
```

# Run and test the webapp

##Start docker and exposes the service on port :8088 on localhost.

```bash
 ./run.sh
```

To access [http://localhost:8080](http://localhost:8088)

##start webapp
You will need to start webapp container, and modify the webapp PortalConfig.php

```bash
 cd webapp/
 docker run -p 7088:80 -d webapp
```

##modify webapp config to point to the correct API endpoint
you will need to access the container or cp a file from host

```bash
 cd webapp/
 docker run -p 7088:80 -d webapp
```


# Development

## Git 
Add git hooks
```bash
ln -s `pwd`/hooks/pre-commit .git/hooks
```

## Local build

```bash
go get -v ./... && go build -v
```
