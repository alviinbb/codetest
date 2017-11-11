# webapp

This project was requested for a PHP skill test.

Project is using AngularJS for client side scripting and PHP for the backend. 

To run/check the finished project, you will need to install [docker](https://docs.docker.com/engine/installation/).

# Build API endpoint and webapp

Before you run the container you also need to build the source code for the conainer.

## API image build

Creates a statically linked binary for linux because docker runs under linux.

```bash
 ./build.sh
```

## webapp image build

You will need to modify the webapp/www/PortalConfig.php before building the image.
$API_ENDPOINT = the endpoint for codetest API;  (normally it should be 172.17.0.0/24) [From inside of a Docker container, how do I connect to the localhost of the machine?](https://stackoverflow.com/questions/24319662/from-inside-of-a-docker-container-how-do-i-connect-to-the-localhost-of-the-mach)

build the image

```bash
 cd /webapp 
 sudo docker build -t webapp .
```

# Run and test the webapp

## Start docker and exposes the service on port :8088 on localhost.

```bash
 ./run.sh
```

To check/access API response [http://localhost:8088](http://localhost:8088)

## start webapp

Start webapp container.

```bash
 cd webapp/
 docker run -p 7088:80 -d webapp
```

## Test webapp

To access webapp [http://localhost:7088](http://localhost:7088)
use any user/password to login, click "Games" from the menu bar.
The backend API has ONLY been enabled for Powerball and Super Jackpot Lottery, please click each of them to see the reponse data in a table.
Surf Lifesaves and Saturday Lotto have no view associated with.

# Development
Due to the time and limited knowledge around the data structure, developer spent most time on user interface, docker and customization.
