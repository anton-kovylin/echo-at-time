const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);
const { promisify } = require('util');

client.on("error", error => console.log(`Can't connect to Redis: ${error}`));

module.exports = {
  ...client,
  zaddAsync: promisify(client.zadd).bind(client),
  zrangeAsync: promisify(client.zrange).bind(client),
  zremAsync: promisify(client.zrem).bind(client),
};