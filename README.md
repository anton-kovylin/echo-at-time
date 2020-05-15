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

**Server log example cases:**

- When received timestamp is lower than current date
```
Message "some message" should be shown: true (1579529416014 vs 1589529416014)
== YOOHOO the message: "weedfd" was shown!!! ==
```

- When received timestamp is lower than current date
```
Message "some message" should be shown: false (1589539416014 vs 1589529616288)
```
