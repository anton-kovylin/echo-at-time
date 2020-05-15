# echo-at-time

Please, check if you have installed:

- Docker `https://docs.docker.com/install/`
- Docker Compose `https://docs.docker.com/compose/install/`

Go to project folder `cd echo-at-time/`

**Build Api:** `docker-compose -f docker/docker-compose-dev.yml up --build`

*Note:* solution based on the rule use only redis.io, so no RabbitMQ or other messaging broker were added.

**API path:** `localhost:45000/api/echoAtTime`

Params: 
- message
- timestamp

**Server log example:**
```
== YOOHOO the message: "somemessage" was shown!!! ==
```
