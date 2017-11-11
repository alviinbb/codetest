# webapp
This project was requested as a PHP skill test.

Project is AngularJS for client side scripting and PHP for the backend. 

To run/check the finished project, you will need to install [docker](https://docs.docker.com/engine/installation/).

# Build API endpoint and webapp
Before you run the container you need to build the source code for the conainer.

## API Container build

Creates a statically linked binary for linux because docker runs under linux.

```bash
 ./build.sh
```

## webapp build the docker image
You will need to modify the webapp/www/PortalConfig.php before start building the image.
$API_ENDPOINT = the endpoint for codetest API;  (normally it should be 172.17.0.0/24) [https://stackoverflow.com/questions/24319662/from-inside-of-a-docker-container-how-do-i-connect-to-the-localhost-of-the-mach]


```bash
  
 sudo docker build -t webapp .
```

# Run and test the webapp

##Start docker and exposes the service on port :8088 on localhost.

```bash
 ./run.sh
```

To check/access API response [http://localhost:8080](http://localhost:8088)

## start webapp
Start webapp container.

```bash
 cd webapp/
 docker run -p 7088:80 -d webapp
```

## modify webapp config to point to the correct API endpoint
you will need to access the container or cp a file from host

```bash
 cd webapp/
 docker run -p 7088:80 -d webapp
```

