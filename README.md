# Node Microservices with Docker

This is an educative project I made to put into practice my Docker skills for building a simple __Orders__ app. In fact, there is no structure for the data being sent as an _order_, because that was not the point of this app. The purpouse was to focus on how to make the following microservices interact with each other:

## API microservice

This is an express backend that exposes to the users 2 routes: one for saving a __new order__ and another for reading __existing orders__ from the database. 

When it receives a request for saving a new order, it sends the data to a _Redis_ channel. 

When it receives a request for reading the exising orders, it redirects that request to the DB microservice.

## DB microservice

This is another express backend that is only reachable by the API microservice. This microservice is the one in charge of the Database. It receives the GET requests for reading the __existing orders__ in the DB, and makes the query to the DB (Mongo).

It also subscribes to the _Redis_ channel where the new orders are being sent, and saves those into the DB.

## Redis microservice

This is just a Redis instance, based on the official Docker [Redis image](https://hub.docker.com/_/redis). It is only reachable by the microservices and not by the users.

In this project, Redis is used as a _fire and forget_ Message Broker. 

## Mongo microservice

This is a MongoDB server based on the Docker [MongoDB image](https://hub.docker.com/_/mongo). It is only reachable by the microservices and not by the users. The user can read it through the API though.

## Mongo-express

This is a Mongo Web based client that is exposed to the users. It is very convenient for checking if the data is being properly written into the DB.

# Usage

This project was developed using Windows 10, hence the shared drive in the docker-compose.yml. But this can work on GNU/Linux or OSX too, just change the path of the volume. 

I develop in Docker using source files mounted in volumes, this way any change on the source file can be quickly detected by the container without having to build the images again. I still have to do _docker-compose stop_ and _docker-compose up_ to catch the changes, but the amount of time it takes is short compared to building images.

Once in the root of this project, just write: 

```
docker-compose up
```

And let compose do its magic. The API will be reachable on localhost port 3000. Available routes are

```
GET /orders
```

and 

```
POST /orders
```
with data in JSON as a body.